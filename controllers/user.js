import _ from 'lodash'
import { Router } from 'express'

import { User } from '../models'
import { sha256x2 } from '../utils/common'

const router = Router()

/***
 * User registration
 * @method POST
 * @uri /api/user/register
 * @body { username, password, email }
 */
router.post('/account/register', async (req, res) => {
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
    name: req.body.username,
    email: _.toLower(req.body.email),
    friends: [] // No friends initally
  })
  await user.save()
  // Update session
  req.session.user = {
    _id: user._id,
    name: user.name
  }
  return res.success()
})

/***
 * User login
 * @method POST
 * @uri /api/user/login
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
  }).select('name password').exec()
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
    name: user.name
  }
  return res.success()
})

/***
 * User basic information
 * @method GET
 * @uri /api/user/info
 */
router.get('/account/info', async (req, res) => {
  if (req.session.user) {
    const user = await User.findById(req.session.user._id)
        .select('username name friends')
        .populate('friends', 'name').exec()
    return res.success({ user })
  } else {
    return res.fail()
  }
})

/***
 * User search
 * @method GET
 * @uri /api/user/search
 */
router.get('/account/search', async (req, res) => {
  if (!req.session.user) {
    return res.forbidden()
  }
  if (!req.query.q || typeof req.query.q !== 'string') {
    return res.bad()
  }
  const users = await User.find({ username: new RegExp(req.query.q, 'i') })
      .select('username name').exec()
  return res.success({ users })
})

export default router
