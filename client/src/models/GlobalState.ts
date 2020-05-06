import { CardImage } from './CardImage';
import { DrawnCardResponse } from './response/DrawnCardResponse';
import { UserResponse } from './response/UserResponse';
import { User } from './User';

export interface GlobalState {
  socket: SocketIOClient.Socket | null;

  // State
  cardImages: Array<CardImage>;
  connected: boolean;
  currentTurn: User | null;
  drawingCard: boolean;
  drawnCard: DrawnCardResponse | null;
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
  setCardImages: ( cardImages: CardImage[] ) => any;
}
