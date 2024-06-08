import React, { useEffect, useState } from "react";
import axios from "axios";
import './AllEvents.css';
import { formatDate } from './utils.js';

const AdminEvent = () => {
  const [events, setEvents] = useState([]);

  const getAllEventsData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/admin/events`, {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
          "Content-Type": "application/json",
        },
      });

      console.log(response);

      if (response.status !== 200) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = response.data;
      console.log("events", data);
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    getAllEventsData();
  }, []);

  return (
    
    <div className="event-cards-container">
      {events.map((curEvent, index) => (
        <div className="event-card" key={index}>
          <h3 className="event-name">{curEvent.eventName}</h3>
          <h2 className="event-date">Date:</h2>
          <div className="date">
            {formatDate(curEvent.startingDate)} to <span>{formatDate(curEvent.endingDate)}</span>
          </div>
          <div className="time"> Time : {curEvent.time} </div>
          <div className="guest"> Special Guest : {curEvent.guest} </div>
          <div className="description-input">
           
            <textarea id={`description-${index}`} value={curEvent.description} placeholder="Event Description" readOnly />
          </div>
          <button className="book-now-button" style={{backgroundColor:"#EEB80E"}}>Book Now</button>
        </div>
      ))}
    </div>
  );
};

export default AdminEvent;
