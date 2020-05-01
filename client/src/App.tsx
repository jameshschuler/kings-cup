import React, { useContext, useEffect } from 'react';
import cardsImageSrc from './assets/card-deck-spritesheet.png';
import GameScreen from './components/GameScreen';
import InfoBar from './components/InfoBar';
import LoadingScreen from './components/LoadingScreen';
import Popup from './components/Popup';
import RoomCodeScreen from './components/RoomCodeScreen';
import { GlobalContext } from './context/GlobalContext';

const App: React.FC = () => {
  const { joining, loading, me, makeConnection } = useContext( GlobalContext );

  useEffect( () => {
    loadImage();
    // TODO: temp
    setTimeout( () => {
      makeConnection();
    }, 2000 );
  }, [] );

  const loadImage = () => {
    // let images = [];
    let image = new Image();
    image.src = cardsImageSrc;
    image.onload = function () {
      console.log( "loaded" );

      let cols = 13;
      let rows = 5;
      let spriteWidth = 100;
      let spriteHeight = 150;
      let canvas = document.getElementById( 'canvas' ) as HTMLCanvasElement;
      let cxt = canvas!.getContext( '2d' );
      cxt!.drawImage( image, 0 * spriteWidth, 0 * spriteHeight,
        spriteWidth, spriteHeight, 0, 0, canvas.width, canvas.height );

      for ( let x = 0; x < cols; x++ ) {
        for ( let y = 0; y < rows; y++ ) {
          // cxt!.drawImage( image, x * spriteWidth, y * spriteHeight,
          //   spriteWidth, spriteHeight, 0, 0, canvas.width, canvas.height );

        }
      }

    }
  }

  return (
    <div className='container'>
      <Popup id="card-popup" show={true} />
      {loading ? (
        <LoadingScreen />
      ) : (
          <>
            <InfoBar />
            {
              ( !joining && me ) ? ( <GameScreen /> ) : ( <RoomCodeScreen /> )
            }
          </>
        )}
    </div>
  );
};

export default App;
