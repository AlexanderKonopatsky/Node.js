var http = require('http');
var url = require('url');

var server = http.createServer((req, res) => {
    var path = url.parse(req.url).pathname;
    path = path.substr(1);
    if (req.url === "/image") {
      res.statusCode = 200;
      res.setHeader("Content-Type", "image/jpeg");
      var image = "image";
      require("fs").readFile("./"+path+".jpg", (err, image) => {
        res.end(image);
      });
    }
  }).listen(5000);