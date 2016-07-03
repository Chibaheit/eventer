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
})

/***
 * 删除activity
 * isOrganiation === true
 * @method POST
 * @params
 *    _id : String
 */
router.post('/activity/delete', async (req, res) => {
})

/***
 * 修改activity
 * isOrganiation === true
 * @method POST
 * @params : one or more
 *    title : String
 *    content : String
 *    location : String
 *    startTime : Date
 *    endTime : Date
 */
router.POST('/activity/change_info', (req, res) => {
});

/***
 * 获取activity信息
 * @method GET
 * @params
 *    _id : String
 */
router.get('/activity/info', async (req, res) => {
})

/***
 * 当前用户加入activity
 * @method POST
 * @params :
 *  :id : String
 */
router.POST('/activity/join/:id', (req, res) => {
});

/***
 * 当前用户退出activity
 * @method POST
 * @params :
 *  :id : String
 */
router.POST('/activity/unjoin/:id', (req, res) => {
});

export default router
