import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';


const GameScreenInfoBar: React.FC = () => {
  const { canStartGame, drawCard, isMyTurn, startGame } = useContext( GlobalContext );

  return (
    <div id="game-screen-info-bar">
      {canStartGame() &&
        <button className="pure-button pure-button-primary button-large" id="start-game-btn"
          onClick={() => startGame()}>
          Start Game
        </button>
      }
      {isMyTurn() && (
        <>
          <button className="pure-button pure-button-success button-large"
            onClick={() => drawCard()}>Draw Card!</button>
          <h2 id="your-turn-text">Your Turn!</h2>
        </>
      )}
    </div>
  )
}

export default GameScreenInfoBar;