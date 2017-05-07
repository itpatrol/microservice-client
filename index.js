/**
 * Send status.
 */
'use strict';

const request = require('./includes/request.js');
const signature = require('./includes/signature.js');

const bind = function(fn, me) { return function() { return fn.apply(me, arguments); }; };

/**
 * Constructor of MicroserviceClientClient object.
 *   .
 *   settings.URL = process.env.MONGO_URL;
 *   settings.secureKey = process.env.SECURE_KEY;
 *   settings.accessToken = if microservice-auth used, accessToken can be set here.
 */
function MicroserviceClient(settings) {
  var self = this;
  self.settings = settings;
  self.get = bind(self.get, self);
  self.post = bind(self.post, self);
  self.put = bind(self.put, self);
  self.delete = bind(self.delete, self);
  self.search = bind(self.search, self);
  self._request = bind(self._request, self);
}

/**
 * Settings for microservice.
 */
MicroserviceClient.prototype.settings = {};


/**
 * Preprocess request by signing in, setting headers and etc..
 *
 * @param {object} statusRequest
 *  - method
 *  - token
 *  - Request
 *  - RecordID
 * @param {function} callback - return result to callback function
 */
MicroserviceClient.prototype._request = function(statusRequest, callback) {
  var self = this;

  var signatureMethods = ['PUT', 'SEARCH', 'PATCH', 'POST', 'OPTIONS'];
  var recordMethods = ['PUT', 'PATCH', 'GET', 'DELETE' ];

  var url = self.settings.URL;

  var requestData = statusRequest.Request;

  var headers = {};
  if (self.settings.headers) {
    headers = self.settings.headers;
    headers['Accept'] = 'application/json';
  } else {
    headers = {
      Accept: 'application/json'
    }
  }

  // If we are running under node, set version User-agent.
  if (process.env.npm_package_version) {
    headers['User-Agent'] = 'MicroserviceClient.' + process.env.npm_package_version;
  };

  if (self.settings.accessToken) {
    headers.access_token = self.settings.accessToken;
  } else {
    if (signatureMethods.indexOf(statusRequest.method) > -1) {
      if (self.settings.secureKey) {
        headers.signature = 'sha256=' +
          signature('sha256', JSON.stringify(requestData), self.settings.secureKey);
      }
    } else {
      if (statusRequest.token) {
        headers.token = statusRequest.token;
      }
    }
  }

  if (recordMethods.indexOf(statusRequest.method) > -1) {
    if (statusRequest.RecordID) {
      var url = self.settings.URL;
      if (self.settings.URL.slice(-1) == '/') {
        url = url + statusRequest.RecordID;
      } else {
        url = self.settings.URL + '/' + statusRequest.RecordID;
      }
    }
  }
  var requestQuery = {
    url: url,
    method: statusRequest.method,
    headers: headers,
    type: 'json',
    contentType: 'application/json',
    processData: false,
    crossOrigin: true,
    error: function(err) {
      return callback(err.response, null);
    },
    success: function(resp) {
      return callback(null, resp);
    }
  }
  if (requestData) {
    requestQuery.data = JSON.stringify(requestData);
    requestQuery.dataOrigin = requestData;
  }
  request(requestQuery);
}

/**
 * Process GET (READ) request.
 *
 * @param {string} RecordID - sha256 for example.
 * @param {string} token - optional, 24 length long string.
 * @param {function} callback - return result to callback function
 */
MicroserviceClient.prototype.get = function(RecordID, token, callback) {
  var self = this;

  var statusRequest = {
    method: 'GET',
    RecordID: RecordID,
    Request: null
  }

  if (arguments.length === 2) {
    callback = token;
  } else {
    statusRequest.token = token;
  }

  return self._request(statusRequest, callback);
}

/**
 * Process DELETE request.
 *
 * @param {string} RecordID - sha256 for example.
 * @param {string} token - optional, 24 length long string.
 * @param {function} callback - return result to callback function
 */
MicroserviceClient.prototype.delete = function(RecordID, token, callback) {
  var self = this;
  var statusRequest = {
    method: 'DELETE',
    RecordID: RecordID,
    Request: null
  }

  if (arguments.length === 2) {
    callback = token;
  } else {
    statusRequest.token = token;
  }

  return self._request(statusRequest, callback);
}

/**
 * Process SEARCH (get list of documents based on search criteria) request.
 *
 * @param {object} data - values that need to be updated.
 * @param {function} callback - return result to callback function
 */
MicroserviceClient.prototype.search = function(data, callback) {
  var self = this;
  var statusRequest = {
    method: 'SEARCH',
    Request: data
  }
  return self._request(statusRequest, callback);
}

/**
 * Process POST (CREATE) request.
 *
 * @param {object} data - object with document to create.
 * @param {function} callback - return result to callback function
 */
MicroserviceClient.prototype.post = function(data, callback) {
  var self = this;
  var statusRequest = {
    method: 'POST',
    Request: data
  }
  return self._request(statusRequest, callback);
}

/**
 * Process OPTIONS (get data about supported methods and etc.) request.
 *
 * @param {object} data - ignored. For future use.
 * @param {function} callback - return result to callback function
 */
MicroserviceClient.prototype.options = function(data, callback) {
  var self = this;
  var statusRequest = {
    method: 'OPTIONS',
    Request: data
  }
  return self._request(statusRequest, callback);
}

/**
 * Process PUT (UPDATE) request.
 *
 * @param {string} RecordID - sha256 for example.
 * @param {string} token - optional, 24 length long string .
 * @param {object} data - values that need to be updated.
 * @param {function} callback - return result to callback function
 */
MicroserviceClient.prototype.put = function(RecordID, token, data, callback) {
  var self = this;
  var statusRequest = {
    method: 'PUT',
    RecordID: RecordID
  }

  if (arguments.length === 3) {
    callback = data;
    data = token
  } else {
    statusRequest.token = token;
  }
  statusRequest.Request = data;

  return self._request(statusRequest, callback);
}


module.exports = MicroserviceClient;
