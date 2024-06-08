import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


import './UploadEvents.css';

const UploadEvents = () => {
  const [uploadedDate, setUploadedDate] = useState("");
  const [eventName, setEventName] = useState("");
  const [startingDate, setStartingDate] = useState("");
  const [endingDate, setEndingDate] = useState("");
  const [guest, setGuest] = useState("");
  const [description, setDescription] = useState("");
  const [currentUser, setCurrentUser] = useState(""); // Added field
  const [userlimit, setUserlimit] = useState(""); // Added field

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [time, settime] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/admin/events`, {
      uploadedDate,
      eventName,
      startingDate,
      endingDate,
      guest,
      description,
      currentUser, // Included in the request
      userlimit, // Included in the request
      time,
    })
    .then((response) => {
      if (response.status === 201) {
        setSuccessMessage("Event Uploaded Successfully!");
        setErrorMessage("");
        setTimeout(() => {
          navigate('/adminpanel');  // Assuming you have an events listing page
        }, 2000);
      } else {
        setErrorMessage(response.data.message || "An error occurred during event upload.");
        setSuccessMessage("");
      }
    })
    .catch((err) => {
      setErrorMessage("An error occurred during event upload.");
      setSuccessMessage("");
    });
  };

  return (
    <div className="background_upload">
      <div className="box_container">
        <div className="box">
          <div className="upload_txt"> <h4> Upload Event </h4></div>
          
          {successMessage && (
            <div className="alert alert-success" role="alert">
              {successMessage}
            </div>
          )}
          {errorMessage && (
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <div className="formsection" style={{ width: "100%" }}>
                Uploaded Date
                <input
                  type="date"
                  id="uploadedDate"
                  name="uploadedDate"
                  onChange={(e) => setUploadedDate(e.target.value)}
                  required
                  placeholder="Uploaded Date"
                />
              </div>
            </div>
            <div className="input-group">
              <div>
                <input
                  type="text"
                  id="eventName"
                  name="eventName"
                  onChange={(e) => setEventName(e.target.value)}
                  required
                  placeholder="Event Name"
                />
              </div>
            </div>
            <div className="input-group">
              <div className="formsection">  
                Starting Date
                <input
                  type="date"
                  id="startingDate"
                  name="startingDate"
                  onChange={(e) => setStartingDate(e.target.value)}
                  required
                  placeholder="Starting Date"
                />
              </div>
            </div>
            <div className="input-group">
              <div className="formsection">  
                Ending Date
                <input
                  type="date"
                  id="endingDate"
                  name="endingDate"
                  onChange={(e) => setEndingDate(e.target.value)}
                  required
                  placeholder="Ending Date"
                />
              </div>
            </div>
            <div className="input-group">
              <div>
                <input
                  type="text"
                  id="time"
                  name="timeName"
                  onChange={(e) => settime(e.target.value)}
                  required
                  placeholder="Time"
                />
              </div>
              </div>
            <div className="input-group">
              <input
                type="text"
                id="guest"
                name="guest"
                onChange={(e) => setGuest(e.target.value)}
                required
                placeholder="Guest Name (if any)"
              />
            </div>
            <div className="input-group">
              <textarea
                id="description"
                style={{ width: "100%" }}
                name="description"
                onChange={(e) => setDescription(e.target.value)}
                required
                placeholder="Description"
                rows="3"
              />
            </div>
            <div className="input-group">
              <input
                type="text"
                id="currentUser"
                name="currentUser"
                onChange={(e) => setCurrentUser(e.target.value)}
                required
                placeholder="Current User"
              />
            </div>
            <div className="input-group">
              <input
                type="number"
                id="userlimit"
                name="userlimit"
                onChange={(e) => setUserlimit(e.target.value)}
                required
                placeholder="User Limit"
              />
            </div>
            
            <button type="submit" className="upload_btn">
              Upload Event
            </button>
          </form>
          
        </div>
      </div>
    </div>
  );
};

export default UploadEvents;
