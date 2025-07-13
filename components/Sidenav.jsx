import React from "react";
import "./Sidenav.css";

const Sidenav = () => {
  return (
    <div className="sidebar">
      <h2>Weather App</h2>
      <ul className="sidebar-links">
        <li><a href="#dashboard">Dashboard</a></li>
        <li><a href="#profile">Search</a></li>
        <li><a href="#settings">About</a></li>
      </ul>
    </div>
  );
};

export default Sidenav;