import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  saveWebhook,
  removeWebhook,
} from "../../../../Redux/Actions/actionCreator";
import "./webhooks.css";
const WebHooks = () => {
  const dispatch = useDispatch();
  const [webHook, setWebHook] = useState({
    url: "",
    name: "",
  });
  const hooks = useSelector((state) => state.webHooks);
  const handleChangeInput = (value, valueType) => {
    if (valueType === "name") setWebHook({ ...webHook, name: value });
    else if (valueType === "url") setWebHook({ ...webHook, url: value });
  };
  const submitHandler = () => {
    if (webHook.url === "" || webHook.name === "") {
      toast("Enter required field for webhook please!");
    } else {
      dispatch(saveWebhook(webHook));
      setWebHook({ ...webHook, url: "", name: "" });
    }
  };
  return (
    <div className="common-container">
      <label className="main-label">Webhooks</label>
      <input
        data-testid="field0"
        type="text"
        className=" input-field"
        style={{ paddingLeft: "20px" }}
        id="reusable-secondary"
        value={webHook.name}
        onChange={(e) => handleChangeInput(e.target.value, "name")}
        placeholder="Enter Webhook Name"
      />
      <input
        data-testid="field1"
        type="text"
        className="input-field"
        id="reusable-secondary"
        style={{ paddingLeft: "20px" }}
        value={webHook.url}
        onChange={(e) => handleChangeInput(e.target.value, "url")}
        placeholder="Enter Webhook URL"
      />
      <button type="button" className="btn-blue" id="reusable-secondary">
        <i
          style={{
            position: "relative",
            padding: "2px ",
            marginLeft: "3px",
            marginRight: "4px",
            top: "2px",
          }}
          className="fa fa-save"
          data-testid="button0"
          onClick={submitHandler}
        ></i>
        Save Webhook
      </button>
      <div className="webhook-list-container">
        {hooks.map((item, i) => (
          <div className="row-webhook" key={i}>
            <h4 style={{ color: "#fff" }}>{item.name}</h4>
            <button
              className="delete"
              onClick={() => dispatch(removeWebhook(i))}
            >
              X
            </button>
          </div>
        ))}
      </div>
      <div className="test-container">
        <button className="btn-webhook" id="test">
          Test Webhook
        </button>
        <button className="btn-webhook" id="download">
          <i
            style={{
              position: "relative",
              padding: "2px ",
              marginLeft: "3px",
              marginRight: "2px",
              top: "2px",
            }}
            className="fa fa-download"
          ></i>
          Download
        </button>
      </div>
    </div>
  );
};

export default WebHooks;
