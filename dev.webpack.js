var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var BUILD_PATH = path.resolve(__dirname, 'public', 'build');
var config = {
  devtool: 'source-map',
  context: path.resolve(__dirname, 'app'),
  entry: [
    './index.js',
    'webpack-hot-middleware/client'
  ],
  output: {
    path: BUILD_PATH,
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.s?css$/,
        loader: ExtractTextPlugin.extract('isomorphic-style-loader', 'css-loader?modules&localIdentName=[local]')
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('bundle.css'),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
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
