import { Rule } from '../Rule';

export interface JoinedRoomResponse {
  name: string;
  roomCode: string;
  rules: Rule[];
}