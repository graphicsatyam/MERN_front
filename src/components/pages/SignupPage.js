import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';

import React, { useState } from "react";
import axios from "axios";
import "./SignupPage.css";
import { Link, useNavigate } from "react-router-dom";

const SignupPage = () => {
  console.log("hiii");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [createpassword, setCreatePassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [number, setNumber] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    console.log("hloo");
    e.preventDefault();



    axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/signup`, {
      name,
      email,
      createpassword,
      confirmpassword,
      number,
    })
    .then((response) => {
      if (response.data.status) {
        setSuccessMessage("Signup Successful! Redirecting to login...");
        setErrorMessage("");
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setErrorMessage(response.data.message || "An error occurred during signup.");
        setSuccessMessage("");
      }
    })
    .catch((err) => {
      setErrorMessage("Already Registered");
      setSuccessMessage("");
    });
  };

  return (
    <div className="background_login">
      <div className="box_container">
        <div className="box">
          <div className="login_txt">SignUp</div>
          
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

          <form onSubmit={handleSubmit} style={{width:'100%'}}>
            <div className="input-group">
              <input
                type="text"
                id="name"
                name="name"
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Name"
              />
            </div>
            <div className="input-group">
              <input
                type="email"
                id="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Email"
              />
            </div>
            <div className="input-group">
              <input
                type="password"
                id="createPassword"
                name="createPassword"
                onChange={(e) => setCreatePassword(e.target.value)}
                required
                placeholder="Create Password"
              />
            </div>
            <div className="input-group">
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="Confirm Password"
              />
            </div>
            <div className="input-group">
              <input
                type="number"
                id="number"
                name="number"
                onChange={(e) => setNumber(e.target.value)}
                required
                placeholder="Mob. No."
              />
            </div>
            <button type="submit" className="login_btn">
              SignUp
            </button>
          </form>
          <div className="account_txt">
            Already have an account? <Link to="/login">Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
