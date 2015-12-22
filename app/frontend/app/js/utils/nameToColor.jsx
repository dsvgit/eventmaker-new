
export default function nameToColor(str) {
  var hash = 0;
  var color = '#';
  var i;
  var value;
  var strLength;

  if(!str) {
    return color + '333333';
  }

  strLength = str.length;

  for (i = 0; i < strLength; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  for (i = 0; i < 3; i++) {
    value = (hash >> (i * 8)) & 0xFF;
    color += ('00' + value.toString(16)).substr(-2);
  }

  return color;
}