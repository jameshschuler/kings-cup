import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../context/GlobalContext';

const GameScreenInfoBar: React.FC = () => {
  const {
    canStartGame,
    currentTurn,
    drawingCard,
    drawCard,
    isMyTurn,
    isGameOver,
    isStarted,
    startGame,
  } = useContext( GlobalContext );

  const drawCardButton = (
    <button
      className="pure-button pure-button-primary button-xlarge"
      id="draw-card-btn"
      disabled={drawingCard}
      onClick={() => drawCard()}
    >
      {drawingCard ? 'Drawing...' : 'Draw Card'}
    </button>
  );

  const startGameButton = (
    <button
      className="pure-button pure-button-primary button-xlarge"
      id="start-game-btn"
      onClick={() => startGame()}
    >
      Start Game
    </button>
  );

  const [ content, setContent ] = useState<JSX.Element>();

  useEffect( () => {
    if ( isGameOver ) {
      setContent( <span>Game Over!</span> );
      return;
    }

    if ( canStartGame() ) {
      setContent( startGameButton );
    } else if ( isStarted ) {
      if ( isMyTurn() ) {
        setContent( drawCardButton )
      } else {
        setContent( <span id='whose-turn'>It's {currentTurn?.name}'s turn!</span> )
      }
    } else {
      setContent( <span>Welcome!</span> )
    }
  }, [ isGameOver, isStarted, canStartGame, isMyTurn ] );

  return (
    <div id="game-screen-info-bar">
      <div id="buttons">
        {content}
      </div>
    </div>
  );
};

export default GameScreenInfoBar;
