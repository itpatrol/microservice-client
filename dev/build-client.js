var fs = require("fs")
var browserify = require('browserify')

browserify('./browser.js')
  .bundle()
  .pipe(fs.createWriteStream("./dist/microservice-client.js"))
