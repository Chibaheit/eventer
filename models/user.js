'use strict';

const crypto = require('crypto');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        match: /^[0-9A-Za-z]{1,16}$/
    },
    email: {
        type: mongoose.SchemaTypes.Email,
        required: true
    },
    passwordSalt: {
        type: String,
        required: true,
        select: false
    },
    passwordHash: {
        type: String,
        required: true,
        select: false
    },
    avatar: {
        type: String,
        required: true,
        default: '/images/default-avatar.svg'
    },
    nickname: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 16
    },
    signature: String
});

UserSchema.virtual('password')
    .set(function (password) {
        this._password = password;
        this.passwordSalt = this.makeSalt();
        this.passwordHash = this.encryptPassword(password);
    })
    .get(function () {
        return this._password;
    });

UserSchema.path('username').validate(function (username, respond) {
    if (this.isNew || this.isModified('username')) {
        // Check only when it is a new userId or when username field is modified
        const User = mongoose.model('User');
        User.find({ username }).exec((err, users) => respond(!err && users.length === 0));
    } else {
        return respond(true);
    }
}, '用户名已存在');

UserSchema.path('email').validate(function (email, respond) {
    if (this.isNew || this.isModified('email')) {
        // Check only when it is a new userId or when email field is modified
        const User = mongoose.model('User');
        User.find({ email }).exec((err, users) => respond(!err && users.length === 0));
    } else {
        return respond(true);
    }
}, '邮箱已存在');

UserSchema.pre('save', function (next) {
    if (!this.isNew) {
        return next();
    } else if (!(this.password && this.password.length)) {
        return next(new Error('密码无效'));
    } else if (this.password.length < 6) {
        return next(new Error('密码长度小于 6'));
    } else {
        return next();
    }
});

UserSchema.methods = {

    authenticate(password) {
        return this.encryptPassword(password) === this.passwordHash;
    },

    makeSalt() {
        return Math.round((new Date().valueOf() * Math.random())) + '';
    },

    encryptPassword(password) {
        if (!password) {
            return '';
        }
        try {
            return crypto
                .createHmac('sha1', this.passwordSalt)
                .update(password)
                .digest('hex');
        } catch (err) {
            return '';
        }
    }
};

mongoose.model('User', UserSchema);
