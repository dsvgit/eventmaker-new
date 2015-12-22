
import { api } from 'app/js/utils/url.jsx';

export default function init() {
  $.ajaxSetup({
    headers: (function() {
      return {
        'X-Auth-Token': sessionStorage.getItem('token'),
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })()
  });

  $(document).ajaxError(function (ajaxError, readyState) {
    if (readyState.status == 401) {
      console.log("401. Redirecting...");
      var url = '/login';
      document.location.replace(url);
      console.log(url);
    } else {
    }
  });
}