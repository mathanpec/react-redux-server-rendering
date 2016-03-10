import React from 'react';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import Main from 'containers/MainContainer';
import Todo from 'containers/TodoContainer';
import Dummy from 'containers/DummyContainer';

export default (
  <Router history={browserHistory}>
    <Route path='/' component={Main}>
      <IndexRoute component={Todo}/>
      <Route path='todo' component={Todo}/>
      <Route path='dummy' component={Dummy}/>
    </Route>
  </Router>
);
