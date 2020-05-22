import React, { createContext, useReducer } from 'react';
import io from 'socket.io-client';
import { CardImage } from '../models/CardImage';
import { ActionType } from '../models/constants/ActionType';
import { GlobalState } from '../models/GlobalState';
import { DrawnCardResponse } from '../models/response/DrawnCardResponse';
import { EndTurnResponse } from '../models/response/EndTurnResponse';
import { JoinedRoomResponse } from '../models/response/JoinedRoomResponse';
import { RoomUpdatedResponse } from '../models/response/RoomUpdatedResponse';
import { StartedGameResponse } from '../models/response/StartedGameResponse';
import AppReducer from './AppReducer';

const initialState: GlobalState = {
  cardImage: null,
  cardImages: new Array<CardImage>(),
  connected: false,
  currentTurn: null,
  drawingCard: false,
  drawnCard: null,
  isGameOver: false,
  isStarted: false,
  joining: false,
  kingCount: 0,
  loading: true,
  me: null,
  message: 'Loading...',
  players: [],
  socket: null,

  /// Functions (actions and helpers)
  canStartGame: Function,
  displayCard: ( canvas: HTMLCanvasElement ) => { },
  drawCard: Function,
  endTurn: Function,
  isMyTurn: Function,
  joinRoom: ( name: string, roomCode: string ) => { },
  makeConnection: Function,
  startGame: Function,
  setCardImages: ( image: CanvasImageSource, cardImages: CardImage[] ) => { },
};

export const GlobalContext = createContext( initialState );

interface GlobalProviderProps {
  children: any;
}

// Provider component
export const GlobalProvider: React.FC<GlobalProviderProps> = ( { children } ) => {
  const [
    {
      cardImage,
      cardImages,
      connected,
      currentTurn,
      drawingCard,
      drawnCard,
      isGameOver,
      isStarted,
      joining,
      kingCount,
      loading,
      me,
      message,
      players,
      socket,
    },
    dispatch,
  ] = useReducer( AppReducer, initialState );

  // TODO: move helpers
  // Helpers
  const canStartGame = (): boolean => {
    if ( players.length >= 2 && me && !isStarted ) {
      return true;
    }

    return false;
  };

  const isMyTurn = (): boolean => {
    if ( me && currentTurn ) {
      return me.name === currentTurn.name;
    }

    return false;
  };

  const displayCard = ( canvas: HTMLCanvasElement ) => {
    if ( drawnCard ) {
      const cardToDraw = cardImages.find(
        ( c ) =>
          c.suit.toLowerCase() === drawnCard!.suit.toLowerCase() &&
          c.value.toLowerCase() === drawnCard!.value.toLowerCase()
      );

      if ( cardToDraw ) {
        const context = canvas.getContext( '2d' );
        context?.drawImage(
          cardImage!,
          cardToDraw.x,
          cardToDraw.y,
          cardToDraw.width,
          cardToDraw.height,
          0,
          0,
          canvas.width,
          canvas.height
        );
      }
    }
  };

  // Actions:
  const drawCard = () => {
    socket?.emit( 'draw-card' );

    dispatch( {
      type: ActionType.DRAWING_CARD,
      payload: {
        drawingCard: true,
      },
    } );
  };

  const endTurn = () => {
    socket?.emit( 'end-turn' );
  };

  const joinRoom = ( name: string, roomCode: string ) => {
    socket?.emit( 'join-room', { name, roomCode } );

    dispatch( { type: ActionType.JOINING, payload: { joining: true } } );
  };

  const makeConnection = (): void => {
    const socket = io( 'http://localhost:5000', { reconnectionAttempts: 5 } );

    socket.on( 'connect', () => {
      dispatch( {
        type: ActionType.CONNECTED,
        payload: {
          socket,
          connected: socket !== null,
          loading: false,
        },
      } );
    } );

    socket.on( 'connect_error', ( error: any ) => {
      // TODO: show message that client was unable to connect but is trying again
      console.log( 'Unable to connect. Trying again...', { ...error } );
    } );

    socket.on( 'reconnect_failed', () => {
      dispatch( {
        type: ActionType.CONNECTION_FAILED,
        payload: {
          message: 'Failed to connect. Try again later!'
        }
      } );
    } );

    // Register Events
    if ( socket ) {
      // Card drawn
      socket.on( 'card-drawn', ( response: DrawnCardResponse ) => {
        dispatch( {
          type: ActionType.CARD_DRAWN,
          payload: {
            drawnCard: response,
            kingCount: response.kingCount,
            isGameOver: response.isGameOver
          },
        } );
      } );

      // Game Started
      socket.on( 'game-started', ( response: StartedGameResponse ) => {
        dispatch( {
          type: ActionType.GAME_STARTED,
          payload: {
            currentTurn: response.currentTurn,
            isStarted: response.isStarted,
          },
        } );
      } );

      // Room Updated
      socket.on( 'room-updated', ( response: RoomUpdatedResponse ) => {
        dispatch( {
          type: ActionType.ROOM_UPDATED,
          payload: {
            players: response,
          },
        } );
      } );

      // Joined Room
      socket.on( 'joined-room', ( response: JoinedRoomResponse ) => {
        dispatch( {
          type: ActionType.JOINED_ROOM,
          payload: {
            joining: false,
            response,
          },
        } );
      } );

      socket.on( 'turn-ended', ( response: EndTurnResponse ) => {
        dispatch( {
          type: ActionType.TURN_ENDED,
          payload: {
            currentTurn: response.currentTurn,
            drawnCard: null,
          },
        } );
      } );
    }
  };

  const setCardImages = (
    image: CanvasImageSource,
    cardImages: CardImage[]
  ): void => {
    console.log( cardImages );

    dispatch( {
      type: ActionType.SET_CARD_IMAGES,
      payload: {
        cardImage: image,
        cardImages,
      },
    } );
  };

  const startGame = () => {
    socket?.emit( 'start-game', { name: me?.name, roomCode: me?.roomCode } );
  };

  return (
    <GlobalContext.Provider
      value={{
        cardImage,
        cardImages,
        connected,
        currentTurn,
        drawingCard,
        drawnCard,
        isGameOver,
        isStarted,
        joining,
        kingCount,
        loading,
        me,
        message,
        players,
        socket,
        // Functions (actions and helpers)
        canStartGame,
        drawCard,
        displayCard,
        endTurn,
        isMyTurn,
        joinRoom,
        makeConnection,
        startGame,
        setCardImages,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
