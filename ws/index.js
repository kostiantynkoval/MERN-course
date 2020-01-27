const Wss = require('ws')
const http = require('http')

function createWs (app) {
    const server = http.createServer(app)
    global.wss = new Wss.Server({ server });

    wss.on('connection', wsListener => {
        console.log('Connection established!!!!!!!!!!!')
        //connection is up, let's add a simple simple event
        global.wssClient = wsListener
        wsListener.on('message', (message) => {
            //log the received message and send it back to the client
            console.log('received: %s', message)
            wsListener.send(`Hello, you sent -> ${message}`);
        });
        //send immediatly a feedback to the incoming connection
        wsListener.emit('erver_connected', 'Hi me is stupid');
    });

    server.listen(8999, () => {
        console.log(`Server started on port ${server.address().port} :)`);
    });
}

module.exports = createWs

