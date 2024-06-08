import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import { useState } from 'react';
import axios from 'axios';
import React from "react";
import "./LoginPage.css";
import { useNavigate } from "react-router-dom";


const AdminLogin = () => {
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

    // Check if email and password match the specific credentials
    if (email === "rohandhingra@gmail.com" && password === "Rohan2050@") {
      setSuccessMessage("Login successful! Redirecting to dashboard...");
      setTimeout(() => {
        navigate('/adminpanel'); // Redirect to adminpanel after successful login
      }, 2000); // Redirect after 2 seconds
      return;
    }
    
    // If email and password do not match, proceed with normal login
    axios.post(`${process.env.BACKEND_URL}/auth/adminlogin`, { email, password })
      .then((response) => {
        console.log('Response:', response.data); // Log response for debugging
        if (response.data.status) {
          setSuccessMessage("Login successful! Redirecting to dashboard...");
          setTimeout(() => {
            navigate('/adminpanel'); // Redirect to adminpanel after successful login
          }, 2000); // Redirect after 2 seconds
        } else {
          setErrorMessage(response.data.message || "Login failed. Please try again.");
        }
      })
      .catch((err) => {
        console.error('Error:', err); // Log error for debugging
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
          <div className="login_txt">Admin Login</div>
          
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

          <form onSubmit={handleSubmit}>
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
          
          {/* <div className="psw"><Link to="/forgotpassword">Forgot Password?</Link></div> */}
          {/* <div className="account_txt">Don’t have an account? <Link to="/adminsignup">Signup</Link></div> */}
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
