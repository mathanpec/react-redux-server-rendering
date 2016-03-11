import fetch from 'isomorphic-fetch';

const url = 'http://jsonplaceholder.typicode.com/';

function fetchTodos () {
  return fetch(`${url}todos`).then(response => response.json());
}

export default {
  fetchTodos
};
