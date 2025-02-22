# microservice-client

[![npm](https://img.shields.io/npm/dt/@microservice-framework/microservice-client.svg?style=flat-square)](https://www.npmjs.com/~microservice-framework)
[![microservice-frame.work](https://img.shields.io/badge/online%20docs-200-green.svg?style=flat-square)](http://microservice-frame.work)

Microservice framework client.


See examples [here](https://github.com/microservice-framework/microservice-client/tree/master/examples).


```html
    <script src="http://microservice-frame.work/js/microservice-client.min.js"></script>
    <script>
$(function() {    
    var clientSettings = {
      URL: "https://apiserver.com/service",
      secureKey: 'ServiceSecureKey'
    }
    client = new MicroserviceClient(clientSettings);
    client.search({}).then((response)=>{
      if(response.error){
        return $('#result').html(response.error);
      }
      $('#result').html(JSON.stringify(response, null, 2));
    });
});

$(function() {    
    var clientSettings = {
      URL: "https://apiserver.com",
      secureKey: 'ServiceSecureKey'
    }
    client = new MicroserviceClient(clientSettings);
    client.search('endpoint', {}).then((response)=>{
      if(response.error){
        return $('#result').html(response.error);
      }
      $('#result').html(JSON.stringify(response, null, 2));
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
  }).then( (response) => {
    console.log(response);
    if(response.error) {
      return 
    }
    
    RecordID = response.answer.id;
    RecordToken = response.answer.token;
    
    client.search({ name: "Microservice" }).then( (response) => {
      console.log(response);
      if(response.error) {
        return 
      }
    });

    client.get(RecordID, RecordToken).then( (response) => {
      console.log(response);
      if(response.error) {
        return 
      }
    });
    
    
    client.put(RecordID, RecordToken, {
      extra: {
        extravalue: "test2"
      }
    }).then( (response) => {
      console.log(response);
      if(response.error) {
        return 
      }
    });

    client.delete(RecordID, RecordToken).then( (response) => {
      console.log(response);
      if(response.error) {
        return 
      }
    });
    
});

```

## Changelog
- 3.0.0
  - changed replace callback on Promise

