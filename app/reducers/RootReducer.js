import {combineReducers} from 'redux';
import todo from './TodoReducer';
import dummy from './DummyReducer';

export default combineReducers({
  todo,
  dummy
});
