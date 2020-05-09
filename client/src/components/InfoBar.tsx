import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';

const InfoBar: React.FC = () => {
  const { connected, me } = useContext( GlobalContext );

  return (
    <div id='info-bar'>

      <div id="left">
        <h2>HomeDoneGames</h2>
      </div>
      <div id="right">
        {
          me && (
            <div id="player-info">
              <span>{me.name} | {me.roomCode}</span>
            </div>
          )
        }
        <span className='connection-status'>
          <i
            className={`fas fa-signal fa-fw ${
              connected ? 'success-icon' : 'danger-icon'
              }`}
          ></i>
        </span>
      </div>

    </div>
  );
};

export default InfoBar;
