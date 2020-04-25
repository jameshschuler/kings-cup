import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';


const GameScreenInfoBar: React.FC = () => {
  const { canStartGame, isMyTurn, startGame } = useContext( GlobalContext );

  return (
    <div id="game-screen-info-bar">
      {canStartGame() &&
        <button className="pure-button pure-button-primary button-large" id="start-game-btn"
          onClick={() => startGame()}>
          Start Game
        </button>
      }
      {isMyTurn() && <span id="your-turn-text">Your Turn!</span>}
    </div>
  )
}

export default GameScreenInfoBar;