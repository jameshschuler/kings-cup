import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';

const GameScreenInfoBar: React.FC = () => {
  const {
    canStartGame,
    currentTurn,
    drawingCard,
    drawCard,
    isMyTurn,
    startGame,
  } = useContext( GlobalContext );

  return (
    <div id="game-screen-info-bar">
      {
        currentTurn && (
          <span id="current-turn">
            Currently {currentTurn?.name}'s Turn!
          </span>
        )
      }
      <div id="buttons">
        {canStartGame() && (
          <button
            className="pure-button pure-button-primary button-large"
            id="start-game-btn"
            onClick={() => startGame()}
          >
            Start Game
          </button>
        )}
        {isMyTurn() && (
          <>
            <button
              className="pure-button pure-button-primary button-large"
              id="draw-card-btn"
              disabled={drawingCard}
              onClick={() => drawCard()}
            >
              {drawingCard ? 'Drawing...' : 'Draw Card'}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default GameScreenInfoBar;
