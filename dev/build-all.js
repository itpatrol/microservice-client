var fs = require("fs")
var browserify = require('browserify')

browserify()
  .add('./browser-ws.js')
  .add('./browser.js')
  .bundle()
  .pipe(fs.createWriteStream("./dist/microservice-all.js"))
