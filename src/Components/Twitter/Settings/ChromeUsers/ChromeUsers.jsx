import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import {
  saveChromeUser,
  removeChromeUser,
} from "../../../../Redux/Actions/actionCreator";

import "./chromeuser.css";
import { toast } from "react-toastify";
const ChromeUsers = () => {
  const [chromeUser, setChromeUser] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  const users = useSelector((state) => state.chromeUsersTwitter);
  const dispatch = useDispatch();
  const submitHandler = () => {
    if (chromeUser === "") {
      toast("Blank Field cannot be added !");
    } else {
      dispatch(saveChromeUser(chromeUser));
      setChromeUser("");
      setIsOpen(false);
    }
  };

  //Models Settings
  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0,0,0,0.5)",
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      width: "30rem",
      height: " 15rem",
      borderColor: "#39303d",
      background: "#39303d",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  let subtitle;
  const openModal = () => {
    setIsOpen(true);
  };

  const afterOpenModal = () => {
    subtitle.style.color = "#fff";
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="common-container">
      <div className="row-container-chrome">
        <label className="main-label">Chrome Users</label>
        <button
          style={{
            cursor: "pointer",
            width: "23px",
            height: "23px",
            paddingBottom: "3px",
            marginLeft: "200px",
          }}
          className="add-button-secondary"
          onClick={openModal}
        >
          +
        </button>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h2
            style={{ color: "#fff", marginLeft: "10px" }}
            ref={(_subtitle) => (subtitle = _subtitle)}
          >
            Add / Edit Profile Name
          </h2>
          <div style={{ color: "#fff", marginTop: "10px", marginLeft: "10px" }}>
            Enter Profile Name
          </div>
          <form style={{ marginTop: "10px" }}>
            <input
              type="text"
              value={chromeUser}
              onChange={(e) => setChromeUser(e.target.value)}
              style={{
                backgroundColor: "#4f4653",
                width: "94%",
                height: "40px",
                fontSize: "16px",
                color: "#fff",
                paddingLeft: "20px",
              }}
            />
          </form>
          <div
            style={{
              display: "flex",
              alignSelf: "flex-end",
              marginTop: "10px",
            }}
          >
            <button
              style={{ padding: "9px", cursor: "pointer" }}
              onClick={submitHandler}
            >
              Add
            </button>
            <button
              style={{
                padding: "9px",
                backgroundColor: "red",
                cursor: "pointer",
              }}
              onClick={closeModal}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
      {users.length > 0 ? ( <div className="user-list">
        {users.map((item, i) => (
          <div
            style={{ marginTop: "10px" }}
            className="row-container-user"
            key={i}
          >
            <h4>{item}</h4>
            <button
              className="delete"
              onClick={() => dispatch(removeChromeUser(i))}
            >
              X
            </button>
          </div>
        ))}
      </div>):""}
     
    </div>
  );
};

export default ChromeUsers;
