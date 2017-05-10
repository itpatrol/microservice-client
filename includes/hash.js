/**
 * Generate hash Signature for request
 */
'use strict';

var createHash = require('sha.js')

/**
 * Create unique hash for object.
 *
 * @param {object} obj - object to create sha.
 *
 * @returns {string} return signature string.
 */
module.exports = function hash(obj) {

  return createHash('sha256')
               .update(JSON.stringify(data) + Date.now())
               .digest('hex');
};
