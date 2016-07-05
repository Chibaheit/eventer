import _ from 'lodash'
import { Router } from 'express'

import { User, Activity } from '../models'
import { sha256x2 } from '../utils/common'

const router = Router()

/***
 * 创建新activity
 * isOrganization === true
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
        return res.status(403).fail();
    }
    // Create user
    const activity = new Activity({
        title: req.body.title || '',
        content: req.body.content || '',
        location: req.body.location || '',
        startTime: new Date(req.body.date[0]),
        endTime: new Date(req.body.date[1]),
        creator: req.session.user._id,
        participator: [],
    })
    const user = await User.findById(req.session.user._id);
    user.activities.push({
        activity : activity._id,
        time : Date.now()
    })
    await user.save();
    await activity.save();
    return res.success({ activity });
})

/***
 * 删除activity
 * isOrganization === true
 * @method POST
 * @params
 *    id : String
 */
router.get('/activity/remove/:id', async (req, res) => {
    if (!req.session.user._id || !req.params.id) {
        return res.status(403).fail();
    }
    const activity = await Activity.findById(req.params.id);
    // authentication Check
    if (!activity || String(activity.creator) != String(req.session.user._id)){
        return res.status(403).fail();
    }
    const user = await User.findById(req.session.user._id);
    _.remove(user.activities, (item) => {
        return String(item.activity) == String(activity._id);
    });
    user.markModified('activities');
    await user.save();
    await activity.unjoin_all();
    await activity.remove();
    return res.success();
})

/***
 * 修改activity
 * isOrganization === true
 *    title : String
 *    content : String
 *    location : String
 *    startTime : Date
 *    endTime : Date
 */
router.post('/activity/update_info/:id', async (req, res) => {
    if (!req.session.user._id || !req.params.id) {
        return res.status(403).fail();
    }
    const attrs = ['title', 'content', 'location', 'startTime', 'endTime'];
    const activity = await Activity.findById(req.params.id)
                        .select(attrs.join(' ') + ' creator');
    // authentication Check
    if (!activity || String(activity.creator) != String(req.session.user._id)){
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
            .select('title content location startTime endTime creator participator')
            .populate('participator.user', 'nickname').exec()
        if (!activity){
            return res.fail();
        }
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
router.get('/activity/join', async (req, res) => {
    let id = req.params.id;
    if (!id || !req.session.user._id || req.session.isOrganization){
        res.status(403).fail();
    }
    const activity = await Activity.findById(req.params.id);
    const user = await User.findById(req.session.user._id);
    user.join(activity);
    await user.save();
    await activity.save();
    return res.success({ user, activity });
});

/***
 * 当前用户退出activity
 * @method POST
 * @params :
 *  :id : String
 */
router.get('/activity/unjoin/:id?', async (req, res) => {
    let id = req.params.id;
    if (!id || !req.session.user._id || req.session.isOrganization){
        res.status(403).fail();
    }
    let activity = await Activity.findById(req.params.id);
    let user = await User.findById(req.session.user._id);
    user.unjoin(activity)
    await user.save();
    await activity.save();
    return res.success({ user, activity })
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
        .select('_id title content location startTime endTime creator').exec();
    return res.success({ activities });
})


export default router
