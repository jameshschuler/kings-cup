import React, { useContext, useEffect, useRef, useState } from 'react';
import { GlobalContext } from '../context/GlobalContext';

interface PopupProps {
  id?: string;
  show: boolean;
}

const Popup: React.FC<PopupProps> = ({ id, show }) => {
  const { endTurn, displayCard, isMyTurn } = useContext(GlobalContext);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(show);

    if (show) {
      setTimeout(() => {
        displayCard(canvasRef.current!);
      }, 100);
    }
  }, [show]);

  const closeDialog = () => {
    setVisible(false);
    endTurn();
  };

  return visible ? (
    <div className="overlay">
      <div className="popup" id={id}>
        <div className="header">
          <h2>Hello</h2>
        </div>
        <div className="content">
          <canvas ref={canvasRef} id="canvas"></canvas>
        </div>
        <div className="buttons">
          {isMyTurn() && (
            <button
              className="button-large button-secondary pure-button"
              id="close-popup-btn"
              type="button"
              onClick={() => closeDialog()}
            >
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default Popup;
