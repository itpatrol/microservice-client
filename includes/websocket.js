/**
 * WebSocket.
 */
'use strict';
var Emitter = require('browser-emitter');
var bind = function(fn, me) { return function() { return fn.apply(me, arguments); }; };
const createHash = require('./hash.js');

function MicroserviceWebSocket(settings) {
  Emitter.call(this);
  var self = this;
  self.settings = settings;
  var url = self.settings.URL;
  if (self.settings.URL.slice(-1) == '/') {
    url = url + self.settings.token;
  } else {
    url = self.settings.URL + '/' + self.settings.token;
  }
  self.cmdCallbacks = {}
  self.websocket = new WebSocket(url);
  self.websocket.onmessage = function(event) {
    var answer = false;
    try {
      answer = JSON.parse(event.data);
      var eventName = 'unknown';
      switch (answer.method) {
        case 'POST': {
          eventName = 'create';
          break;
        }
        case 'GET': {
          eventName = 'read';
          break;
        }
        case 'PUT': {
          eventName = 'update';
          break;
        }
        case 'DELETE': {
          eventName = 'delete';
          break;
        }
        case 'SEARCH': {
          eventName = 'search';
          break;
        }
      }
      var eventDeatils = {
        path: answer.path,
        scope: answer.scope,
      }
      if (answer.loaders) {
        for (var loader in answer.loaders) {
          eventDeatils[loader] = answer.loaders[loader];
        }
      }
      if (!answer.meta) {
        eventDeatils.message = answer.message;
      }

      // on('create|read|update|delete|search').
      self.emit(eventName, eventDeatils);

      // on('create|read|update|delete|search:scope').
      self.emit(eventName + ':' + answer.scope, eventDeatils);
      if (answer.loaders) {
        for (var loader in answer.loaders) {
          var eventSubName = eventName + ':' + answer.scope + ':'
            + loader + '=' + answer.loaders[loader];

          // on('create|read|update|delete|search:scope:loader=value').
          self.emit(eventSubName, eventDeatils);
        }
      }
      eventDeatils.type = eventName;
      if (answer.cmdHash) {
        if (self.cmdCallbacks[answer.cmdHash]) {
          self.cmdCallbacks[answer.cmdHash](eventDeatils);
          delete self.cmdCallbacks[answer.cmdHash];
        }
      }

      // on('message').
      self.emit('message', eventDeatils);
    } catch(e) {
      return self.emit('error', {
        URL: self.settings.URL,
        token: self.settings.token,
        error: e
      });
    }
  }
  self.websocket.onopen = function(event) {
    self.emit('open', {
      URL: self.settings.URL,
      token: self.settings.token
    });
  }
  self.websocket.onclose = function(event) {
    self.emit('close', {
      URL: self.settings.URL,
      token: self.settings.token,
      code: event.code,
      reason: event.reason
    });
  }
  self.websocket.onerror = function(event) {
    self.emit('error', {
      URL: self.settings.URL,
      token: self.settings.token
    });
  }
  self.get = bind(self.get, self);
  self.post = bind(self.post, self);
  self.put = bind(self.put, self);
  self.delete = bind(self.delete, self);
  self.search = bind(self.search, self);
  self._request = bind(self._request, self);
}
Emitter.inherits(MicroserviceWebSocket);

/**
 * Settings for microservice.
 */
MicroserviceWebSocket.prototype.settings = {};


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
MicroserviceWebSocket.prototype._request = function(statusRequest, callback) {
  var self = this;
  if (callback) {
    statusRequest.cmdHash = createHash(statusRequest);
    self.cmdCallbacks[statusRequest.cmdHash] = callback;
  }
  self.websocket.send(JSON.stringify(statusRequest));
}

/**
 * Process GET (READ) request.
 *
 * @param {string} RecordID - sha256 for example.
 * @param {string} token - optional, 24 length long string.
 * @param {function} callback - return result to callback function
 */
MicroserviceWebSocket.prototype.get = function(EndPoint, RecordID, token, callback) {
  var self = this;

  var statusRequest = {
    method: 'GET',
    RecordID: RecordID,
    Request: null,
    EndPoint: EndPoint,
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
MicroserviceWebSocket.prototype.delete = function(EndPoint, RecordID, token, callback) {
  var self = this;
  var statusRequest = {
    method: 'DELETE',
    RecordID: RecordID,
    Request: null,
    EndPoint: EndPoint,
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
MicroserviceWebSocket.prototype.search = function(EndPoint, data, callback) {
  var self = this;
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
MicroserviceWebSocket.prototype.post = function(EndPoint, data, callback) {
  var self = this;
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
MicroserviceWebSocket.prototype.options = function(EndPoint, data, callback) {
  var self = this;
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
MicroserviceWebSocket.prototype.put = function(EndPoint, RecordID, token, data, callback) {
  var self = this;
  var statusRequest = {
    method: 'PUT',
    RecordID: RecordID,
    EndPoint: EndPoint,
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


module.exports = MicroserviceWebSocket;
