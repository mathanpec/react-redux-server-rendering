import actions from './actionTypes';
import api from 'api';

function fetchTodoAction () {
  return (dispatch) => {
    dispatch({type: actions.FETCH_TODO_REQUEST});
    return api.fetchTodos().then(
      (response) => {
        dispatch({
          type: actions.FETCH_TODO_SUCCESS,
          payload: response
        });
      },
      (errorMessage) => {
        dispatch({
          type: actions.FETCH_TODO_FAILURE,
          payload: errorMessage
        });
      }
    );
  };
}

export {
  fetchTodoAction
};
