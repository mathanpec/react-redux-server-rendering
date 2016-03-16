var webpack = require('webpack');
var path = require('path');
var BUILD_PATH = path.resolve(__dirname, 'server');
var config = {
  entry: [
    './server.js'
  ],
  target: 'node',
  output: {
    path: BUILD_PATH,
    filename: 'index.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: [/node_modules/]
      },
      {
        test: /\.json?$/,
        loaders: ['json']
      },
      {
        test: /\.s?css$/,
        loader: 'isomorphic-style-loader!css-loader?modules&localIdentName=[path][name]---[local]---[hash:base64:5]'
      }
    ],
    noParse: [/webpackDevServer/]
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin()
  ],
  resolve: {
    alias: {
      components: path.resolve(__dirname, 'app', 'components'),
      containers: path.resolve(__dirname, 'app', 'containers'),
      reducers: path.resolve(__dirname, 'app', 'reducers'),
      actions: path.resolve(__dirname, 'app', 'actions'),
      api: path.resolve(__dirname, 'app', 'api')
    }
  }
};

module.exports = config;
