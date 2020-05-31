import React, { useContext } from 'react';
import loadingVideo from '../assets/loading.webm';
import { GlobalContext } from '../context/GlobalContext';

const LoadingScreen: React.FC = () => {
  const { message } = useContext(GlobalContext);

  return (
    <div id="loading-screen">
      <h1 className="company-title">HomeDoneGames</h1>
      <video autoPlay={true} loop={true}>
        <source src={loadingVideo} type="video/webm" />
        Your browser does not support the video tag. Sad :(
      </video>
      <h2 className="subtitle">{message}</h2>
    </div>
  );
};

export default LoadingScreen;
