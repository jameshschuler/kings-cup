import { UserResponse } from './response/UserResponse';
import { User } from './User';

export interface GlobalState {
  socket: SocketIOClient.Socket | null;

  // State
  connected: boolean;
  currentTurn: User | null;
  drawingCard: boolean;
  isStarted: boolean;
  joining: boolean;
  loading: boolean;
  me: User | null;
  players: Array<UserResponse>;

  // Actions:
  canStartGame: () => boolean;
  drawCard: () => any;
  isMyTurn: () => any;
  joinRoom: ( name: string, roomCode: string ) => any;
  makeConnection: () => any;
  startGame: () => any;
}
