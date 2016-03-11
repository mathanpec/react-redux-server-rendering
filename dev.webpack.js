var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var path = require('path');
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
    publicPath: '/holycow/'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: '/node_modules/'
      },
      {
        test: /\.s?css$/,
        loader: 'style-loader!css-loader?modules&localIdentName=[path][name]---[local]---[hash:base64:5]'
      }
    ]
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.tpl.html'),
      filename: 'index.html'
    })
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
