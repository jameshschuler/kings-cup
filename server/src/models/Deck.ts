import { Card } from './Card';

export class Deck {
  private _cards: Array<Card> = [];
  private _values = [ '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace' ];
  private _suitValues = [ 1, 2, 3, 4 ];
  public constructor () {
    this.generateCards();
    this.shuffle();
  }

  private generateCards(): void {
    for ( let suit of this._suitValues ) {
      for ( let value in this._values ) {
        this._cards.push( {
          value,
          suit
        } );
      }
    }
  }

  private shuffle(): void {
    let i = 0
      , j = 0
      , temp = null

    for ( i = this._cards.length - 1; i > 0; i -= 1 ) {
      j = Math.floor( Math.random() * ( i + 1 ) )
      temp = this._cards[ i ]
      this._cards[ i ] = this._cards[ j ]
      this._cards[ j ] = temp
    }
  }
}