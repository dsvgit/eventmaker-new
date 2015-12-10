import qajax from 'qajax';

import { api, jsonOptions } from 'app/js/utils/url.jsx';
import { UPDATE_USERS } from '../constants/index.jsx'

function updateUsers(users) {
  console.log('action update users', users);
  return { type: UPDATE_USERS, users}
}

export function fetchUsers() {
  return dispatch => {
    qajax({
      url: api('api/users'),
      method: 'GET',
      headers: jsonOptions('GET')
    }).then(resp => {
      console.log('action fetch users', JSON.parse(resp.responseText));
      dispatch(updateUsers(JSON.parse(resp.responseText)));
    });
  }
}

export function addUser(user) {
  return dispatch => {
    qajax({
      url: api('api/users'),
      method: 'POST',
      data: user,
      headers: jsonOptions('POST')
    }).then(resp => {
      console.log('action add user');
      dispatch(fetchUsers());
    });
  }
}

export function deleteUsers(ids) {
  return dispatch => {
    qajax({
      url: api('api/users/delete'),
      method: 'POST',
      data: JSON.stringify({
        ids: ids
      }),
      headers: jsonOptions('POST')
    }).then(resp => {
      console.log('action delete user', resp);
      dispatch(fetchUsers());
    });
  }
}