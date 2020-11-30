var http = require('http');
var utils = require('util');

var server = http.createServer(function(request, response){
    
    response.write('<h1>Hello World</h1>. ');

    var requestInfo = utils.format('HTTPVersion: %s \nMethod: %s \nStatus code: %s \nMessage: %s \nURL: %s',        
    request.httpVersion,
    request.method,
    request.statusCode,
    request.statusMessage,
    request.url);
    response.write(requestInfo);

    response.end();
}).listen(8080, function(){
    console.log('Server running  on poty 8080');
})

//http://localhost:8080/?value=test&value1=test