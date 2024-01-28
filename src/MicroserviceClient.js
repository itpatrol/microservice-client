import axios from 'axios';
import debug from "./debug.js";
import signature from './signature.js'


/**
 * Constructor of MicroserviceClientClient object.
 *   .
 *   settings.URL = process.env.SELF_URL;
 *   settings.secureKey = process.env.SECURE_KEY;
 *   settings.accessToken = if microservice-auth used, accessToken can be set here.
 */
function MicroserviceClient(settings) {
  this.settings = settings
  var config = {
    baseURL: settings.URL,
    headers: {}
  }
  if(settings.headers) {
    config.headers = settings.headers
  }
  if(settings.accessToken) {
    config.headers['Access-Token'] = settings.accessToken;
  }
  
  // If we are running under node, set version User-agent.
  if (process && process.env && process.env.npm_package_version) {
    config.headers['User-Agent'] = 'MicroserviceClient.' + 
    process.env.npm_package_name + '.' +
    process.env.npm_package_version;
  }
  this.instance = axios.create(config);
}

/**
 * Settings for microservice.
 */
MicroserviceClient.prototype.settings = {};


/**
 * Preprocess request by signing in, setting headers and etc..
 *
 * @param {object} reqOptions
 *  - method
 *  - headers
 * @returns {Promise}
 */
MicroserviceClient.prototype._request = async function(reqOptions) {
  if(reqOptions.headers == undefined) {
    reqOptions.headers = {}
  }
  
  var signatureMethods = ['PUT', 'SEARCH', 'PATCH', 'POST', 'OPTIONS'];

  if (this.settings.secureKey && signatureMethods.indexOf(reqOptions.method.toUpperCase()) !== -1) {
    var hash = await signature(JSON.stringify(reqOptions.data), this.settings.secureKey);
    reqOptions.headers.signature = 'sha256=' + hash
    reqOptions.headers['Access-Token'] = false
  }

  debug.debug('reqOptions', reqOptions)
  
  return this.instance.request(reqOptions).
  then(function(response) {
    debug.debug('request', response.config.headers)
    debug.debug('response', response);
    debug.log(response.config.method.toUpperCase(), response.config.url, response.status)
    return {
      code: response.status,
      answer: response.data, 
      headers: JSON.parse(JSON.stringify(response.headers))
      
    }
  }).
  catch(function(error){
    debug.debug('catch', error.request)
    if(error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      debug.log(error.response.config.method.toUpperCase(), error.response.config.url, error.response.status, error.response.data.message)
      return {
        code: error.response.status,
        error: error.response.data, 
        headers: JSON.parse(JSON.stringify(error.response.headers))
      }
    } else {
      return {
        code: 500,
        error: error, 
      }
    }
  })
}
/**
 * Process GET (READ) request.
 *
 * @param {string} RecordID - sha256 for example.
 * @param {string} RecordToken - optional, 24 length long string.
 * @returns {Promise}
 */
MicroserviceClient.prototype.get = function(RecordID, RecordToken) {
  var reqOptions = {
    method: 'GET',
    url: '/' + RecordID,
  }
  if (RecordToken != undefined) {
    reqOptions.headers = {
      token: RecordToken,
      'Access-Token': false
    }
  }
  return this._request(reqOptions);
}

/**
 * Process DELETE request.
 *
 * @param {string} RecordID - sha256 for example.
 * @param {string} RecordToken - optional, 24 length long string.
 * @returns {Promise}
 */
MicroserviceClient.prototype.delete = function(RecordID, RecordToken) {
  var reqOptions = {
    method: 'DELETE',
    url: '/' + RecordID,
  }
  if (RecordToken != undefined) {
    reqOptions.headers = {
      token: RecordToken,
      'Access-Token': false
    }
  }
  return this._request(reqOptions);
}

/**
 * Process SEARCH (get list of documents based on search criteria) request.
 *
 * @param {string} EndPoint - like `users` to get access to api.net/users
 * @param {object} data - values that need to be updated.
 * @returns {Promise}
 */
MicroserviceClient.prototype.search = function(EndPoint, data) {
  var reqOptions = {
    method: 'SEARCH',
    url: '/',
  }
  if (arguments.length === 1) {
    data = EndPoint;
    EndPoint = false;
  }
  if(EndPoint) {
    reqOptions.url += EndPoint
  }
  if(data) {
    reqOptions.data = data
  }
  
  return this._request(reqOptions);
}

/**
 * Process POST (CREATE) request.
 * @param {string} EndPoint - like `users` to get access to api.net/users
 * @param {object} data - object with document to create.
 * @returns {Promise}
 */
MicroserviceClient.prototype.post = function(EndPoint, data) {
  var reqOptions = {
    method: 'POST',
    url: '/',
  }
  if (arguments.length === 1) {
    data = EndPoint;
    EndPoint = false;
  }
  if(EndPoint) {
    reqOptions.url += EndPoint
  }
  if(data) {
    reqOptions.data = data
  }
  
  return this._request(reqOptions);
}

/**
 * Process OPTIONS (get data about supported methods and etc.) request.
 *
 * @param {object} data - ignored. For future use.
 * @returns {Promise}
 */
MicroserviceClient.prototype.options = function(EndPoint, data) {
  var reqOptions = {
    method: 'OPTIONS',
    url: '/',
  }
  if(EndPoint) {
    reqOptions.url += EndPoint
  }
  if(data) {
    reqOptions.data = data
  }
  
  return this._request(reqOptions);
}

/**
 * Process PUT (UPDATE) request.
 *
 * @param {string} RecordID - sha256 for example.
 * @param {string} RecordToken - optional, 24 length long string.
 * @param {object} data - values that need to be updated.
 * @returns {Promise}
 */
MicroserviceClient.prototype.put = function(RecordID, RecordToken, data) {
  var reqOptions = {
    method: 'PUT',
    url: '/' + RecordID,
  }
  if (arguments.length === 2) {
    data = RecordToken;
    RecordToken = false;
  }

  if (RecordToken != false) {
    reqOptions.headers = {
      token: RecordToken,
      'Access-Token': false
    }
  }

  if(data) {
    reqOptions.data = data
  }
  
  return this._request(reqOptions);
}

export default MicroserviceClient