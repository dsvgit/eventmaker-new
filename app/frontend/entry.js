'use strict';
require('normalize.css/normalize.css');
require('app/css/font-roboto.css');
require('app/css/site.css');

var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

require('app/js/start.jsx');