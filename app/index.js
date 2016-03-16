import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserHistory} from 'react-router';
import store from './store';
import createRoutes from './routes';

class App extends Component {
  render () {
    return (
      <Provider store={store}>
        {createRoutes(BrowserHistory)}
      </Provider>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('root'));
