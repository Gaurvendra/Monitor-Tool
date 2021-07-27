import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./navBarTwitter.css";
import "react-dropdown/style.css";
import { useDispatch, useSelector } from "react-redux";
import { toggleswitch, storeTweets } from "../../../Redux/Actions/actionCreator";
import ProfileDropDown from "../../Profile-dropdown/profileDropDown";
import config from "../../../config/config";
const { ipcRenderer } = window.require("electron");

const listLink = [
  { link: "/twitter", title: "Tweets", icon: "fa-twitter-square" },
  { link: "/settings", icon: "fa-cog", title: "Settings" },
];

const NavBarTwitter = () => {
  const dispatch = useDispatch();
  const [viewTwitter, setViewTwitter] = useState(0);

  const [switchMonitor, setSwitchMonitor] = useState("On");
  const [color, setColor] = useState("#1e3799");
  const [icon, setIcon] = useState("on");
  const switchKey = useSelector((state) => state.switch);
  const users = useSelector((state) => state.users_twitter);
  const timing = useSelector((state) => state.timer);


  const handlTweets = () => {
    console.log('Called');
    console.log('running');
    try {
      users.forEach(async (element) => {
        let latestTweet = await ipcRenderer.invoke(
          "fetchTweets",
          config.keys[0].consumer_key,
          config.keys[0].consumer_secret,
          element
          );
        console.log("user = ", element); 
        console.log("handleTweets => latestTweet= ", latestTweet);
        dispatch(storeTweets(latestTweet));
      });
    } catch (e) {
      console.log(e);
    }
  };

  
  const handleSwitch = async() => {
    if (switchMonitor === "On") {
     
      setSwitchMonitor("Off");
      
      setColor("red");
      setIcon("off");
    } else {
      setSwitchMonitor("On");
      setColor("#1e3799");
      setIcon("on");
      
    }
    dispatch(toggleswitch());
  };
  useEffect(()=>{
    if(switchMonitor === 'On'){
      return;
    }else{
    const timer = setInterval(() => handlTweets(), 5000);
    return () => clearTimeout(timer);
    }
  },[switchMonitor])
  

  return (
    <>
      <nav className="navbar-container">
        <ul className="navbar-inner">
          {listLink.map((i, idx) => (
            <Link
              key={idx}
              to={i.link}
              className={`twitter-navbar-items ${
                viewTwitter === idx ? "active" : null
              }`}
              onClick={() => setViewTwitter(idx)}
            >
              <i className={`fa  ${i.icon}`}></i>
              <span>{i.title}</span>
            </Link>
          ))}

          <div className="right-side">
            <button
              className="btn-switch"
              id="twitter-start"
              style={{ backgroundColor: `${color}` }}
              onClick={() => handleSwitch()}
            >
              <i
                style={{
                  position: "relative",
                  padding: "2px ",
                  marginLeft: "3px",
                  marginRight: "2px",
                  color: "white",
                }}
                className={`fa fa-toggle-${icon}`}
              ></i>
              Turn {switchMonitor}
            </button>

            <ProfileDropDown />
          </div>

          <i
            className="fa fa-window-minimize mini1"
            aria-hidden="true"
            onClick={() => ipcRenderer.send("minimize")}
          ></i>
          <i
            className="fa fa-times mini1"
            style={{ fontSize: "25px" }}
            onClick={() => ipcRenderer.send("close")}
          ></i>
        </ul>
      </nav>
    </>
  );
};

export default NavBarTwitter;
