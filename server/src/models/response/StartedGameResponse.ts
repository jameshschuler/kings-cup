import { User } from '../User';

export interface StartedGameResponse {
  isStarted: boolean;
  currentTurn: User;
}