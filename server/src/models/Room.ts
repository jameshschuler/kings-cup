import { UserResponse } from './response/UserResponse';
import { User } from './User';

export class Room {
  private _roomCode: string;
  private _users: Array<User>;

  public constructor ( roomCode: string ) {
    this._roomCode = roomCode;
    this._users = new Array<User>();
  }

  public get roomCode(): string { return this._roomCode; }

  public get users(): Array<UserResponse> {
    const response: UserResponse[] = this._users.map( ( u: User, index: number ) => {
      return { id: index, icon: 'fas fa-ghost', name: u.name }
    } );


    // TODO: make sure list is in same order for every player... maybe sort by alpha
    return response;
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

  public removeUser( id: string ): void {
    this._users = this._users.filter( u => u.id !== id );
  }
}
