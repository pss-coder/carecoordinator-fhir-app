const express = require('express');
const next = require('next');
// const axios = require('axios');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const http = require('http');
const socketIO = require('socket.io');

app.prepare().then(async () => {
    const server = express();
    const httpServer = http.createServer(server);
    const io = socketIO(httpServer);

    io.on('connection', (socket) => {
        console.log('Client connected');

        
        socket.on('receivingAppt', (data) => {
            console.log('Recieved appointment update from API ::', data)
                // emit to clients: clientSendAppt
                io.emit('clientSendAppt', data);
        })

        socket.on('receivingUpdate', (data) => {
            console.log('Recieved patient update from API ::', data)
            // emit: clientSendUpdate
            io.emit('clientSendUpdate', data);
        })

        socket.on('receivingConsent', (data) => {
            console.log('Recieved consent form image from bot ::', data)
            io.emit('clientSendPhoto', data);
        })

        //

    });

    server.all('*', (req, res) => {
        return handle(req, res);
    });

    const PORT = process.env.PORT || 3000;
    httpServer.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
});