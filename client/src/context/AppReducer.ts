import { Action } from '../models/Action';
import { ActionType } from '../models/constants/ActionType';
import { GlobalState } from '../models/GlobalState';

export default ( state: GlobalState, action: Action ): GlobalState => {
  switch ( action.type ) {
    case ActionType.CONNECTED:
      return {
        ...state,
        connected: action.payload.connected,
        loading: action.payload.loading,
        socket: action.payload.socket,
      };
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
        me: action.payload.response
      }
    case ActionType.ROOM_UPDATED:
      return {
        ...state,
        players: action.payload.players
      }
    default:
      return state;
  }
};
