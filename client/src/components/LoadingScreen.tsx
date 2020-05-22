import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';

const LoadingScreen: React.FC = () => {
  const { message } = useContext( GlobalContext );

  return (
    <div id='loading-screen'>
      {/* <h1 className='company-title'>HomeDoneGames</h1>
			<h3 className='subtitle'>Presents</h3>
			<h2 className='game-title'>King's Cup</h2> */}
      <h2>{message}</h2>
    </div>
  );
};

export default LoadingScreen;
