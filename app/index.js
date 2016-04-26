import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {browserHistory} from 'react-router';
import configureStore from './store';
import createRoutes from './routes';

let state;

if (window.__REDUX_STATE__) {
  state = JSON.parse(window.__REDUX_STATE__);
}

const store = configureStore(state);

class App extends Component {
  render () {
    return (
      <Provider store={store}>
        {createRoutes(browserHistory)}
      </Provider>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('root'));
