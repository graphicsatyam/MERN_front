import React from "react";
import { NavLink, Outlet } from "react-router-dom";

// Importing CSS
import "./AdminLayout.css";

import { FaUser } from "react-icons/fa";
import { BsCalendar2EventFill } from "react-icons/bs";
import { RiHome8Fill } from "react-icons/ri";
// import { IoLogInSharp } from "react-icons/io5";

const AdminLayout = () => {

 

  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg " style={{backgroundColor:"#EEB80E"}}>
          <div className="container-fluid justify-content-center">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/adminpanel/uploadevents">
                    <BsCalendar2EventFill /> Upload Events
                  </NavLink>
                </li>
                <li className="nav-item">
                <NavLink className="nav-link" to="/adminpanel/events">
                    <BsCalendar2EventFill /> Events Data
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/adminpanel/users">
                    <FaUser /> Users Data
                  </NavLink>
                </li>


                <li className="nav-item">
                  <NavLink className="nav-link" to="/">
                    <RiHome8Fill /> Logout
                  </NavLink>
                </li>


              </ul>
            </div>
          </div>
        </nav>
      </header>
      <Outlet />
    </>
  );
};

export default AdminLayout;
