import React from "react";
import "./App.css";
import Sidebar from "./Components/SideBar/sidebar";
import NavBarDiscord from "./Components/Discord/NavBar-Discord/navBarDiscord";

import TwitterDashboard from "./Components/Twitter/Dashboard";
import TwitterSettings from "./Components/Twitter/Settings/SettingsTwitter";

import Login from "./Components/Login/login";
import Waves from "./Animations/Waves/waves";

import { useSelector, useDispatch } from "react-redux";
import { Route } from "react-router-dom";
import Footer from "./Components/Footer/Footer";
import { loginUser } from "./Redux/Actions/actionCreator";
import { ToastContainer } from "react-toastify";

const { ipcRenderer } = window.require("electron");

function App() {
  const { user } = useSelector((state) => state);
  const dispatch = useDispatch();

  if (user == null) {
    ipcRenderer.invoke("get-user").then((val) => {
      console.log(val);
      if (val != null) {
        dispatch(loginUser(val));
      }
    });
  }
  if (user == null) {
    return (
      <div className="App">
        <ToastContainer />
        <Route exact path="/" component={Login} />
      </div>
    );
  }

  return (
    <div className="App">
      <Sidebar />
      <ToastContainer />

      <Route exact path="/twitter" component={TwitterDashboard} />
      <Route exact path="/" component={NavBarDiscord} />
      <Route exact path="/settings" component={TwitterSettings} />

      <Footer />

     
    </div>
  );
}

export default App;
