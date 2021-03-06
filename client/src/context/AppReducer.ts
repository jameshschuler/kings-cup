import { Action } from '../models/Action';
import { ActionType } from '../models/enums/ActionType';
import { GlobalState } from '../models/GlobalState';

export default ( state: GlobalState, action: Action ): GlobalState => {
  switch ( action.type ) {
    case ActionType.CARD_DRAWN:
      return {
        ...state,
        drawingCard: false,
        drawnCard: action.payload.drawnCard,
        kingCount: action.payload.kingCount,
        isGameOver: action.payload.isGameOver
      }
    case ActionType.CONNECTED:
      return {
        ...state,
        connected: action.payload.connected,
        loading: action.payload.loading,
        socket: action.payload.socket,
      };
    case ActionType.CONNECTION_FAILED:
      return {
        ...state,
        message: action.payload.message
      }
    case ActionType.DRAWING_CARD:
      return {
        ...state,
        drawingCard: action.payload.drawingCard
      }
    case ActionType.EVENT:
      return {
        ...state,
        eventMessages: [ ...state.eventMessages, action.payload.eventResponse ]
      }
    case ActionType.GAME_STARTED:
      return {
        ...state,
        currentTurn: action.payload.currentTurn,
        isStarted: action.payload.isStarted
      }
    case ActionType.JOINING:
      return {
        ...state,
        joining: action.payload.joining,
      };
    case ActionType.JOINED_ROOM:
      return {
        ...state,
        joining: action.payload.joining,
        me: action.payload.response,
        rules: action.payload.response.rules
      }
    case ActionType.ROOM_UPDATED:
      return {
        ...state,
        players: action.payload.players
      }
    case ActionType.SET_CARD_IMAGES:
      return {
        ...state,
        cardImage: action.payload.cardImage,
        cardImages: action.payload.cardImages
      }
    case ActionType.TURN_ENDED:
      return {
        ...state,
        drawnCard: action.payload.drawnCard,
        currentTurn: action.payload.currentTurn
      }
    default:
      return state;
  }
};
