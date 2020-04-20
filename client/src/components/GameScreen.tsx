import React from 'react';
import PlayersCircle from './PlayersCircle';

const GameScreen: React.FC = () => {
  return <div id="game-screen">
    <div id="kings-cup"></div>
    <PlayersCircle />
  </div>
}

export default GameScreen;