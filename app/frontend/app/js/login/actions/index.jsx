import qajax from 'qajax';
import { api, jsonOptions, serializeQuery } from 'app/js/utils/url.jsx';

import { LOGIN } from '../constants/index.jsx';

export function login(credentials) {
  var params = serializeQuery(credentials);
  return dispatch => {
    qajax({
      url: api('api/auth/login?' + params),
      method: 'GET',
      headers: jsonOptions('GET')
    }).then(resp => {
      console.log(resp.responseText);
      sessionStorage.setItem('token', resp.responseText)
    });
  }
}