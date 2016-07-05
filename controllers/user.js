import _ from 'lodash'
import { Router } from 'express'

import { User } from '../models'
import { sha256x2 } from '../utils/common'

const router = Router()

/***
 * User registration
 * @method POST
 * @uri /api/account/register
 * @body { username, password, email }
 */
router.post('/account/register/:role?', async (req, res) => {
  // Recheck format
  let errors
  // Check unique
  if (_.isEmpty(errors)) {
    const user = await User.findOne({
      $or: [
        { username: _.toLower(req.body.username) },
        { email: _.toLower(req.body.email) }
      ]
    }).exec()
    if (user) {
      if (user.username === _.toLower(req.body.username)) {
        errors.username = '已经被使用'
      } else {
        errors.email = '已经被使用'
      }
    }
  }
  // Error
  if (!_.isEmpty(errors)) {
    return res.fail(errors)
  }
  // Create user
  const user = new User({
    username: _.toLower(req.body.username),
    password: sha256x2(req.body.password),
    nickname: req.body.username,
    email: _.toLower(req.body.email),
    activities: [],
    followings: [],
    isOrganization: req.params.role === 'organization'
  })
  await user.save()
  // Update session
  req.session.user = {
    _id: user._id,
    nickname: user.nickname,
    isOrganization : user.isOrganization
  }
  return res.success()
})

/***
 * User login
 * @method POST
 * @uri /api/account/login
 * @body { email, password }
 */
router.post('/account/login', async (req, res) => {
  if (typeof req.body.email !== 'string' ||
      typeof req.body.password !== 'string') {
    return res.bad()
  }
  // Find user
  const user = await User.findOne({
    $or: [
      { username: _.toLower(req.body.email) },
      { email: _.toLower(req.body.email) }
    ]
  }).select('_id isOrganization nickname password').exec()
  // Check if email and password are matched
  const errors = {}
  if (!user) {
    errors.email = '用户不存在'
  } else if (user.password !== sha256x2(req.body.password)) {
    errors.password = '错误的密码'
  }
  if (!_.isEmpty(errors)) {
    return res.fail(errors)
  }
  // Update session
  req.session.user = {
    _id: user._id,
    nickname: user.nickname,
    isOrganization : user.isOrganization
  }
  return res.success()
})

/** 用户注销登录 */
router.get('/account/logout', (req, res) => {
  req.session.user = null;
  return res.success({});
});

/***
 * User basic information
 * @method GET
 * @uri /api/account/info
 */
router.get('/account/info/:id?', async (req, res) => {
  let id = req.params.id;
  if (req.session.user && req.params.id === undefined) {
    id = req.session.user._id;
  }
  if (id){
    const user = await User.findById(id)
        .select('email phone isOrganization signature username nickname activities followings')
        .populate('followings.user', 'nickname').exec()
    return res.success({ user })
  } else {
    return res.fail()
  }
})

/** 检查邮箱是否存在 */
router.get('/account/check_email', async (req, res) => {
  const user = await User.findOne({
    where: { email: req.query.email }
  });
  if (!user) {
    return res.success();
  } else {
    return res.fail({ type: 'EMAIL_EXIST' });
  }
});

/** 检查用户名是否存在 */
router.get('/account/check_username', async (req, res) => {
  const user = await User.findOne({
    where: { username: req.query.username }
  });
  if (!user) {
    return res.success();
  } else {
    return res.fail({ type: 'USERNAME_EXIST' });
  }
});

/** 验证登录密码 */
router.post('/account/check_password', async (req, res) => {
  /** 权限验证 */
  if (!req.session.user._id) {
    return res.status(403).fail();
  }
  const user = await User.findById(req.session.user._id)
                .select('_id password').exec()
  const password = sha256x2(req.body.password);
  if (user && password === user.password) {
    return res.success();
  } else {
    return res.fail({ type: 'WRONG_PASSWORD'});
  }
});

/** 更新用户信息 */
router.post('/account/update_info', async (req, res) => {
  /** 权限验证 */
  if (!req.session.user._id) {
    return res.status(403).fail();
  }
  const attrs = ['avatar', 'nickname', 'email', 'phone', 'username', 'signature'];
  const user = await User.findById(req.session.user._id, {
    // 必须要选出主键，后面才可以保存
    attributes: attrs.concat(['id'])
  });
  for (let key in req.body) {
    if (_.includes(attrs, key)) {
      let value = req.body[key];
      if (key == 'avatar'){
          value = value.response.data.attachmentId;
      }
      user[key] = value;
    }
  }
  await user.save();
  res.success({ user });
});

/** 更改登录密码 */
router.post('/account/change_password', async (req, res) => {
    if (!req.session.user._id) {
      return res.status(403).fail();
    }
    const user = await User.findById(req.session.user._id)
                  .select('_id password').exec()
    user.password = sha256x2(req.body.password);
    await user.save();
    return res.success();
 });

/***
 * User search
 * @method GET
 * @uri /api/account/search
 */
router.get('/account/search', async (req, res) => {
  if (!req.session.user) {
    return res.forbidden();
  }
  if (!req.query.q || typeof req.query.q !== 'string') {
    return res.bad();
  }
  const users = await User.find({ username: new RegExp(req.query.q, 'i') })
      .select('username nickname avatar').exec();
  return res.success({ users });
})

/***
* User timeline
* @method GET
* return [{ username. isOrganization, activity.name, activity.id, username.activity.time}]
*/
/**
username: 'Chiba',
nickname: 'Chiba',
avatar: 'https://pbs.twimg.com/profile_images/745450979894525952/JcFDk3BR_bigger.jpg',
isOrganization: false,
title: '吃饭',
time: new Date()
*/
router.get('/account/timeline', async (req, res) => {
    if (!req.session.user._id){
        return res.fail();
    }
    const user = await User.findById(req.session.user._id);
    let timeline = [];
    for (let item of user.followings){
        const follow = await User.findById(item.user)
                        .populate('activities.activity', 'title', 'Activity');
        follow.activities.map((item) => {
            let tlitem = {
                username : follow.username,
                nickname : follow.nickname,
                avatar : follow.avatar,
                isOrganization : follow.isOrganization,
                title : item.activity.title,
                time : item.time,
            };
            timeline.push(tlitem);
        })
    }
    timeline.sort((a, b) => {
        return a.time - b.time;
    });
    return res.success({ timeline });
});

/** 用户follow */
router.get('/account/follow/:user_id?', async (req, res) => {
    if (!req.session.user._id || !req.params.user_id) {
      return res.status(403).fail();
    }
    const user = await User.findById(req.session.user._id);
    const target = await User.findById(req.params.user_id);
    user.follow(target);
    await user.save();
    return res.success({ user });
 });

 /** 用户follow */
 router.get('/account/unfollow/:user_id?', async (req, res) => {
     if (!req.session.user._id || !req.params.user_id) {
       return res.status(403).fail();
     }
     const user = await User.findById(req.session.user._id);
     const target = await User.findById(req.params.user_id);
     user.unfollow(target);
     await user.save();
     return res.success({ user });
  });

export default router
