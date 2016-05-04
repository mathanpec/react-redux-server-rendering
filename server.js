'use strict';
import express from 'express';
import compression from 'compression';
import path from 'path';
import webpackDevServer from './webpackDevServer';

import React from 'react';
import ReactDOM from 'react-dom/server';
import { RouterContext, match, createMemoryHistory } from 'react-router';
import {Provider} from 'react-redux';
import createLocation from 'history/lib/createLocation';
import createRoutes from './app/routes';
import configureStore from './app/store';
import {fetchTodoAction} from 'actions/actionCreators';

const app = express();

const publicPath = path.resolve(__dirname, 'public');
const env = process.env.NODE_ENV;
const isDevelopment = env !== 'production';
var scriptFiles, styleFiles;
if (isDevelopment) {
  webpackDevServer.createDevServer(app);
  scriptFiles = ['/bundle.js'];
  styleFiles = ['/bundle.css'];
} else {
  let assets = require('./webpack-assets.json');
  scriptFiles = [assets.vendor.js, assets.app.js];
  styleFiles = [assets.app.css];
}

app.use(compression());
app.use(express.static(publicPath));
app.engine('jsx', require('express-react-views').createEngine());
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'jsx');

app.use('*', function (req, res) {
  let startTime = new Date().getTime();
  isDevelopment && console.log('On request - ' + (startTime + ''));
  let history = createMemoryHistory();
  let routes = createRoutes(history);
  let location = createLocation(req.url);
  let store = configureStore();
  match({routes, location}, (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      res.redirect(301, redirectLocation.pathname + redirectLocation.search);
    } else if (error) {
      res.send(500, error.message);
    } else if (renderProps == null) {
      res.send(404, 'Not found');
    } else {
      isDevelopment && console.log('Time till Before dispatch - ' + (new Date().getTime() - startTime + ''));
      store.dispatch(fetchTodoAction()).then((response) => {
        isDevelopment && console.log('Time till After dispatch - ' + (new Date().getTime() - startTime + ''));
        let reduxState = JSON.stringify(store.getState());
        let html = ReactDOM.renderToString(
          <Provider store={store}>
            { <RouterContext {...renderProps}/> }
          </Provider>
        );
        isDevelopment && console.log('Time till After renderToString - ' + (new Date().getTime() - startTime + ''));
        res.render('index', {content: html, state: reduxState, scripts: scriptFiles, styles: styleFiles});
        isDevelopment && console.log('Time till After render - ' + (new Date().getTime() - startTime + ''));
      });
    }
  });
});

let server = app.listen(3000, () => {
  let host = server.address().address;
  let port = server.address().port;

  console.log('Sample app listening at http://%s:%s', host, port);
});
