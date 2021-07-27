import React from "react";
import logo from "../../Assets/Icons/logo.png";
import discord from "../../Assets/Icons/discord.png";
import Button from "react-bootstrap/Button";

import "./login.css";
import "./../../App.css";
import Waves from "../../Animations/Waves/waves";

const { ipcRenderer } = window.require("electron");
const Login = () => {
  return (
    <>
      <div className="login-container">
        <img className="fa-spinner" style={{height:"60px",width:"80px"}} src={logo} alt="" />
        <h1 style={{ color: "white" }}>Crystyl Mini</h1>

        <Button
          style={{
            backgroundColor: "var(--first)",
            borderColor: "var(--first)",
            marginTop: "30px",

            paddingLeft: "20px ",
            paddingRight: "20px ",
            fontSize: "20px",
          }}
          onClick={() => ipcRenderer.send("auth")}
        >
          <img src={discord} alt="" />
          &nbsp; &nbsp; Login With Discord
        </Button>
        <div className="waves-container">
          <Waves id="wave1" amplitude={80} speed={0.3} />
          <Waves id="wave2" amplitude={90} speed={0.2} />
        </div>
      </div>
    </>
  );
};
export default Login;
