'use strict';

const mongoose = require('mongoose');
const Router = require('express').Router;

const User = mongoose.model('User');

const router = Router();

router.get('/users', (req, res, next) => {
    if (!req.query.keyword) {
        return res.status(403).json({ message: '关键词无效' });
    }
    // https://github.com/benjamingr/RegExp.escape/blob/master/polyfill.js
    const regex = new RegExp(req.query.keyword.replace(/[\\^$*+?.()|[\]{}]/g, '\\$&'), 'i');
    User.find({
        $or: [{
            username: {
                $regex: regex
            }
        }, {
            email: {
                $regex: regex
            }
        }, {
            nickname: {
                $regex: regex
            }
        }, {
            signature: {
                $regex: regex
            }
        }]
    })
        .then(users => res.status(200).json(users))
        .catch(next);
});

router.post('/users', (req, res, next) => {
    new User(req.body).save()
        .then(user => req.login(user, err => {
            if (err) {
                return next(err);
            }
            return res.status(204);
        }))
        .catch(next);
});

router.get('/users/:username', (req, res, next) => {
    User.findOne({ username: req.params.username })
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: '未找到用户' });
            }
            return res.status(200).json(user);
        })
        .catch(next);
});

module.exports = router;
