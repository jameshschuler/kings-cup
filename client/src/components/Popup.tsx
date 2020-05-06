import React, { useEffect, useState } from 'react';

interface PopupProps {
  header?: string;
  content?: any;
  id?: string;
  show: boolean;
}

// TODO: when user closes popup, set drawn care to null

const Popup: React.FC<PopupProps> = ( { header, id, content, show } ) => {
  const [ visible, setVisible ] = useState( false );

  useEffect( () => {
    setVisible( show );
  }, [ show ] );

  return visible ? (
    <div className="overlay">
      <div className="popup" id={id}>
        <div className="header">
          <h2>Hello</h2>
        </div>
        <div className="content">
          <canvas id="canvas"></canvas>
        </div>
        <div className="buttons">
          <button className="button-large button-secondary pure-button" id="close-popup-btn"
            type="button" onClick={() => setVisible( false )}>Close</button>
        </div>
      </div>
    </div>
  ) : ( <></> );
}

export default Popup;