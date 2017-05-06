/**
 * Generate hash Signature for request
 */
'use strict';

var createHmac = require('create-hmac');

/**
 * Sign string with secret key or token.
 *
 * @param {string} protocol - sha256 for example.
 * @param {string} data - string to sign.
 * @param {string} secret - secret key
 *
 * @returns {string} return signature string.
 */
module.exports = function signature(protocol, data, secret) {
  return createHmac(protocol, secret)
               .update(data)
               .digest('hex');
};
