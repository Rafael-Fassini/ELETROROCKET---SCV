const WebSocket = require('ws');


function onError(ws, err) {
    console.error(`onError: ${err.message}`);
}

function onMessage(ws, data) {
    console.log(`onMessage: ${data}`);
    ws.send('recebido!');
}

let wss;

function onConnection(ws, req) {
    ws.on('message', data => onMessage(ws, data));
    ws.on('error', error => onError(ws, error));

    console.log('onConnection');

    if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ message: 'Conexão estabelecida' }));
    }
}

module.exports = (server) => {
    wss = new WebSocket.Server({ server });
    wss.on('connection', onConnection);
    console.log('App Web Socket Server is running!');
    return wss;
}
