import React, { useEffect } from 'react';
import './Dashboard.css';
import {  useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/auth/verify`)
      .then(res => {
        if (res.data.status) {
          // User is authenticated
        } else {
          navigate('/login');
        }
      })
      .catch(err => {
        console.error("Verification failed:", err);
        navigate('/login');
      });
  }, [navigate]);
  axios.defaults.withCredentials = true
  // const handleLogout = () => {
  //   axios.get(`${process.env.REACT_APP_BACKEND_URL}/auth/logout`) // Assuming there's a logout route
  //     .then(res => {
  //       if(res.data.status) {
  //           navigate('/login')
  //       }
  //     }).catch(err => {
  //       console.log(err);
  //     })
  // };

  return (
    <div>
      <div className="header_main">
      <div className="container">
      <button className="account-button">Account</button>
    </div>
      </div>

      <div className="container">
      <div className="main_heading1"> EVENTS </div>
          <div className="details" style={{color:"black"}}> To unlock Unlimited Food and Drinks in near by Cafe, Restaurants 
or Resto bars make 1,000 Rupees for a month.
 </div>

        <div className="validity" style={{justifyContent:"center", alignItems:"center"}}>
        <div className="btn1"> Valid for 2 Persons </div>
        <div className="btn2" style={{width: "306px"}}> No hidden charges for 2 Person </div>
        <div className="btn1"> For Dine in Only </div>
        </div>


        <div className="payment_box">
          <div className="club_img"> <img src="images/dance.jpg" alt="" /> </div>
          <div className="payment_details"> 
                <div className="rows1"> PAY NOW </div>
                <div className="rows2"> (Only 1000 Rs.) </div>
          </div>
          <div className="club_img"> <img src="images/restro.jpeg" alt="" /> </div>
        </div>
        
        </div>

      {/* <button><Link to="/dashboard">Dashboard</Link></button> 
      <br></br>
      <button onClick={handleLogout}>LogOut</button> */}
    </div>
  );
};

export default Dashboard;
