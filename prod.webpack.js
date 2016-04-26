var ExtractTextPlugin = require('extract-text-webpack-plugin');
var AssetsPlugin = require('assets-webpack-plugin');
var webpack = require('webpack');
var path = require('path');
var BUILD_PATH = path.resolve(__dirname, 'public', 'build');
var config = {
  context: path.resolve(__dirname, 'app'),
  entry: {
    app: './index.js',
    vendor: ['react', 'react-dom', 'redux', 'react-redux', 'react-router', 'redux-thunk']
  },
  output: {
    path: BUILD_PATH,
    filename: '[name]-[chunkhash].js',
    publicPath: '/build/'
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
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&localIdentName=[local]---[hash:base64:5]')
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('[name]-[chunkhash].css'),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
        screw_ie8: true
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({name: 'vendor'}),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new AssetsPlugin()
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
