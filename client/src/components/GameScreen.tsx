import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';

const GameScreen: React.FC = () => {
  const { players } = useContext( GlobalContext );

  return <div id="game-screen">
    Game Screen
    {players.map( ( player: string, index: number ) => {
    return <p>{player}</p>
  }
  )}
  </div>
}

export default GameScreen;