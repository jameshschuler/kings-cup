import express from 'express';
import http from 'http';
import socketio from 'socket.io';
import { JoinRoomRequest } from './models/request/JoinRoomRequest';
import { Room } from './models/Room';
import { User } from './models/User';

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer( app );
const io = socketio( server );

const users = new Array<User>();
const rooms = new Array<Room>();

const init = () => {
  rooms.push( new Room( 'testroom' ) );
};

io.on( 'connection', ( socket: socketio.Socket ) => {
  console.log( 'user connected' );

  socket.on( 'join-room', ( request: JoinRoomRequest ) => {
    if ( !request ) {
      // TODO: handle request being null
    }

    let storedRoom = rooms.find( r => r.roomCode === request.roomCode );

    if ( !storedRoom ) {
      storedRoom = new Room( request.roomCode );
      rooms.push( storedRoom );
    }

    const user = storedRoom.addUser( socket.id, request.name.trim() );

    users.push( user );

    socket.join( request.roomCode );

    socket.emit( 'joined-room', { name: user.name, roomCode: user.roomCode } );
    io.to( request.roomCode ).emit( 'room-updated', storedRoom.users );
  } );

  socket.on( 'disconnect', () => {
    /**
     * TODO:
     * remove user from room
     * remove user from users list
     * send room-updated response
     */
  } )
} );

server.listen( PORT, () => {
  init();
  console.log( `Server started on port: ${PORT}` );
} );
