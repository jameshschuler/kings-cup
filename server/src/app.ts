import express from 'express';
import http from 'http';
import socketio from 'socket.io';
import { JoinRoomRequest } from './models/request/JoinRoomRequest';
import { StartGameRequest } from './models/request/StartGameRequest';
import { Room } from './models/Room';
import { User } from './models/User';

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer( app );
const io = socketio( server );

let users = new Array<User>();
const rooms = new Array<Room>();

const init = () => {
  rooms.push( new Room( 'test' ) );
};

const endTurn = ( socket: socketio.Socket ) => {
  console.log( "end turn" );
  const user = users.find( u => u.id === socket.id );

  if ( !user ) {
    // TODO:
    return;
  }

  const room = rooms.find( r => r.roomCode === user?.roomCode );

  if ( !room ) {
    // TODO:
    return;
  }

  const response = room.endTurn();
  io.to( room.roomCode ).emit( 'turn-ended', response );
}

const drawCard = ( socket: socketio.Socket ) => {
  const user = users.find( u => u.id === socket.id );

  if ( !user ) {
    // TODO:
    return;
  }

  const room = rooms.find( r => r.roomCode === user?.roomCode );

  if ( !room ) {
    // TODO:
    return;
  }

  const response = room.drawCard( user.id );

  io.to( room.roomCode ).emit( 'card-drawn', response );
}

io.on( 'connection', ( socket: socketio.Socket ) => {
  console.log( 'user connected' );

  /**
   * Draw Card
   */
  socket.on( 'draw-card', () => drawCard( socket ) );

  /**
   * End Turn
   */
  socket.on( 'end-turn', () => endTurn( socket ) );

  /**
   * Start Game
   */
  socket.on( 'start-game', ( request: StartGameRequest ) => {
    // TODO: validate that requestor socket is in given room
    const storedRoom = rooms.find( r => r.roomCode === request.roomCode );

    if ( !storedRoom ) {
      // TODO: handle invalid room
    }

    const startedGameResponse = storedRoom!.startGame();

    io.to( request.roomCode ).emit( 'game-started', startedGameResponse );
  } )

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

  socket.on( 'disconnect', ( roomCode: string ) => {
    const storedUser = users.find( u => u.id === socket.id );

    if ( storedUser ) {
      users = users.filter( u => u.id !== storedUser.id );
      const room = rooms.find( r => r.roomCode === storedUser.roomCode );

      if ( room ) {
        room.removeUser( storedUser.id );

        io.to( storedUser.roomCode ).emit( 'room-updated', room.users );
      }
    }
  } )
} );

server.listen( PORT, () => {
  init();
  console.log( `Server started on port: ${PORT}` );
} );
