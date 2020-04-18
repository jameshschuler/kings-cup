import { User } from './User';

export class Room {
  private _roomCode: string;
  private _users: Array<User>;

  public constructor ( roomCode: string ) {
    this._roomCode = roomCode;
    this._users = new Array<User>();
  }

  public get roomCode(): string { return this._roomCode; }

  public get users(): Array<string> {
    return this._users.map( u => u.name );
  }

  public addUser( id: string, name: string ): User {
    const storedUser = this._users.find( u => u.name === name );

    let newUser = {
      name: storedUser ? `${name}${Math.floor( Math.random() * 100 )}` : name,
      id,
      roomCode: this._roomCode
    } as User;

    this._users.push( newUser );
    return newUser;
  }
}
