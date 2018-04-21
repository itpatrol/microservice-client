var fs = require("fs")
var browserify = require('browserify')

browserify('./browser-ws.js')
  .bundle()
  .pipe(fs.createWriteStream("./dist/microservice-websocket.js"))
