/* var http = require('http');
var fs = require('fs');

http.createServer(function (require, response)
{
  let html = fs.readFile('..2/xmlhttprequest.html ');
  response.writeHead(200, {'Content-Type':'text/plain; charset=utf-8'});
  response.end(html);
}).listen(5000);

console.log('Server running at http://localhost:5000/'); */

var http = require('http');
var url = require('url');
var fs = require('fs')

var server = http.createServer(function(request, response){
    var path = url.parse(request.url).pathname;
    path = path.substr(1) + '.html';
    fs.readFile(path, function(err, data){
        if(err){
            console.log(err);
            response.writeHead(404, {'Content-Type' : 'text/plain'});
            response.end('Not found!');
        }
        else {
            response.writeHead(200, {'Content-Type' : 'text/html'});
            response.write(data.toString());
            console.log('Data was sent');
            response.end();
        }
    })
}).listen(5000, function(){
    console.log('Server running');
})