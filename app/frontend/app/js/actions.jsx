import { get, post, del } from 'sugar-xhr';
import { api, jsonOptions } from './utils/url.jsx';

import { ADD_USER, DELETE_USERS, UPDATE_USERS } from './constants.jsx'

export function addUser(user) {
  return dispatch => {
    $.ajax({
      url: api('api/users'),
      method: 'POST',
      data: JSON.stringify(user),
      success: function() {
        console.log('action add user');
        dispatch(fetchUsers());
      }
    });
  }
}

function updateUsers(users) {
  console.log('action update users', users);
  return { type: UPDATE_USERS, users}
}

export function deleteUsers(ids) {
  return dispatch => {
    $.ajax({
      url: api('api/users/delete'),
      method: 'POST',
      data: JSON.stringify({ ids: ids}),
      success: function(resp) {
        console.log('action delete user', resp);
        dispatch(fetchUsers());
      }
    });
  }
}

export function fetchUsers() {
  return function (dispatch) {
    $.ajax({
      url: api('api/users'),
      method: 'GET',
      success: function(resp) {
        console.log('action fetch users', resp);
        dispatch(updateUsers(resp));
      }
    });
  }
}