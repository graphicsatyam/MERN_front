import React, { useState } from "react";
import axios from "axios";
import "./SignupPage.css"; // Make sure this path is correct
import { Link, useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/reset-password/${token}`, {
      password,
    }).then(response => {
      if (response.data.status) {
        navigate('/login');
      }
    }).catch(err => {
      console.log(err);
    });
  };

  return (
    <div className="background_login">
      <div className="box_container">
        <div className="box">
          <div className="login_txt">Reset Password</div>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="password"
                id="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="New Password"
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

export default ResetPassword;
