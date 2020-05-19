import React, { useContext, useEffect, useState } from 'react';
import emptyCup from '../assets/empty.png';
import firstPour from '../assets/first_pour.png';
import finalPour from '../assets/full_cup.png';
import secondPour from '../assets/half_full.png';
import thirdPour from '../assets/three_quarters_full.png';
import { GlobalContext } from '../context/GlobalContext';
import GameScreenInfoBar from './GameScreenInfoBar';
import PlayersCircle from './PlayersCircle';

const GameScreen: React.FC = () => {
  const { kingCount } = useContext( GlobalContext );
  const [ imageSrc, setImageSrc ] = useState<string>( '' );
  const [ imageSrcs, setImageSrcs ] = useState<string[]>( [ emptyCup, firstPour, secondPour, thirdPour, finalPour ] );

  useEffect( () => {
    setImageSrc( imageSrcs[ kingCount ] );
  }, [ kingCount ] );

  return <div id="game-screen">
    <div id="play-area">
      <img src={imageSrc} id="kings-cup" />
      <PlayersCircle />
    </div>
    <div id="info-area">
      <GameScreenInfoBar />
    </div>
  </div>
}

export default GameScreen;