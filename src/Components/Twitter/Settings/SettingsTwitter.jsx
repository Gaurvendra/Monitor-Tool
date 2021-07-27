import React from "react";
import Keys from "./Keys/Keys";
import WebHooks from "./Webhooks/WebHooks";
import ChromeUsers from "./ChromeUsers/ChromeUsers";
import Sidebar from "../../SideBar/sidebar";
import Navbar from "./../NavBar-Twitter/navBarTwitter";
import Waves from "./../../../Animations/Waves/waves";
import { Zoom } from "react-awesome-reveal";

const SettingsTwitter = () => {
  return (
    <div className="container-twitter-section">
      <Navbar />
      <Sidebar />

      <Zoom>
        <div className="reusable-card zindex-card">
          <Keys />
        </div>
        <div className="reusable-card-secondary">
          <WebHooks />
        </div>
        <div className="reusable-card-secondary">
          <ChromeUsers />
        </div>
      </Zoom>
     {/*  <div className="waves-container-Account">
        <Waves id="wave1" amplitude={80} speed={0.3} />
        <Waves id="wave2" amplitude={90} speed={0.2} />
      </div> */}
    </div>
  );
};

export default SettingsTwitter;
