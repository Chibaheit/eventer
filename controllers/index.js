'use strict';

const Router = require('express').Router;

const profileRouter = require('./profile');
const sessionRouter = require('./session');
const usersRouter = require('./users');

const apiRouter = Router();
apiRouter.use(profileRouter);
apiRouter.use(sessionRouter);
apiRouter.use(usersRouter);

const router = Router();
router.use('/api', apiRouter);

module.exports = router;
