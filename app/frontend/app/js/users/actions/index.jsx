import { api, jsonOptions } from 'app/js/utils/url.jsx';
import { UPDATE_USERS, UPDATE_CURRENT_USER, UPDATE_USER } from '../constants/index.jsx'

function updateUsers(users) {
  console.log('action update users', users);
  return { type: UPDATE_USERS, users}
}

function updateCurrentUser(user) {
  console.log('action update current user', user);
  return { type: UPDATE_CURRENT_USER, user}
}

function updateUser(user) {
  console.log('action update current user', user);
  return { type: UPDATE_USER, user}
}

export function fetchUsers() {
  return dispatch => {
    $.ajax({
      url: api('api/users'),
      method: 'GET',
      success: function(response) {
        console.log('ajax action fetch users ', response);
        dispatch(updateUsers(response));
      }
    });
  }
}

export function addUser(user) {
  return dispatch => {
    $.ajax({
      url: api('api/users'),
      method: 'POST',
      data: JSON.stringify(user),
      success: function(response) {
        console.log('action add user');
        dispatch(fetchUsers());
      }
    });
  }
}

export function deleteUsers(ids) {
  return dispatch => {
    $.ajax({
      url: api('api/users/delete'),
      method: 'POST',
      data: JSON.stringify({
        ids: ids
      }),
      success: function(resp) {
        console.log('action delete user', resp);
        dispatch(fetchUsers());
      }
    });
  }
}

export function fetchCurrentUser(callback) {
  return dispatch => {
    $.ajax({
      url: api('api/users/profile'),
      method: 'GET',
      success: function(response) {
        console.log('ajax action fetch current user', response);
        if (callback) callback(response);
        dispatch(updateCurrentUser(response));
      }
    });
  }
}

export function editCurrentUser(user) {
  return dispatch => {
    $.ajax({
      url: api('api/users/'),
      method: 'PUT',
      data: JSON.stringify(user),
      success: function(response) {
        console.log('edit current user');
        dispatch(fetchCurrentUser());
      }
    });
  }
}

export function fetchUser(id) {
  return dispatch => {
    $.ajax({
      url: api('api/users/' + id),
      method: 'GET',
      success: function(response) {
        console.log('ajax action fetch user', response);
        dispatch(updateUser(response));
      }
    });
  }
}