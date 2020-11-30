let http = require('http');
//let stat = require('./m07_01');/* ('./static'); */


//function stat(sfn = './static') {
    //this.STATIC_FOLDER = sfn;
    //let pathStatic = (fn) => { return `${this.STATIC_FOLDER}${fn}`; }
    let fs = require('fs');

    writeHTTP404 = (res) => {
        res.statusCode = 404;
        res.statusMessage = 'Resourse not found';
        res.end("HTTP ERROR 404: Resourse not found");
    }

    let pipeFile = (req, res, headers) => {
        res.writeHead(200, headers);
        fs.createReadStream(pathStatic(req.url).pipe(res));
    }

    isStatic = (ext, fn) => {
        let reg = new ReqExp(`^\/.+\.${ext}$`); 
        return reg.test(fn);
    }

    sendFile = (req, res, headers) => {
        fs.access(pathStatic(req.url), fs.constants.R_OK, err => {
            if(err) this.writeHTTP404(res);
            else pipeFile(req, res, headers);
        });
    }
//}

let http_handler = (req, res) => {
    if(req.method == 'GET'){
        if(isStatic('html', req.url)) 
            stat.sendFile(req,res, {'Content-Type':'text/html; charset=utf-8'});
       /*  else if(stat.isStatic('css', req.url)) 
            stat.sendFile(req,res, {'Content-Type':'text/css; charset=utf-8'});
        else if(stat.isStatic('js', req.url)) 
            stat.sendFile(req,res, {'Content-Type':'text/javascript; charset=utf-8'});
        else if(stat.isStatic('png', req.url)) 
            stat.sendFile(req,res, {'Content-Type':'image/png; charset=utf-8'});
        else if(stat.isStatic('docx', req.url)) 
            stat.sendFile(req,res, {'Content-Type':'application/msword; charset=utf-8'});
        else if(stat.isStatic('json', req.url)) 
            stat.sendFile(req,res, {'Content-Type':'application/json; charset=utf-8'});
        else if(stat.isStatic('xml', req.url)) 
            stat.sendFile(req,res, {'Content-Type':'application/xml; charset=utf-8'});
        else if(stat.isStatic('mp4', req.url)) 
            stat.sendFile(req,res, {'Content-Type':'video/mp4; charset=utf-8'});
        else stat.writeHTTP404(res);*/
    } 
    else {
        res.statusCode = 405;
        res.statusMessage = 'Invalid method';
        res.end("HTTP ERROR 405: Invalid method");
    }
}

let server = http.createServer();
server.listen(5000).on('request', http_handler);

