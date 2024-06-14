import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <div className="background">
        <div className="container">
          <div className="cherrs_text"> Cherrs to Life </div>
          <div className="details"> Avail Unlimited Food and Drinks in near by Cafe, Restaurants and Resto bars in just 1,000 Rupees a month .
 </div>

        <div className="validity">
        <div className="btn_new"> Valid for 2 Persons </div>
        <div className="btn_new"> No hidden Charges </div>
        </div>

        <div className="login_dtl">
        <Link to="/login"> <div className="btn3">  Login </div> </Link>
        <Link to="/signup" > <div className="btn4">  Sign Up</div>  </Link>
        </div>
        <div className="policy_txt"> <Link to = "/policy" > By continuing, Agree with Policy </Link></div>

        <div className="all_images">
            <div className="dance"> <img src="images/dance.jpg" alt="" /> </div>
            <div className="dance"> <img src="images/dinner.jpg" alt="" /> </div>
            <div className="dance"> <img src="images/restro.jpeg" alt="" /> </div>
            <div className="dance"> <img src="images/event.jpg" alt="" /> </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
