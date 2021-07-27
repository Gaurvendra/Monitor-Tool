import React from "react";

import logo from "../../Assets/Icons/logo.png";
import "./sideBar.css";
import { Link } from "react-router-dom";
const Sidebar = () => {
  return (
    <div className="sidebar-container" style={{ overflow: "hidden" }}>
      <div style={{ marginTop: "35px", marginLeft: "15px" }}>
        <img className="crystyl-logo" src={logo} alt="logo" />
      </div>
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav  flex-column">
            <div
              id="discord-icon"
              style={{
                fontSize: "30px",
                width: "50px",
                height: "50px",

                marginRight: "10px",
              }}
              className="nav-link mb-5"
            >
              <Link to="/">
                <i
                  style={{
                    position: "relative",
                    marginLeft: "3px",
                    top: "-2px",
                  }}
                  className="fa fa-link discord"
                ></i>
              </Link>
            </div>

            <div
              style={{
                fontSize: "30px",
                width: "50px",
                height: "50px",
              }}
              to="/"
              className="nav-link mb-5 "
            >
              <Link to="/twitter">
                <i
                  style={{
                    position: "relative",
                    marginLeft: "3px",
                    top: "-3px",
                  }}
                  className="fa fa-twitter-square twitter-inside"
                ></i>
              </Link>
            </div>
          </ul>
        </div>
      </nav>
      <div
        style={{
          marginTop: "550px",
          color: "#fff",
        }}
      >
        <span>0.2.7</span>
      </div>
    </div>
  );
};

export default Sidebar;
