import { User } from './User';

export class Room {
	private roomCode: string;

	// TODO: needs to be a dictionary
	private users: Array<User>;

	public constructor(roomCode: string) {
		this.roomCode = roomCode;

		this.users = new Array();
	}
}
