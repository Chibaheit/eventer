const webpack = require('webpack')

let plugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': '"development"'
  }),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin()
]

module.exports = {
  devtool: 'source-map',
  context: `${__dirname}/views`,
  entry: {
    main: [
      'webpack-hot-middleware/client',
      'babel-polyfill',
      './index.js'
    ]
  },
  output: {
    path: `${__dirname}/public`,
    publicPath: '/',
    filename: '[name].bundle.js'
  },
  plugins: plugins,
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'stage-0', 'react', 'react-hmre'],
          plugins: ['transform-decorators-legacy', 'antd']
        }
      }, {
        test: /\.scss$/,
        loaders: [
          'style',
          'css?modules&importLoaders=1&localIdentName=[name]_[local]_[hash:base64:5]',
          'postcss?sourceMap',
          'sass?sourceMap'
        ]
      }, {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
        loaders: ['url?limit=10000']
      }, {
        test: /\.(eot|ttf|wav|mp3)$/,
        loaders: ['file']
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.scss']
  },
  postcss: [
    require('autoprefixer')({ browsers: ['last 3 versions'] })
  ]
}
