import { Card } from './Card';
import { Deck } from './Deck';
import { User } from './User';

export class Game {

  private _isStarted: boolean = false;
  private _turnOrder: User[] = [];
  private _currentTurn: User | null = null;
  private _deck: Deck | null = null;
  private _drawnCards: Array<Card> = [];

  public constructor() { }

  public get currentTurn(): User | null { return this._currentTurn; }
  public get isStarted(): boolean { return this._isStarted; }

  public drawCard(): Card | null {
    const drawnCard = this._deck!.drawCard();

    if ( drawnCard ) {
      this._drawnCards.push( drawnCard );
    }

    return drawnCard;
  }

  public endTurn(): User | null {
    let index = this._turnOrder.indexOf( this._currentTurn! );

    const next = index += 1;

    if ( next < this._turnOrder.length ) {
      this._currentTurn = this._turnOrder[ next ];
    } else {
      this._currentTurn = this._turnOrder[ 0 ];
    }

    return this.currentTurn || null;
  }

  public startGame(): void {
    this._deck = new Deck();
    this._isStarted = true;
  }

  public stopGame(): void {
    this._isStarted = false;
  }

  public set turnOrder( turnOrder: User[] ) {
    this._turnOrder = turnOrder;
    this._currentTurn = this._turnOrder[ 0 ];
  }
}