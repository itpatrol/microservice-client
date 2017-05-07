/**
 * Generate hash Signature for request
 */
'use strict';

const request = require('request');

/**
 * Sign string with secret key or token.
 *
 * @param {object} options - reqwest style object.
 *
 * @returns {function} return request that wrapp around request.
 */
module.exports = function requestWrapper(options) {
  request({
    uri: options.url,
    method: options.method,
    headers: options.headers,
    json: true,
    body: options.data
  }, function(error, response, body) {
    if (error) {
      return options.error(error);
    }
    if (response.statusCode == 200) {
      return options.success(null, body);
    }
    var err = new TypeError('Response code: ' + response.statusCode);
    return options.error(error);
  });
};
