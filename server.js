'use strict';

let express = require('express');
let compression = require('compression');
let path = require('path');
let webpack = require('webpack');
let webpackDevMiddleware = require('webpack-dev-middleware');
let webpackHotMiddleware = require('webpack-hot-middleware');
let httpProxy = require('http-proxy');
let webpackconfig = require('./dev.webpack');

const app = express();

const publicPath = path.resolve(__dirname, 'public');
const env = process.env.NODE_ENV;
const isDevelopment = env !== 'production';
const proxy = httpProxy.createProxyServer({target: 'http://localhost:3000' + webpackconfig.output.publicPath});

app.use(compression());
app.use(express.static(publicPath));
if (isDevelopment) {
  let compiler = webpack(webpackconfig);
  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackconfig.output.publicPath
  }));
  app.use(webpackHotMiddleware(compiler));
}

app.use('*', function (req, res) {
  if (isDevelopment) {
    req.url = '';
    proxy.web(req, res);
  } else {
    res.sendFile(path.join(__dirname, 'public/build/index.html'));
  }
});

let server = app.listen(3000, () => {
  let host = server.address().address;
  let port = server.address().port;

  console.log('Sample app listening at http://%s:%s', host, port);
});
