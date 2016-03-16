'use strict';
import express from 'express';
import compression from 'compression';
import path from 'path';
import webpackDevServer from './webpackDevServer';

import React from 'react';
import { RoutingContext, match, createMemoryHistory } from 'react-router';
import createLocation from 'history/lib/createLocation';
import createRoutes from './app/routes';
import store from './app/store';

const app = express();

const publicPath = path.resolve(__dirname, 'public');
const env = process.env.NODE_ENV;
const isDevelopment = env !== 'production';
if (isDevelopment) {
  webpackDevServer.createDevServer(app);
}

app.use(compression());
app.use(express.static(publicPath));

app.use('*', function (req, res) {
  let history = createMemoryHistory();
  let routes = createRoutes(history);
  let location = createLocation(req.url);
});

let server = app.listen(3000, () => {
  let host = server.address().address;
  let port = server.address().port;

  console.log('Sample app listening at http://%s:%s', host, port);
});
