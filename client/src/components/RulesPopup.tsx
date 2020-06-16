import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import { Rule } from '../models/Rule';

interface RulesPopupProps {
  closePopup: any;
  id: string;
  show: boolean;
}

const RulesPopup: React.FC<RulesPopupProps> = ({ closePopup, id, show }) => {
  const { rules } = useContext(GlobalContext);

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(show);
  }, [show]);

  const closeDialog = () => {
    setVisible(false);
    closePopup();
  };

  return (
    <div className={`overlay ${!visible ? 'hidden' : ''}`}>
      <div className="popup" id={id}>
        <div className="header">
          <h2>Rules</h2>
        </div>
        <div className="content">
          {rules.map((rule: Rule, index: number) => {
            return (
              <div className="rule" key={index}>
                <h3 className="rule-value">{rule.value}</h3>
                <ul className="rule-descriptions">
                  {rule.descriptions.map(
                    (description: string, index: number) => {
                      return (
                        <li key={index} className="rule-description">
                          {description}
                        </li>
                      );
                    }
                  )}
                </ul>
              </div>
            );
          })}
        </div>
        <div className="buttons">
          <button
            className="button-large button-secondary pure-button"
            id="close-popup-btn"
            type="button"
            onClick={() => closeDialog()}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default RulesPopup;
