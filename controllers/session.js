'use strict';

const mongoose = require('mongoose');
const passport = require('passport');
const Router = require('express').Router;

const User = mongoose.model('User');

const router = Router();

router.post('/session', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({ message: info.message });
        }
        req.logIn(user, function(err) {
            if (err) {
                return next(err);
            }
            return res.sendStatus(204);
        });
    })(req, res, next);
});

router.delete('/session', (req, res) => {
    req.logout();
    return res.sendStatus(204);
});

module.exports = router;
