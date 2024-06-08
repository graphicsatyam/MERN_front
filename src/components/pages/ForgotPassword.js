import React, { useState } from "react";
import axios from "axios";
import "./SignupPage.css";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/forgot-password`, {
      email, // Include email in the request body
    })
    .then((response) => {
      if(response.data.status) {
        alert("Check your Email for Reset Password Link");
        navigate('/login');
      }
      console.log(response.data);
    })
    .catch((err) => {
      console.log("An Error has Occurred");
    });
  };

  return (
    <div className="background_login">
      <div className="box_container">
        <div className="box">
          <div className="login_txt">Forgot Password</div>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="email"
                id="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
              />
            </div>
            <button type="submit" className="login_btn">Send</button>
          </form>
          <div className="account_txt">
            Already have an account? <Link to="/login">Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
