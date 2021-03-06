import React, { useContext, useEffect } from 'react';
import cardsImageSrc from './assets/card-deck-spritesheet.png';
import GameScreen from './components/GameScreen';
import InfoBar from './components/InfoBar';
import LoadingScreen from './components/LoadingScreen';
import Popup from './components/Popup';
import RoomCodeScreen from './components/RoomCodeScreen';
import { GlobalContext } from './context/GlobalContext';
import { CardImage } from './models/CardImage';

const App: React.FC = () => {
  const {
    drawnCard,
    joining,
    loading,
    me,
    makeConnection,
    setCardImages,
  } = useContext(GlobalContext);

  useEffect(() => {
    loadImage();
    // TODO: temp or should we leave it to show the awesome loading screen?
    setTimeout(() => {
      makeConnection();
    }, 2000);
  }, []);

  const loadImage = () => {
    // let images = [];
    let image = new Image();
    image.src = cardsImageSrc;
    image.onload = function () {
      let cols = 13;
      let rows = 5;
      let spriteWidth = 98.4;
      let spriteHeight = 153.2;

      let cardImages = new Array<CardImage>();
      for (let x = 0; x < rows; x++) {
        for (let y = 0; y < cols; y++) {
          cardImages.push({
            suit: getSuit(x),
            value: x !== 4 ? y.toString() : 'backside',
            width: spriteWidth,
            height: spriteHeight,
            x: y * spriteWidth,
            y: x * spriteHeight,
          } as CardImage);
        }
      }

      setCardImages(image, cardImages);
    };
  };

  const getSuit = (row: number): string => {
    switch (row) {
      case 0:
        return 'clubs';
      case 1:
        return 'diamonds';
      case 2:
        return 'hearts';
      case 3:
        return 'spades';
      default:
        return 'blank';
    }
  };

  return (
    <div className="container">
      <Popup id="card-popup" show={drawnCard !== null} />
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          <InfoBar />
          {!joining && me ? <GameScreen /> : <RoomCodeScreen />}
        </>
      )}
    </div>
  );
};

export default App;
