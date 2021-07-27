import React, { useState } from "react";
import "./keys.css";
import {
  addKeys,
  addClaimerToken,
} from "../../../../Redux/Actions/actionCreator";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
const Keys = () => {
  const [keys, setKeys] = useState({
    apiKey: "",
    apiSecret: "",
    accessToken: "",
    accessTokenSecret: "",
  });
  const [claimerToken, setClaimerToken] = useState("");
  const dispatch = useDispatch();

  //const keys = useSelector((state) => state.keys);
  //console.log(keys);
  const handleChangeInput = (value, valueType) => {
    if (valueType === "apiKey") setKeys({ ...keys, apiKey: value });
    else if (valueType === "apiSecret") setKeys({ ...keys, apiSecret: value });
    else if (valueType === "accessToken")
      setKeys({ ...keys, accessToken: value });
    else if (valueType === "accessTokenSecret")
      setKeys({ ...keys, accessTokenSecret: value });
    else if (valueType === "claimerToken") setClaimerToken(value);
  };
  const submitHandlerKeys = () => {
    if (
      keys.accessToken === "" ||
      keys.accessTokenSecret === "" ||
      keys.apiKey === "" ||
      keys.apiSecret === ""
    ) {
      toast("Enter Keys !");
    } else {
      dispatch(addKeys(keys));
      setKeys({
        ...keys,
        apiSecret: "",
        apiKey: "",
        accessTokenSecret: "",
        accessToken: "",
      });
      toast("Keys Saved");
    }
  };
  const submitHandlerToken = () => {
    if (claimerToken === "") {
      toast("Enter Claimer token !");
    } else {
      dispatch(addClaimerToken(claimerToken));
      setClaimerToken("");
      toast("Claimer Token Saved");
    }
  };
  return (
    <div className="common-container">
      <label className="main-label">Keys</label>
      <input
        data-testid="field0"
        type="text"
        className=" input-field"
        style={{ paddingLeft: "20px" }}
        id="usr"
        value={keys.apiKey}
        onChange={(e) => handleChangeInput(e.target.value, "apiKey")}
        placeholder="API Key"
      />
      <input
        data-testid="field1"
        type="text"
        className=" input-field"
        style={{ paddingLeft: "20px" }}
        id="usr"
        value={keys.apiSecret}
        onChange={(e) => handleChangeInput(e.target.value, "apiSecret")}
        placeholder="API Secret"
      />
      <input
        data-testid="field2"
        type="text"
        className=" input-field"
        style={{ paddingLeft: "20px" }}
        id="usr"
        value={keys.accessToken}
        onChange={(e) => handleChangeInput(e.target.value, "accessToken")}
        placeholder="Access Token"
      />
      <input
        data-testid="field3"
        type="text"
        className=" input-field"
        id="usr"
        style={{ paddingLeft: "20px" }}
        value={keys.accessTokenSecret}
        onChange={(e) => handleChangeInput(e.target.value, "accessTokenSecret")}
        placeholder="Access Token Secret"
      />
      <button
        data-testid="button0"
        type="button"
        className="btn-save"
        id="import"
        onClick={submitHandlerKeys}
      >
        Import Keys
      </button>
      <input
        data-testid="field4"
        type="text"
        className=" input-field"
        style={{ paddingLeft: "20px" }}
        id="usr"
        placeholder="Claimer Token"
        value={claimerToken}
        onChange={(e) => setClaimerToken(e.target.value)}
      />
      <button
        data-testid="button1"
        type="button"
        className="btn-save"
        id="import"
        onClick={submitHandlerToken}
      >
        Save Token
      </button>
    </div>
  );
};

export default Keys;
