import { api } from 'app/js/utils/url.jsx';

import { LOGIN } from '../constants/index.jsx';

export function login(credentials) {
  var params = serializeQuery(credentials);
  console.log('try login ', credentials);
  return dispatch => {
    $.ajax({
      url: api('api/auth/login'),
      method: 'POST',
      data: JSON.stringify(credentials),
      success: function(resp) {
        console.log(resp);
        sessionStorage.setItem('token', resp)
      }
    });
  }
}