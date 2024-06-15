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
  const [currentUser, setCurrentUser] = useState("");
  const [userlimit, setUserlimit] = useState("");
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
      currentUser,
      userlimit,
      time,
    })
    .then((response) => {
      if (response.status === 201) {
        setSuccessMessage("Event Uploaded Successfully!");
        setErrorMessage("");
        setTimeout(() => {
          navigate('/adminpanel');
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
    <div className="container9 mt-4">
      <div className="row justify-content-center">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title text-center mb-4">Upload Event</h4>

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
                <div className="form-group">
                  <label htmlFor="uploadedDate">Uploaded Date</label>
                  <input
                    type="date"
                    className="form-control"
                    id="uploadedDate"
                    name="uploadedDate"
                    value={uploadedDate}
                    onChange={(e) => setUploadedDate(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="eventName">Event Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="eventName"
                    name="eventName"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="startingDate">Starting Date</label>
                  <input
                    type="date"
                    className="form-control"
                    id="startingDate"
                    name="startingDate"
                    value={startingDate}
                    onChange={(e) => setStartingDate(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="endingDate">Ending Date</label>
                  <input
                    type="date"
                    className="form-control"
                    id="endingDate"
                    name="endingDate"
                    value={endingDate}
                    onChange={(e) => setEndingDate(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="time">Time</label>
                  <input
                    type="text"
                    className="form-control"
                    id="time"
                    name="time"
                    value={time}
                    onChange={(e) => settime(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="guest">Guest Name (if any)</label>
                  <input
                    type="text"
                    className="form-control"
                    id="guest"
                    name="guest"
                    value={guest}
                    onChange={(e) => setGuest(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    rows="3"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="currentUser">Current User</label>
                  <input
                    type="text"
                    className="form-control"
                    id="currentUser"
                    name="currentUser"
                    value={currentUser}
                    onChange={(e) => setCurrentUser(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="userlimit">User Limit</label>
                  <input
                    type="number"
                    className="form-control"
                    id="userlimit"
                    name="userlimit"
                    value={userlimit}
                    onChange={(e) => setUserlimit(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block mt-4">
                  Upload Event
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadEvents;
