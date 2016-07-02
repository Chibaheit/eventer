'use strict';

global.ROOT = __dirname;

const bodyParser = require('body-parser');
const express = require('express');
const fs = require("fs");
const http = require('http');
const logger = require('morgan');
const mongoose = require('mongoose');
const mongooseTypes = require('mongoose-types');
const passport = require('passport');
const PassportLocalStrategy = require('passport-local').Strategy;
const path = require("path");
const session = require('express-session');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const MongoStore = require('connect-mongo')(session);

const config = require('./config');

const env = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 3000;

// Mongoose

mongoose.Promise = Promise;
mongooseTypes.loadTypes(mongoose);
mongoose.connect(config.db, {
    server: {
        socketOptions: {
            keepAlive: 1
        }
    }
});
const modelsPath = path.join(ROOT, 'models');
fs.readdirSync(modelsPath).forEach(file => require(path.join(modelsPath, file)));

// Passport

passport.serializeUser((user, done) => done(null, user.id));
const User = mongoose.model('User');
passport.deserializeUser((id, done) => User.findById(id, done));
passport.use(new PassportLocalStrategy(function (usernameOrEmail, password, done) {
    User.findOne({
        $or: [{
            username: usernameOrEmail
        }, {
            email: usernameOrEmail
        }]
    }).select('+passwordSalt +passwordHash').exec((err, user) => {
        if (err) {
            return done(err);
        } else if (!user) {
            return done(null, false, { message: '账户不存在' });
        } else if (!user.authenticate(password)) {
            return done(null, false, { message: '密码错误' });
        } else {
            return done(null, user);
        }
    });
}));

// Express

const app = express();

app.locals.ENV = env;
app.locals.ENV_DEVELOPMENT = (env === 'development');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: config.secret,
    store: new MongoStore({
        mongooseConnection: mongoose.connection
    })
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(require('./controllers'));

app.use(express.static(`${ROOT}/public`));
if (env === 'development') {
    const compiler = webpack(require('./webpack.config.dev'));
    app.use(webpackDevMiddleware(compiler, {
        noInfo: true,
        stats: {
            colors: true
        }
    }));
    app.use(webpackHotMiddleware(compiler));
}

app.use((req, res, next) => {
    const err = new Error('未找到资源');
    err.status = 404;
    next(err);
});
app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).send(err);
});

// Http

const server = http.createServer(app);

server.listen(port, () => console.log(`==> Listening on port ${server.address().port}`));
