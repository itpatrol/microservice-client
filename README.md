# microservice-client

[![Gitter](https://img.shields.io/gitter/room/microservice-framework/chat.svg?style=flat-square)](https://gitter.im/microservice-framework/chat)
[![npm](https://img.shields.io/npm/dt/@microservice-framework/microservice-client.svg?style=flat-square)](https://www.npmjs.com/~microservice-framework)
[![microservice-frame.work](https://img.shields.io/badge/online%20docs-200-green.svg?style=flat-square)](http://microservice-frame.work)

Microservice framework client.

On webBrowser level is possible to use AJAX and WebSocket. 
See examples [here](https://github.com/microservice-framework/microservice-client/tree/master/examples).

```html
    <script src="http://microservice-frame.work/js/microservice-client.min.js"></script>
    <script>
$(function() {    
    var clientSettings = {
      URL: "wss://apiserver.com/ws_endpoint/",
      token: 'secureKey or AccessToken'
    }
    ws = new MicroserviceWebSocket(clientSettings);
    ws.on('message', function(object){
      console.log(object);
    });
});
    </script>
```

```html
    <script src="http://microservice-frame.work/js/microservice-client.min.js"></script>
    <script>
$(function() {    
    var clientSettings = {
      URL: "https://apiserver.com/service",
      secureKey: 'ServiceSecureKey'
    }
    client = new MicroserviceClient(clientSettings);
    client.search({}, function(err, handlerResponse){
      if(err){
        return $('#result').html(err);
      }
      $('#result').html(JSON.stringify(handlerResponse, null, 2));
    });
});

$(function() {    
    var clientSettings = {
      URL: "https://apiserver.com",
      secureKey: 'ServiceSecureKey'
    }
    client = new MicroserviceClient(clientSettings);
    client.search('endpoint', {}, function(err, handlerResponse){
      if(err){
        return $('#result').html(err);
      }
      $('#result').html(JSON.stringify(handlerResponse, null, 2));
    });
});
    </script>
```


Nodejs:

```js
'use strict';

const MicroserviceClient = require('@microservice-framework/microservice-client');

require('dotenv').config();

var client = new MicroserviceClient({
  URL: "http://localhost:" + process.env.PORT,
  secureKey: process.env.SECURE_KEY
});

var RecordID;
var RecordToken;

client.post({
    name: "Microservice",
    data: {
      value: test
    }
  }, function(err, handlerResponse){
    console.log(handlerResponse);
    RecordID = handlerResponse.id;
    RecordToken = handlerResponse.token;
    
    client.search({
      name: "Microservice"
      }, function(err, handlerResponse){
        console.log(handlerResponse);
    });
    
    client.get(RecordID, RecordToken, function(err, handlerResponse){
      console.log(handlerResponse);
    });
    
    client.put(RecordID, RecordToken, {
      extra: {
        extravalue: "test2"
      }
    }, function(err, handlerResponse){
      console.log(handlerResponse);
    });
    
    client.delete(RecordID, RecordToken, function(err, handlerResponse){
      console.log(handlerResponse);
    });
});

```

## Changelog
- 1.2.5
  - added nodejs package name to UserAgent
  - fixed URL variable
  - added support for API based requests
