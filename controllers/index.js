'use strict';

const Router = require('express').Router;

const profileRouter = require('./profile');

const apiRouter = Router();
apiRouter.use(profileRouter);

const router = Router();
router.use('/api', apiRouter);

module.exports = router;
