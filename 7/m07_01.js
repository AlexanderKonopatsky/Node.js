const fs = require('fs');

let Get_handler = (req, res) =>
{
    switch (req.url)
    {
      case '/':
      {
          console.log('Get Main Page');
          res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});
          res.end(fs.readFileSync(__dirname + '/index.html'));
          break;
      }
      case '/file/f.png':
      {
          console.log('Get PNG');
          res.writeHead(200, {'Content-Type' : 'image/png; charset=utf-8'});
          res.end(fs.readFileSync(__dirname + '/file/f.png'));
          break;
      }
      case '/file/f.docx':
      {
          console.log('Get Word');
          res.writeHead(200, {'Content-Type' : 'application/msword; charset=utf-8'});
          res.end(fs.readFileSync(__dirname + '/file/f.docx'));
          break;
      }
      case '/file/f.css':
      {
          console.log('Get CSS');
          res.writeHead(200, {'Content-Type' : 'text/css; charset=utf-8'});
          res.end(fs.readFileSync(__dirname + '/file/f.css'));
          break;
      }
      case '/file/f.html':
      {
          console.log('Get HTML');
          res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});
          res.end(fs.readFileSync(__dirname + '/file/f.html'));
          break;
      }
      case '/file/f.js':
      {
          console.log('Get JS');
          res.writeHead(200, {'Content-Type' : 'text/javascript; charset=utf-8'});
          res.end(fs.readFileSync(__dirname + '/file/f.js'));
          break;
      }
      case '/file/f.xml':
      {
          console.log('Get XML');
          res.writeHead(200, {'Content-Type' : 'application/xml; charset=utf-8'});
          res.end(fs.readFileSync(__dirname + '/file/f.xml'));
          break;
      }
      case '/file/f.json':
      {
          console.log('Get JSON');
          res.writeHead(200, {'Content-Type' : 'application/json; charset=utf-8'});
          res.end(fs.readFileSync(__dirname + '/file/f.json'));
          break;
      }
      case '/file/f.mp4':
      {
          console.log('Get MP4');
          res.writeHead(200, {'Content-Type' : 'video/mp4; charset=utf-8'});
          res.end(fs.readFileSync(__dirname + '/file/f.mp4'));
          break;
      }
      default: HTTP405(req, res); break;

    } 
}

let HTTP404 = (req, res) => {
    console.log(`${req.method} : ${req.uel}, HTTP status 404 `);
    res.writeHead(404, {'Content-Type' : 'application/json; charset=utf-8'});
    res.end(`"error" : "${req.method}: ${req.url}, HTTP status 404"`);
}

let HTTP405 = (req, res) =>
{
    console.log(`${req.method}: ${req.url}, HTTP status 405`);
    res.writeHead(404, {'Content-Type' : 'application/json; charset=utf-8'});
    res.end(`Error" : "${req.method}: ${req.url}, HTTP status 405"`);
}


exports.Get_handler = Get_handler;
exports.HTTP404 = HTTP404;
exports.HTTP405 = HTTP405;

