var http = require('http');
var url = require('url');
var fs = require('fs')


var server = http.createServer((req, res) => {
    var path = url.parse(req.url).pathname;
    if (req.url === "/") {
        res.writeHead(404, {'Content-Type' : 'text/plain'});
        res.end('Not found!');
      }
    if (req.url === "/api/name") {
      res.writeHead(200, {'Content-Type' : 'text/plain'});
      var info = "Konopatsky Alexander Alexandrovich";
      res.end(info);
    }

    else if (req.url === "/xmlhttprequest.html" ){

      fs.readFile(path, function(err, data){
        if(err){
            console.log(err);
            res.writeHead(404, {'Content-Type' : 'text/plain'});
            res.end('Not found!');
        }
        else {
            res.writeHead(200, {'Content-Type' : 'text/html'});
            res.write(data.toString());
            console.log('Data was sent');
            res.end();
        }
    })

    }

    else if (req.url === "/fetch.html"){

      fs.readFile(path, function(err, data){
        if(err){
            console.log(err);
            res.writeHead(404, {'Content-Type' : 'text/plain'});
            res.end('Not found!');
        }
        else {
            res.writeHead(200, {'Content-Type' : 'text/html'});
            res.write(data.toString());
            console.log('Data was sent');
            res.end();
        }
      })
    }
    
    else if (req.url === "/jquery.html"){

      fs.readFile(path, function(err, data){
        if(err){
            console.log(err);
            res.writeHead(404, {'Content-Type' : 'text/plain'});
            res.end('Not found!');
        }
        else {
            res.writeHead(200, {'Content-Type' : 'text/html'});
            res.write(data.toString());
            console.log('Data was sent');
            res.end();
        }
      })
    }

  }).listen(5000); 
