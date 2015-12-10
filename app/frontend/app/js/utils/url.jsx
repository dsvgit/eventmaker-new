export function api(url) {
  return 'http://localhost:8080/Eventmaker/' + url;
}

export function jsonOptions(method) {
  var headers = {
    'X-Auth-Token': sessionStorage.getItem('token')
  };
  if (method == 'GET') return headers;
  return Object.assign({}, headers, {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  });
}

export function serializeQuery(paramsObj) {
  var k, params = [];
  for (k in paramsObj) {
    if (paramsObj.hasOwnProperty(k) && paramsObj[k] !== undefined) {
      params.push(encodeURIComponent(k) + "=" + encodeURIComponent(paramsObj[k]));
    }
  }
  return params.join("&");
}