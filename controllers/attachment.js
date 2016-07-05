/** 图片附件 */
'use strict';

/** 附件表 */
//const fs = Promise.promisifyAll(require('fs'));

import multer from 'multer'
const upload = multer({ dest: '/tmp' })

import _ from 'lodash'
import { Router } from 'express'
const router = Router();

import { Attachment } from '../models'

import fs from 'fs'

/** 添加图片 */
router.post('/photo/new', upload.single('photo'),
    async (req, res) => {
        if (!req.session.user._id) {
            return res.status(403).fail()
        }
        if (!(/^image\/.*/.test(req.file.mimetype))) {
            return res.status(400).fail('只能上传图片文件！')
        }
        // 不能大于 2MB
        if (req.file.size > 2097152) {
            return res.status(400).fail('不能上传大于 2MB 的文件！')
        }
        const buf = await fs.readFileAsync(req.file.path)
        const attachment = new Attachment({
            userId: req.session.user._id,
            blob: buf
        });
        await attachment.save();
        return res.success({ attachmentId: attachment._id })
    }
);

/** 获取图片 */
router.get('/photo/show', async (req, res) => {
    const attachment = await Attachment.findById(req.query.id, {
        attributes: ['blob']
    })
    if (!attachment) {
        return res.status(404).end();
    }
    return res.end(attachment.blob);
});

module.exports = router;
