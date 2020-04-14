import express from 'express';
import http from 'http';
import socketio from 'socket.io';

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket: socketio.Socket) => {
	console.log('user connected');
});

server.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
