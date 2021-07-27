import "./profileDropDown.css";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../Redux/Actions/actionCreator";
import React, { useState } from "react";
import { showUserProfile } from "../../Redux/Actions/actionCreator";
const FontAwesome = require("react-fontawesome");

var jwt = require("jsonwebtoken");
const { ipcRenderer } = window.require("electron");
const ProfileDropDown = () => {
  const { user, showUserProfileModal } = useSelector((state) => state);
  const [visible, setVisble] = useState(false);
  const dispatch = useDispatch();
  let decoded = jwt.verify(user, "123Jwt");

  const handleIt = () => {
    ipcRenderer.send("logout");

    dispatch(logoutUser());
  };
  const handleModal = () => {
    dispatch(showUserProfile(!showUserProfileModal));
  };

  return (
    <div className="dropdown">
      <div
        className="dropbtn"
        onClick={() => {
          setVisble(visible ? false : true);
        }}
      >
        <img src={decoded.avatar} alt="userImg" />
        <span>{decoded.username}</span>
        <FontAwesome
          className="fas fa-chevron-circle-down"
          name="chevron-circle-down"
        />
      </div>
      {visible ? (
        <div className="dropdown-content">
          <button
            style={{ backgroundColor: "#2b4591" }}
            onClick={() => handleModal()}
          >
            Profile
          </button>

          <button
            style={{ backgroundColor: "#c82333" }}
            onClick={() => handleIt()}
          >
            Logout
          </button>
        </div>
      ) : null}
    </div>
  );
};
export default ProfileDropDown;
