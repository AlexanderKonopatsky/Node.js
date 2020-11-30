var http = require('http');
var url = require('url');
var fs = require('fs')

var server = http.createServer(function(request, response){
    var path = url.parse(request.url).pathname;
    path = path.substr(1) + '.html';
    console.log(path);
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