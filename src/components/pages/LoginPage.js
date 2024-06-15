// Import Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';

import { useState } from 'react';
import axios from 'axios';
import React from "react";
import "./LoginPage.css";
import { Link, useNavigate } from "react-router-dom";



const LoginPage = () => {
  console.log(process.env.REACT_APP_BACKEND_URL);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage(""); // Reset error message
    setSuccessMessage(""); // Reset success message

   
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, {
      email,
      password,
    }).then((response) => {
      if (response.data.status) {
        setSuccessMessage("Login successful! Redirecting to dashboard...");
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000); // Redirect after 2 seconds
      }
    }).catch((err) => {
      if (err.response && err.response.data.message) {
        setErrorMessage(err.response.data.message);
      } else {
        setErrorMessage("An error has occurred. Please try again.");
      }
    });
  };

  return (
    <div className="background_login">
      <div className="box_container">
        <div className="box">
          <div className="login_txt">Login</div>
          
          {errorMessage && (
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          )}
          {successMessage && (
            <div className="alert alert-success" role="alert">
              {successMessage}
            </div>
          )}

          <form className='form_set' onSubmit={handleSubmit}>
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
                id="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Password"
              />
            </div>
            <button className="login_btn" type="submit">Login</button>
          </form>
          
          <div className="psw"><Link to="/forgotpassword">Forgot Password?</Link></div>
          <div className="account_txt">Don’t have an account? <Link to="/signup">Signup</Link></div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
