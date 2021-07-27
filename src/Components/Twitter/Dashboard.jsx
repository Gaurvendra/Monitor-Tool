import React from "react";
import Sidebar from "../SideBar/sidebar";

import LinkOpenerJoiner from "./Tweets/Link Opener/Joiner/linkOpenerJoiner";
import AccountAdder from "./Tweets/Add User/addTweets";
import LatestTweets from "./Tweets/Latest Tweets/latestTweets";
import FeaturedTweets from "./Tweets/Featured Tweets/featuredTweets";
import NavbarTwitter from "./NavBar-Twitter/navBarTwitter";
import "./dashboard.css";
import { Zoom } from "react-awesome-reveal";

import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  return (
    <div className="container-twitter-section">
      <NavbarTwitter />
      <Sidebar />
      <Zoom style={{ zIndex: "5000" }}>
        <div className="row-container">
          <div className="autoOpener">
            <LinkOpenerJoiner />
          </div>

          <div className="account">
            <AccountAdder />
          </div>
        </div>
        <div className="reusable-card-secondary">
          <LatestTweets />
        </div>
        <div className="reusable-card-secondary">
          <FeaturedTweets />
        </div>

        {/*   <div className="waves-container-Account">
          <Waves id="wave1" amplitude={80} speed={0.3} />
          <Waves id="wave2" amplitude={90} speed={0.2} />
        </div> */}
      </Zoom>
    </div>
  );
};

export default Dashboard;
