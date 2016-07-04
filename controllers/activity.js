import _ from 'lodash'
import { Router } from 'express'

import { User, Activity } from '../models'
import { sha256x2 } from '../utils/common'

const router = Router()

/***
 * 创建新activity
 * isOrganiation === true
 * @method POST
 * @params
 *    title : String
 *    content : String
 *    location : String
 *    startTime : Date
 *    endTime : Date
 * res.success / res.fail(xxx)
 */
router.post('/activity/create', async (req, res) => {
    // Recheck format
    let errors
    // authentication Check
    if (!req.session.user._id || !req.session.user.isOrganization){
        res.status(403).fail();
    }
    console.log(req.body);
    // Create user
    const activity = new Activity({
        title: req.body.title || '',
        content: req.body.content || '',
        location: req.body.location || '',
        startTime: new Date(req.body.startTime),
        endTime: new Date(req.body.endTime),
        creator: req.session.user._id,
        participator: [],
    })
    await activity.save();
    return res.success({ activity });
})

/***
 * 删除activity
 * isOrganiation === true
 * @method POST
 * @params
 *    id : String
 */
router.post('/activity/remove', async (req, res) => {
    if (!req.session.user._id || !req.params.id) {
        return res.status(403).fail();
    }
    const activity = await Activity.findById(req.params.id);
    // authentication Check
    if (!activity || activity.creator != req.session.user._id){
        return res.status(403).fail();
    }
    await activity.unjoin_all();
    await activity.remove();
    return res.success();
})

/***
 * 修改activity
 * isOrganiation === true
 *    title : String
 *    content : String
 *    location : String
 *    startTime : Date
 *    endTime : Date
 */
router.POST('/activity/update_info/:id', (req, res) => {
    if (!req.session.user._id || !req.params.id) {
        return res.status(403).fail();
    }
    const attrs = ['title', 'content', 'location', 'startTime', 'endTime'];
    const activity = await Activity.findById(req.params.id, {
        // 必须要选出主键，后面才可以保存
        attributes: attrs.concat(['id'])
    });
    // authentication Check
    if (!activity || activity.creator != req.session.user._id){
        return res.status(403).fail();
    }
    for (let key in req.body) {
        if (_.includes(attrs, key)) {
            activity[key] = req.body[key];
        }
    }
    await activity.save();
    res.success({ activity });
});

/***
 * 获取activity信息
 * @method GET
 */
router.get('/activity/info/:id', async (req, res) => {
    let id = req.params.id;
    if (id){
        const activity = await Activity.findById(id)
            .select('title content location startTime endTime participator')
            .populate('participator', 'nickname').exec()
        return res.success({ activity })
    } else {
        return res.fail();
    }
})

/***
 * 当前用户加入activity
 * @method POST
 * @params :
 *  :id : String
 */
router.POST('/activity/join/:id', (req, res) => {
    let id = req.params.id;
    if (!id || !req.session.user._id){
        res.status(403).fail();
    }
    const activity = await Activity.findById(req.params.id);
    const user = await User.findById(req.session.user._id);
    user.join(activity);
    await user.save();
    await activity.save();
    return res.success({ activity });
});

/***
 * 当前用户退出activity
 * @method POST
 * @params :
 *  :id : String
 */
router.POST('/activity/unjoin/:id', (req, res) => {
    let id = req.params.id;
    if (!id || !req.session.user._id){
        res.status(403).fail();
    }
    const activity = await Activity.findById(req.params.id);
    const user = await User.findById(req.session.user._id);
    user.unjoin(activity)
    await user.save();
    await activity.save();
    return res.success()
});

/***
 * 当前用户退出activity
 * @method POST
 * @params :
 *  :id : String
 */
router.get('/activity/search', async (req, res) => {
    if (!req.session.user) {
        return res.forbidden();
    }
    if (!req.query.q || typeof req.query.q !== 'string') {
        return res.bad();
    }
    const activities = await Activity.find({ title: new RegExp(req.query.q, 'i') })
        .select('_id title content location startTime endTime').exec();
    return res.success({ activities });
})


export default router
