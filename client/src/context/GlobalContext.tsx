import React, { createContext, useReducer } from 'react';
import io from 'socket.io-client';
import { CardImage } from '../models/CardImage';
import { ActionType } from '../models/constants/ActionType';
import { GlobalState } from '../models/GlobalState';
import { DrawnCardResponse } from '../models/response/DrawnCardResponse';
import { JoinedRoomResponse } from '../models/response/JoinedRoomResponse';
import { RoomUpdatedResponse } from '../models/response/RoomUpdatedResponse';
import { StartedGameResponse } from '../models/response/StartedGameResponse';
import AppReducer from './AppReducer';

const initialState: GlobalState = {
  cardImages: new Array<CardImage>(),
  connected: false,
  currentTurn: null,
  drawingCard: false,
  drawnCard: null,
  isStarted: false,
  joining: false,
  loading: true,
  me: null,
  players: [],
  socket: null,

  // Actions
  canStartGame: () => false,
  drawCard: () => { },
  isMyTurn: () => { },
  joinRoom: ( name: string, roomCode: string ) => { },
  makeConnection: () => { },
  startGame: () => { },
  setCardImages: ( cardImages: CardImage[] ) => { }
};

export const GlobalContext = createContext( initialState );

interface GlobalProviderProps {
  children: any;
}

// Provider component
export const GlobalProvider: React.FC<GlobalProviderProps> = ( { children } ) => {
  const [ { cardImages, connected, currentTurn, drawingCard, drawnCard, isStarted, joining, loading, me, players, socket }, dispatch ] = useReducer(
    AppReducer,
    initialState
  );

  // TODO: move helpers
  // Helpers
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
  const drawCard = () => {
    socket?.emit( 'draw-card' );

    dispatch( {
      type: ActionType.DRAWING_CARD,
      payload: {
        drawingCard: true
      }
    } );
  }

  const joinRoom = ( name: string, roomCode: string ) => {
    socket?.emit( 'join-room', { name, roomCode } );

    dispatch( { type: ActionType.JOINING, payload: { joining: true } } );
  };

  const makeConnection = (): void => {
    const socket = io( 'http://localhost:5000' );

    // Register Events
    if ( socket ) {

      // Card drawn
      socket.on( 'card-drawn', ( response: DrawnCardResponse ) => {
        console.log( 'response', response );

        dispatch( {
          type: ActionType.CARD_DRAWN,
          payload: {
            drawnCard: response
          }
        } );
      } )

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

  const setCardImages = ( cardImages: CardImage[] ): void => {
    console.log( cardImages );

    dispatch( {
      type: ActionType.SET_CARD_IMAGES,
      payload: {
        cardImages
      }
    } )
  }

  const startGame = () => {
    socket?.emit( 'start-game', { name: me?.name, roomCode: me?.roomCode } );
  }

  return (
    <GlobalContext.Provider
      value={{
        cardImages, connected, currentTurn, drawingCard, drawnCard, isStarted, joining, loading, me, players, socket,
        canStartGame, drawCard, isMyTurn, joinRoom, makeConnection, startGame, setCardImages
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
