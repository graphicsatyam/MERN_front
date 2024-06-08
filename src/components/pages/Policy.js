import React from "react";
import "./Policy.css";
import { Link } from "react-router-dom";

const Policy = () => {
  return (
    <div className="body">
      <div className="complete_box">
        <div className="box_container1">
          <div className="policy_heading">
            By continuing, Agree with Policy
          </div>
          <div className="policy_dtls">
            The Disclaimer would be applicable to the website and consumer. By
            using website you are agree with policy without any qualifications
            and limitations. We deserve the right to add any or delete material
            from the website at any time and may at any time reserve the terms
            without notifying you. You use website at your audacity. The company
            at any time if may want so charge extra pecuniary. We are trying to
            put our efforts to provide services to users. We are trying to make
            you feel enjoyable, happy with our services. Slots are booked when
            they are available to do. If user at any time in any case unable to
            get favour of offerings or unable to avail offers whether reason can
            be from any side. Then we are not inclined to gave invested
            pecuniary back. You may login logout from website any time as per
            your choice. The website shall not have control over on its users to
            login or logout from website. Hope you have better experience
            while using website.{" "}
          </div>
          <div className="btns"><Link to = "/">  <div className="back_btn">  Back   </div></Link> </div>
        </div>
      </div>
    </div>
  );
};

export default Policy;
