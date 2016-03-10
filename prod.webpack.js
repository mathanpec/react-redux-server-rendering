var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var path = require('path');
var BUILD_PATH = path.resolve(__dirname, 'public', 'build');
var config = {
  devtool: 'source-map',
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
        loader: 'style-loader!css-loader?modules&localIdentName=[hash:base64:5]'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.tpl.html'),
      filename: 'index.html'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
        screw_ie8: true
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({name: 'vendor'}),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ],
  resolve: {
    alias: {
      components: path.resolve(__dirname, 'app', 'components'),
      containers: path.resolve(__dirname, 'app', 'containers'),
      reducers: path.resolve(__dirname, 'app', 'reducers')
    }
  }
};

module.exports = config;
