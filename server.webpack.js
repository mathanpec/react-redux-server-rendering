var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
var BUILD_PATH = path.resolve(__dirname);

var modules = {};
var mode = process.env.NODE_ENV;
var nodeDirectories = fs.readdirSync('node_modules');
nodeDirectories.filter(function (modName) {
  return ['.bin'].indexOf(modName) === -1;
})
.forEach(function (mod) {
  modules[mod] = 'commonjs ' + mod;
});

if(mode !== 'production'){
  modules['./webpack-assets.json'] = 'commonjs ./webpack-assets.json'; // Need only in prod mode.
}

var config = {
  entry: [
    './server.js'
  ],
  target: 'node',
  node: {
    __dirname: true
  },
  externals: modules,
  output: {
    path: BUILD_PATH,
    filename: 'server-bundle.js'
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
        loader: 'isomorphic-style-loader!css-loader?modules&localIdentName=[local]' + (mode === 'production' ? '---[hash:base64:5]' : '')
      }
    ]
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(mode)
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
