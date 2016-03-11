import actions from 'actions/actionTypes';

const INITIAL_STATE = {
  fetch_state: 'NOT_FIRED',
  list: []
};
export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case actions.FETCH_TODO_REQUEST:
      return Object.assign({}, state, {fetch_state: 'FIRED'});
    case actions.FETCH_TODO_SUCCESS:
      return Object.assign({}, state, {fetch_state: 'SUCCESS', list: action.payload});
    case actions.FETCH_TODO_FAILURE:
      return Object.assign({}, state, {fetch_state: 'FAILURE', message: action.payload});
    default:
      return state;
  }
}
