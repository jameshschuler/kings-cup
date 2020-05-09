import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import GameScreenInfoBar from './GameScreenInfoBar';
import PlayersCircle from './PlayersCircle';

const GameScreen: React.FC = () => {
  const { kingCount } = useContext( GlobalContext );

  return <div id="game-screen">
    <GameScreenInfoBar />
    <div id="kings-cup">
      <span id="king-count">King Count: {kingCount}</span>
    </div>
    <PlayersCircle />
  </div>
}

export default GameScreen;