'use strict'
global.Promise = require('bluebird')
global.ROOT = __dirname

const http = require('http')
const express = require('express')

const bodyParser = require('body-parser')

const logger = require('morgan')

const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

const env = process.env.NODE_ENV || 'development'
const port = process.env.PORT || 3000

const app = express()
app.locals.ENV = env
app.locals.ENV_DEVELOPMENT = (env === 'development')

app.use(logger('dev'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static(`${ROOT}/public`))
if (env === 'development') {
  const compiler = webpack(require('./webpack.config.dev'));
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    stats: { colors: true }
  }));
  app.use(webpackHotMiddleware(compiler));
}

app.use((err, req, res, next) => {
  res.status(500).send(err.stack);
  console.error(err);
});

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`==> Listen on port ${server.address().port}`);
});
