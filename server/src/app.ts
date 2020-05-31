import express from 'express';
import http from 'http';
import socketio from 'socket.io';
import { EventType } from './models/enums/EventType';
import { JoinRoomRequest } from './models/request/JoinRoomRequest';
import { StartGameRequest } from './models/request/StartGameRequest';
import { EventResponse } from './models/response/EventResponse';
import { Room } from './models/Room';
import { User } from './models/User';

/**
 * 
 */
export class App {
  private _app: any;
  private _port: number;
  private _server: any;
  private _io: socketio.Server;
  private _users = new Array<User>();
  private _rooms = new Array<Room>();

  constructor( port: string ) {
    this._port = parseInt( port ) || 5000;

    this._app = express();
    this._server = http.createServer( this._app );
    this._io = socketio( this._server );

    this._server.listen( this._port, () => {
      this.init();
      this.registerEvents();
      console.log( `Server listening on port: ${this._port}` );
    } );
  }

  /**
   * 
   * @param socket 
   */
  private disconnect( socket: socketio.Socket ) {
    const storedUser = this.getUserById( socket.id );

    if ( storedUser ) {
      this._users = this._users.filter( u => u.id !== storedUser.id );
      const room = this.getRoom( storedUser.roomCode );

      if ( room ) {
        room.removeUser( storedUser.id );

        this._io.to( storedUser.roomCode ).emit( 'room-updated', room.users );
        this._io.to( storedUser.roomCode ).emit( 'event', {
          message: `${storedUser.name} has left the room!`,
          eventType: EventType.Disconnect
        } as EventResponse );
      }
    }
  }

  /**
   * 
   * @param socket 
   */
  private drawCard( socket: socketio.Socket ) {
    const user = this.getUserById( socket.id );

    if ( !user ) {
      // TODO: the user might have left?
      return;
    }

    const room = this.getRoom( user?.roomCode );

    if ( !room ) {
      // TODO:
      return;
    }

    const response = room.drawCard( user.id );

    this._io.to( room.roomCode ).emit( 'card-drawn', response );

    const convertValue = ( value: string | undefined ): string | null => {
      switch ( value ) {
        case '12':
          return 'King';
        default:
          return null;
      }
    }

    this._io.to( user.roomCode ).emit( 'event', {
      message: `${user.name} has drawn the ${convertValue( response?.value )} of ${response?.suit}!`,
      eventType: EventType.DrawCard
    } as EventResponse );
  }

  /**
   * 
   * @param socket 
   */
  private endTurn( socket: socketio.Socket ): void {
    const user = this.getUserById( socket.id );

    if ( !user ) {
      // TODO:
      return;
    }

    const room = this.getRoom( user.roomCode );

    if ( !room ) {
      // TODO:
      return;
    }

    const response = room.endTurn();
    this._io.to( room.roomCode ).emit( 'turn-ended', response );
  }

  private getRoom( roomCode: string ): Room | null {
    return this._rooms.find( r => r.roomCode === roomCode ) || null;
  }

  private getUserById( id: string ): User | null {
    return this._users.find( u => u.id === id ) || null;
  }

  // TODO: this is temporary for testing
  private init(): void {
    this._rooms.push( new Room( 'test' ) );
  }

  /**
   * 
   * @param request 
   * @param socket 
   */
  private joinRoom( request: JoinRoomRequest, socket: SocketIO.Socket ) {
    if ( !request ) {
      // TODO: handle request being null
    }

    let storedRoom = this.getRoom( request.roomCode );

    if ( !storedRoom ) {
      storedRoom = new Room( request.roomCode );
      this._rooms.push( storedRoom );
    }

    const user = storedRoom.addUser( socket.id, request.name.trim() );

    this._users.push( user );

    socket.join( request.roomCode );

    socket.emit( 'joined-room', { name: user.name, roomCode: user.roomCode } );
    this._io.to( request.roomCode ).emit( 'room-updated', storedRoom.users );
    this._io.to( request.roomCode ).emit( 'event', {
      message: `${user.name} has joined the room!`,
      eventType: EventType.Join
    } as EventResponse );
  }

  /**
   * 
   */
  private registerEvents(): void {
    this._io.on( 'connection', ( socket: socketio.Socket ) => {

      socket.on( 'draw-card', () => this.drawCard( socket ) );
      socket.on( 'end-turn', () => this.endTurn( socket ) );
      socket.on( 'start-game', ( request: StartGameRequest ) => this.startGame( request ) );
      socket.on( 'join-room', ( request: JoinRoomRequest ) => this.joinRoom( request, socket ) );
      socket.on( 'disconnect', ( roomCode: string ) => this.disconnect( socket ) );
    } );
  }

  /**
   * 
   * @param request 
   */
  private startGame( request: StartGameRequest ): void {
    // TODO: validate that requestor socket is in given room
    const storedRoom = this.getRoom( request.roomCode );

    if ( !storedRoom ) {
      // TODO: handle invalid room
    }

    const startedGameResponse = storedRoom!.startGame();

    this._io.to( request.roomCode ).emit( 'game-started', startedGameResponse );
    this._io.to( request.roomCode ).emit( 'event', {
      message: `${request.name} has started the game!`,
      eventType: EventType.StartGame
    } as EventResponse );
  }
}