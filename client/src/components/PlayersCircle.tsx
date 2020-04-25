import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import { UserResponse } from '../models/response/UserResponse';

const PlayersCircle = () => {
  const { players } = useContext( GlobalContext );

  return (
    <div id="players-circle">
      {players.map( ( player: UserResponse, index: number ) => {
        const offsetAngle = 360 / players.length;
        const rotateAngle = offsetAngle * index;
        return (
          <div key={player.id} className="player"
            style={{
              transform: `rotate(${rotateAngle}deg) translate(0px, -250px) rotate(-${rotateAngle}deg)`
            }}>
            <div className="player-info">
              <span className='player-icon'><i className={`${player.icon} fa-2x fa-fw`}></i></span>
              <div className="name-and-cards">
                <span className="player-name">{player.name}</span>
                <div className="drawn-cards">
                  <div className="card"></div>
                </div>
              </div>
            </div>

          </div>
        );
      }
      )}
    </div>
  )
}

export default PlayersCircle;