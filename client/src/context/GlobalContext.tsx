import React, { createContext, useReducer } from 'react';
import io from 'socket.io-client';
import { ActionType } from '../models/constants/ActionType';
import { GlobalState } from '../models/GlobalState';
import { JoinedRoomResponse } from '../models/response/JoinedRoomResponse';
import { RoomUpdatedResponse } from '../models/response/RoomUpdatedResponse';
import AppReducer from './AppReducer';

const initialState: GlobalState = {
  connected: false,
  joining: false,
  loading: true,
  me: null,
  players: [],
  socket: null,
  joinRoom: ( name: string, roomCode: string ) => { },
  makeConnection: () => { },
};

export const GlobalContext = createContext( initialState );

interface GlobalProviderProps {
  children: any;
}

// Provider component
export const GlobalProvider: React.FC<GlobalProviderProps> = ( { children } ) => {
  const [ { connected, joining, loading, me, players, socket }, dispatch ] = useReducer(
    AppReducer,
    initialState
  );

  // Actions:
  const joinRoom = ( name: string, roomCode: string ) => {
    socket?.emit( 'join-room', { name, roomCode } );

    dispatch( { type: ActionType.JOINING, payload: { joining: true } } );
  };

  const makeConnection = (): void => {
    const socket = io( 'http://localhost:5000' );

    // Register Events
    if ( socket ) {
      socket.on( 'room-updated', ( response: RoomUpdatedResponse ) => {
        console.log( 'room-updated response', response );
        dispatch( {
          type: ActionType.ROOM_UPDATED,
          payload: {
            players: response
          }
        } )
      } );

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

  return (
    <GlobalContext.Provider
      value={{ connected, joining, loading, me, players, socket, joinRoom, makeConnection }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
