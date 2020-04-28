import { Deck } from './Deck';
import { User } from './User';

export class Game {

  private _isStarted: boolean = false;
  private _turnOrder: User[] = [];
  private _currentTurn: User | null = null;
  private _deck: Deck | null = null;

  public constructor () {

  }

  public get currentTurn(): User | null { return this._currentTurn; }
  public get isStarted(): boolean { return this._isStarted; }

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