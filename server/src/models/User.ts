import { Card } from './Card';

export interface User {
  id: string;
  name: string;
  roomCode: string;
  icon: string;
  drawnCards: Card[];
}
