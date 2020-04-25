import React, { createContext, useReducer } from 'react';
import io from 'socket.io-client';
import { ActionType } from '../models/constants/ActionType';
import { GlobalState } from '../models/GlobalState';
import { JoinedRoomResponse } from '../models/response/JoinedRoomResponse';
import { RoomUpdatedResponse } from '../models/response/RoomUpdatedResponse';
import { StartedGameResponse } from '../models/response/StartedGameResponse';
import AppReducer from './AppReducer';

const initialState: GlobalState = {
  connected: false,
  currentTurn: null,
  isStarted: false,
  joining: false,
  loading: true,
  me: null,
  players: [],
  socket: null,

  // Actions
  canStartGame: () => false,
  isMyTurn: () => { },
  joinRoom: ( name: string, roomCode: string ) => { },
  makeConnection: () => { },
  startGame: () => { }
};

export const GlobalContext = createContext( initialState );

interface GlobalProviderProps {
  children: any;
}

// Provider component
export const GlobalProvider: React.FC<GlobalProviderProps> = ( { children } ) => {
  const [ { connected, currentTurn, isStarted, joining, loading, me, players, socket }, dispatch ] = useReducer(
    AppReducer,
    initialState
  );

  const canStartGame = (): boolean => {
    if ( players.length >= 2 && me && !isStarted ) {
      return true;
    }

    return false;
  }

  const isMyTurn = (): boolean => {
    if ( me && currentTurn ) {
      return me.name === currentTurn.name;
    }

    return false;
  }

  // Actions:
  const joinRoom = ( name: string, roomCode: string ) => {
    socket?.emit( 'join-room', { name, roomCode } );

    dispatch( { type: ActionType.JOINING, payload: { joining: true } } );
  };

  const makeConnection = (): void => {
    const socket = io( 'http://localhost:5000' );

    // Register Events
    if ( socket ) {

      // Game Started
      socket.on( 'game-started', ( response: StartedGameResponse ) => {
        console.log( "game-started", response );

        dispatch( {
          type: ActionType.GAME_STARTED,
          payload: {
            currentTurn: response.currentTurn,
            isStarted: response.isStarted,
          }
        } );
      } );

      // Room Updated
      socket.on( 'room-updated', ( response: RoomUpdatedResponse ) => {
        console.log( 'room-updated response', response );
        dispatch( {
          type: ActionType.ROOM_UPDATED,
          payload: {
            players: response
          }
        } )
      } );

      // Joined Room
      socket.on( 'joined-room', ( response: JoinedRoomResponse ) => {
        console.log( 'joined-room response', response );

        dispatch( {
          type: ActionType.JOINED_ROOM,
          payload: {
            joining: false,
            response
          }
        } );
      } );
    }

    dispatch( {
      type: ActionType.CONNECTED,
      payload: {
        socket,
        connected: socket !== null,
        loading: false,
      },
    } );
  };

  const startGame = () => {
    socket?.emit( 'start-game', { name: me?.name, roomCode: me?.roomCode } );
  }

  return (
    <GlobalContext.Provider
      value={{
        connected, currentTurn, isStarted, joining, loading, me, players, socket,
        canStartGame, isMyTurn, joinRoom, makeConnection, startGame
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
