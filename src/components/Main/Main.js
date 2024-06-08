import React from 'react';
import './Main.css';

const Main = () => {

const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
}

  return (
    <div>
        <h1> Main Component </h1>
        <button onClick={handleLogout}>
            Logout
        </button>
    </div>
  )
}

export default Main