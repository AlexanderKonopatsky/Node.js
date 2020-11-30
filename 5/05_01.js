const http = require("http");
const url = require("url");
const fs = require("fs");
const DB = require("./DB");

let db = new DB();

db.on('GET', (request, response) => {
    response.end(JSON.stringify(db.getAllRows()));
});

db.on('POST', (request, response) => {
    request.on('data', data => {
        let row = JSON.parse(data);
        row.id = db.lastIndex() + 1;
        db.addRow(row);
        response.end(JSON.stringify(row));
    });
});

db.on('PUT', (request) => {
    request.on('data', data => {
        let row = JSON.parse(data);
        db.editRow(row.id, row)
    });
});

db.on('DELETE', (request, response) => {
    if (typeof url.parse(request.url, true).query.id != 'undefined') {
        let id = parseInt(url.parse(request.url, true).query.id);
        if (Number.isInteger(id)) {
            let deletedRow = db.deleteRow(id);

            response.writeHead(200, {'Content-Type' : 'application/json'});
            response.end(JSON.stringify(deletedRow));
        }
    }
});

db.on('COMMIT', () => {
    db.commit();
    
    commitCounter += 1;
} );

let statStartTime = null;
let statFinishTime = null;
let requestCounter = 0;
let commitCounter = 0;

function printStat() {
    console.log('statistic start time: ' + statStartTime);
    console.log('statistic finish time: ' + statFinishTime);
    console.log('count of requests: ' + requestCounter);
    console.log('count of commits: ' + commitCounter);
}

function getJsonStat() {
    let jsonStat = JSON.stringify({
        stat_start_time : statStartTime,
        stat_finish_time : statFinishTime,
        request_count : requestCounter,
        commit_count : commitCounter
    })

    return jsonStat;
}



let sdTimerId = null;
let scTimerId = null;
let ssTimerId = null;

process.stdin.setEncoding('utf-8');
process.stdin.on('readable', () => {
    let chunk = null;
    while((chunk = process.stdin.read()) != null){
        chunk = chunk.trim();
        const array = chunk.split(' ');
        if (array.length == 2){
            const num = parseInt(array[1]);

            if(!Number.isInteger(num)){
                console.error('Invalid command parametr.');
                continue;
            }
                switch (array[0]){
                    case 'sd':
                        if (sdTimerId != null) {
                            clearTimeout(sdTimerId);
                            sdTimerId = null;
                        }
    
                        //sdTimerId = setTimeout(closeServer, num);
                        sdTimerId = setTimeout(process.exit, num);
    
                        break;
                    case 'sc':
                            if (scTimerId != null) {
                                clearInterval(scTimerId);
                                scTimerId = null;
                            }
        
                            scTimerId = setInterval( () => {
                                db.emit('COMMIT')
                            }, num);
                            scTimerId.unref();
                        break;
                    case 'ss':
                        if (ssTimerId != null) {
                            clearInterval(ssTimerId);
                            ssTimerId = null;
                        }
    
                        console.log('Statistics collection started.');
                        ssTimerId = setTimeout( () => {
                            statFinishTime = Date.now();
    
                            console.log('Statistics collection finished.');
                            printStat();
                        }, num);
                        statStartTime = Date.now(); 
                        ssTimerId.unref();
                        break;
                    default : 
                        console.log('Invalid command.');
                        break;

                }
        }
        else if (array.length == 1) {
            switch (array[0]) {
                case 'sd' :
                    clearTimeout(sdTimerId);
                    sdTimerId = null;
                    break;
                case 'sc' :
                    clearTimeout(scTimerId);
                    sdTimerId = null;
                    break;
                case 'ss' :
                    clearTimeout(ssTimerId);
                    sdTimerId = null;

                    console.log('Statistics collection finished.');
                    printStat();
                    break;
                default:
                        console.error('Invalid command. Try again:');
                        break;
            } 
        }
    }
});

http.createServer((request, response) => {
    if (request.url === '/') {
        let html = fs.readFileSync('./05_02.html');
        response.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
        response.end(html);
    } else if (url.parse(request.url).pathname === '/api/db') {
        db.emit(request.method, request, response); 
    } else if (request.url === '/api/ss') {
        response.writeHead(200, {'Content-Type':'application/json'});
        response.end(getJsonStat());
    }
}).listen(5000)