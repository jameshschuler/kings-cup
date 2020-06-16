import React, { useContext, useState } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import RulesPopup from './RulesPopup';

const InfoBar: React.FC = () => {
  const { connected, me, rules } = useContext(GlobalContext);
  const [showRules, setShowRules] = useState(false);

  const closePopup = () => {
    setShowRules(false);
  };

  return (
    <div id="info-bar">
      <RulesPopup closePopup={closePopup} id="rules-popup" show={showRules} />
      <div id="left">
        <h2>HomeDoneGames</h2>
      </div>
      <div id="right">
        {me && (
          <div id="player-info">
            <span>
              {me.name} | {me.roomCode}
            </span>
          </div>
        )}
        {rules.length > 0 && (
          <span className="rules-button" onClick={() => setShowRules(true)}>
            <i className="fas fa-info-circle"></i>
          </span>
        )}
        <span className="connection-status">
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
