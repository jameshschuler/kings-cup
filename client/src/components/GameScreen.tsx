import React from 'react';
import GameScreenInfoBar from './GameScreenInfoBar';
import PlayersCircle from './PlayersCircle';

const GameScreen: React.FC = () => {
  return <div id="game-screen">
    <GameScreenInfoBar />
    <div id="kings-cup"></div>
    <PlayersCircle />
  </div>
}

export default GameScreen;