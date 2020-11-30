const WebSocket = require('ws');
const ws = new WebSocket('ws://localhost:5000');
ws.on('open', ()=> {
    ws.on('message', data => {console.log('on message: ', JSON.parse(data));})
    
    let k = 0;
    setInterval(() => {
        ws.send(JSON.stringify({k:++k, sender:'Server', date: new Date().toISOString()}));
    }, 3000);
});