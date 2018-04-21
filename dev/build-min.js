var UglifyJS = require("uglify-js");
var fs = require("fs")

var files = [
"microservice-client",
"microservice-all",
"microservice-websocket"
]


for(var name of files) {
  var options = {
    sourceMap: {
      url: name + ".min.js.map"
    }
  };
  var config = {}
  config[name + ".js"] = fs.readFileSync("dist/" + name + ".js", "utf8");
  var result = UglifyJS.minify(config, options);

  if (result.error) {
    console.log(result.error);
    continue;
  }
  fs.writeFileSync("dist/" + name + ".min.js", result.code, "utf8");
  fs.writeFileSync("dist/" + name + ".min.js.map", result.map, "utf8");
}
