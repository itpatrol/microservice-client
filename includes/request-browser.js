var request = require('reqwest');

function convertHeaders(headers) {
  var lines = headers.split('\n');
  var resultHeaders = {}
  for (var i in lines) {
    var record = lines[i].split(':');
    if (record.length != 2) {
      continue;
    }
    var value = false;
    if (record[1]) {
      if (typeof record[1] == 'string') {
        value = record[1].trim().toLowerCase();
      } else {
        value = record[1];
      }
    }
    resultHeaders[record[0].trim().toLowerCase()] = value;
  }
  return resultHeaders;
}
/**
 * Sign string with secret key or token.
 *
 * @param {object} options - reqwest style object.
 *
 * @returns {function} return request that wrapp around request.
 */
module.exports = function requestWrapper(options) {
  options.type = 'raw';
  options.processData = false;
  options.crossOrigin = true;
  var _originSuccess = options.success;
  var _originError = options.error;
  options.success = function(resp) {
    var headers = convertHeaders(resp.getAllResponseHeaders());
    var answer = false;
    try {
      answer = JSON.parse(resp.response)
    } catch (e) {
      e.response = resp.response;
      e.headers = headers;
      return options.error(e);
    }
    return _originSuccess(answer, headers);
  }
  options.error = function(err) {
    err.headers = convertHeaders(err.getAllResponseHeaders());
    return _originError(err);
  }
  request(options);
};
