import { UserResponse } from './response/UserResponse';
import { User } from './User';

export interface GlobalState {
  socket: SocketIOClient.Socket | null;

  // State
  connected: boolean;
  joining: boolean;
  loading: boolean;
  me: User | null;
  players: Array<UserResponse>;

  // Actions:
  joinRoom: ( name: string, roomCode: string ) => any;
  makeConnection: () => any;
}
