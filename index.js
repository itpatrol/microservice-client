/**
 * Send status.
 */
'use strict';

var request = require('./includes/request.js');
var signature = require('./includes/signature.js');

var bind = function(fn, me) { return function() { return fn.apply(me, arguments); }; };

/**
 * Constructor of MicroserviceClientClient object.
 *   .
 *   settings.URL = process.env.SELF_URL;
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

  var requestData = statusRequest.Request;

  var headers = {};
  if (self.settings.headers) {
    headers = self.settings.headers;
    if(!headers['Accept']) {
      headers['Accept'] = 'application/json';
    }
  } else {
    headers = {
      Accept: 'application/json'
    }
  }

  // If we are running under node, set version User-agent.
  if (process.env.npm_package_version && !process.browser) {
    headers['User-Agent'] = 'MicroserviceClient.' + process.env.npm_package_name
      + '.' + process.env.npm_package_version;
  };

  if (self.settings.accessToken) {
    headers.access_token = self.settings.accessToken;
    headers['Access-Token'] = self.settings.accessToken;
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
  var url = self.settings.URL;
  if (url.slice(-1) == '/') {
    url = url.substring(0, url.length - 1);
  }

  if (statusRequest.EndPoint) {
    url = url + '/' + statusRequest.EndPoint;
  }

  if (statusRequest.RecordID) {
    url = url + '/' + statusRequest.RecordID;
  }

  var requestQuery = {
    url: url,
    method: statusRequest.method,
    headers: headers,
    contentType: 'application/json',
    error: function(err) {
      return callback(err.response, null, err.headers);
    },
    success: function(resp, headers) {
      return callback(null, resp, headers);
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
MicroserviceClient.prototype.search = function(EndPoint, data, callback) {
  var self = this;
  if (arguments.length === 2) {
    callback = data;
    data = EndPoint;
    EndPoint = false;
  }
  var statusRequest = {
    method: 'SEARCH',
    Request: data,
    EndPoint: EndPoint,
  }

  return self._request(statusRequest, callback);
}

/**
 * Process POST (CREATE) request.
 *
 * @param {object} data - object with document to create.
 * @param {function} callback - return result to callback function
 */
MicroserviceClient.prototype.post = function(EndPoint, data, callback) {
  var self = this;
  if (arguments.length === 2) {
    callback = data;
    data = EndPoint;
    EndPoint = false;
  }
  var statusRequest = {
    method: 'POST',
    Request: data,
    EndPoint: EndPoint,
  }
  return self._request(statusRequest, callback);
}

/**
 * Process OPTIONS (get data about supported methods and etc.) request.
 *
 * @param {object} data - ignored. For future use.
 * @param {function} callback - return result to callback function
 */
MicroserviceClient.prototype.options = function(EndPoint, data, callback) {
  var self = this;
  if (arguments.length === 2) {
    callback = data;
    data = EndPoint;
    EndPoint = false;
  }
  var statusRequest = {
    method: 'OPTIONS',
    Request: data,
    EndPoint: EndPoint,
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
