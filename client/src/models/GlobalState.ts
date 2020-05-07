import { CardImage } from './CardImage';
import { DrawnCardResponse } from './response/DrawnCardResponse';
import { UserResponse } from './response/UserResponse';
import { User } from './User';

export interface GlobalState {
  socket: SocketIOClient.Socket | null;

  // State
  cardImage: CanvasImageSource | null;
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

  // Functions (actions and helpers)
  canStartGame: Function;
  displayCard: ( canvas: HTMLCanvasElement ) => any;
  drawCard: Function;
  endTurn: Function;
  isMyTurn: Function;
  joinRoom: ( name: string, roomCode: string ) => any;
  makeConnection: Function;
  startGame: Function;
  setCardImages: ( image: CanvasImageSource, cardImages: CardImage[] ) => any;
}
