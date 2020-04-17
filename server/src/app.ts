import express from 'express';
import http from 'http';
import socketio from 'socket.io';
import { JoinRoomRequest } from './models/request/JoinRoomRequest';
import { Room } from './models/Room';
import { User } from './models/User';

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// TODO: needs to be a dictionary
const users = new Array<User>();
const rooms = new Array<Room>();

const init = () => {
	rooms.push(new Room('testroom'));
};

io.on('connection', (socket: socketio.Socket) => {
	console.log('user connected');

	socket.on('join-room', (request: JoinRoomRequest) => {
		console.log('hello', request);

		if (!request) {
			// TODO: handle request being null
		}

		// TODO:
		// add user to user list
		// add user to room
		// socketio - add user to room
		// send updated room user list to all users in the room
	});
});

server.listen(PORT, () => {
	init();
	console.log(`Server started on port: ${PORT}`);
});
