import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import { EventResponse } from '../models/response/EventResponse';

const EventLog: React.FC = () => {
  const { eventMessages } = useContext(GlobalContext);
  const [messages, setMessages] = useState<EventResponse[]>([]);
  useEffect(() => {
    setMessages(eventMessages);
  }, [eventMessages]);

  return (
    <div id="event-log">
      {messages.map((eventMessage: EventResponse, index: number) => {
        return (
          <div key={index} className="event">
            <span
              className={`event-type ${eventMessage.eventType.toLowerCase()}`}
            >
              {eventMessage.eventType}
            </span>
            <span className="event-message">{eventMessage.message}</span>
          </div>
        );
      })}
    </div>
  );
};

export default EventLog;
