import { Card } from './Card';
import { Suit } from './enums/Suit';
import { Game } from './Game';
import { DrawnCardResponse } from './response/DrawnCardResponse';
import { EndTurnResponse } from './response/EndTurnResponse';
import { StartedGameResponse } from './response/StartedGameResponse';
import { UserResponse } from './response/UserResponse';
import { Rule } from './Rule';
import { User } from './User';

export class Room {
  private _roomCode: string;
  private _users: Array<User>;
  private _game: Game;
  private _rules: Rule[];

  private _icons = [ 'fa-ghost', 'fa-dog', 'fa-cat',
    'fa-dragon', 'fa-fish', 'fa-frog',
    'fa-hippo', 'fa-kiwi-bird', 'fa-otter', 'fa-hat-wizard', 'fa-dove' ];

  public constructor( roomCode: string ) {
    this._roomCode = roomCode;
    this._users = new Array<User>();
    this._game = new Game();
    this._rules = this.getDefaultRules();
  }

  public get roomCode(): string { return this._roomCode; }

  public get users(): Array<UserResponse> {
    const response: UserResponse[] = this._users.map( ( u: User, index: number ) => {

      return { id: index, icon: u.icon, name: u.name }
    } );

    return response;
  }

  /**
   * 
   * @param id 
   * @param name 
   */
  public addUser( id: string, name: string ): User {
    const storedUser = this._users.find( u => u.name === name );
    const icon = this._icons[ Math.round( Math.random() * this._icons.length ) ];
    let newUser = {
      name: storedUser ? `${name}${Math.floor( Math.random() * 100 )}` : name,
      icon: `fas ${icon}`,
      id,
      roomCode: this._roomCode,
      drawnCards: new Array<Card>()
    } as User;

    this._users.push( newUser );
    return newUser;
  }

  /**
   * 
   * @param userId 
   */
  public drawCard( userId: string ): DrawnCardResponse | null {
    const user = this._users.find( u => u.id === userId );

    if ( !user ) {
      return null;
    }

    const card = this._game.drawCard();
    user.drawnCards.push( card );

    return {
      suit: Suit[ card.suit ],
      value: card?.value,
      kingCount: this._game.kingCount,
      isGameOver: this._game.isGameOver
    } as DrawnCardResponse;
  }

  /**
   * 
   */
  public endTurn(): EndTurnResponse {
    const currentTurn = this._game.endTurn();

    return {
      currentTurn
    } as EndTurnResponse;
  }

  /**
   * 
   * @param id 
   */
  public removeUser( id: string ): void {
    this._users = this._users.filter( u => u.id !== id );
  }

  /**
   * 
   */
  public startGame(): StartedGameResponse {
    this._game.turnOrder = this._users;
    this._game.startGame();

    return {
      isStarted: this._game.isStarted,
      currentTurn: this._game.currentTurn!
    }
  }

  private getDefaultRules(): Rule[] {
    return [
      {
        value: '2',
        descriptions: [ '2 is you! Take a drink!' ]
      },
      {
        value: '3',
        descriptions: [ '' ]
      },
      {
        value: '4',
        descriptions: [ '' ]
      },
      {
        value: '5',
        descriptions: [ '' ]
      },
      {
        value: '6',
        descriptions: [ '' ]
      },
      {
        value: '7',
        descriptions: [ '' ]
      },
      {
        value: '8',
        descriptions: [ '' ]
      },
      {
        value: '9',
        descriptions: [ '' ]
      },
      {
        value: '10',
        descriptions: [ '' ]
      },
      {
        value: 'Jack',
        descriptions: [ '' ]
      },
      {
        value: 'Queen',
        descriptions: [ 'Questions! Do I even need to tell you?' ]
      },
      {
        value: 'King',
        descriptions: [ 'Take a drink and add one to the King\'s cup!' ]
      },
      {
        value: 'Ace',
        descriptions: [ 'Never Have I Ever!', 'Waterfall!' ]
      },
    ];
  }
}
