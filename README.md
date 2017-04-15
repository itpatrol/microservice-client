# microservice-client

Microservice framework client.

Simple example:

```
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
