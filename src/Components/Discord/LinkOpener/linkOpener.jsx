import React, { useState } from "react";
import "./linkOpener.css";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";

import {
  toggleSafeMode,
  addChannelIdLinkOpener,
  removeChannelIdFromListLinkOpener,
  keywordDiscord,
  setDelay,
  handleCheckbox,
  toggleURLAppender,
  selectMonitorLO,
} from "../../../Redux/Actions/actionCreator";

import Waves from "../../../Animations/Waves/waves";
import Logs from "../Logs/logs";
import LogsModal from "../Logs/LogsModal/logsModal";

const LinkOpener = ({ handleStartLO, startLO, setStartLO }) => {
  const dispatch = useDispatch();
  const {
    delay,
    safeMode,
    keywords_discord,
    channelidWithNameLO,
    urlAppenderEnable,
    channelIdListLinkOpener,
  } = useSelector((state) => state);

  const { monitorTokens, selectedMonitorToken_LO, webHookToggles } =
    useSelector((state) => state);

  //setting the default value of monitorToken to the first element in the monitorToken array(if it exists), otherwise null

  const [channelID, setChannelID] = useState("");
  let keyword = "";
  const handleKeyword = (keyw) => {
    keyword = keyw;
  };

  const [viewLogModal, setViewLogModal] = useState(false);

  //fetches channel name from id
  const getChanName = (id) => {
    for (let i = 0; i < channelidWithNameLO.length; i++)
      if (channelidWithNameLO[i].id === id) return channelidWithNameLO[i].name;
  };
  return (
    <div className="linkOpener-wrapper-discord">
      <LogsModal
        viewLogModal={viewLogModal}
        setViewLogModal={setViewLogModal}
      />
      <div className="left-pane-linkOpener">
        {/**left */}
        <div className="row-1-container-discord">
          <div className="row-1-discord">
            {"\u00A0"}
            {"\u00A0"}
            {"\u00A0"}Monitor Token
            <select
              name=""
              id=""
              data-testid="monitor"
              style={{ width: "240px", height: "40px", marginTop: "10px" }}
              onChange={(event) =>
                dispatch(selectMonitorLO(event.target.value))
              }
            >
              <option value="">
                {selectedMonitorToken_LO
                  ? monitorTokens.map((token) => {
                      if (token.value === selectedMonitorToken_LO)
                        return token.name;
                    })
                  : "Select a token"}
              </option>
              {monitorTokens.map((token) => (
                <option
                  key={token.value}
                  value={token.value}
                  data-testid="select-option0"
                  style={{ color: "white", fontSize: "15px" }}
                >
                  {token.name}
                </option>
              ))}
            </select>
          </div>
          <div className="row-1-discord">
            {"\u00A0"}Delay
            <input
              style={{ width: "120px", height: "40px" }}
              type="text"
              data-testid="delay"
              placeholder={delay}
              onChange={(event) => dispatch(setDelay(event.target.value))}
            />
          </div>
          <div className="row-1-discord">
            <span style={{ color: "transparent" }}>Delay</span>
            <button
              data-testid="safemode"
              className={`safe-mode-LO toggle-btn-${safeMode}`}
              //onClick = {()=>setSafeMode(!safeMode)}
              onClick={() => dispatch(toggleSafeMode(safeMode))}
            >
              Safe Mode : {safeMode ? "on" : "off"}
            </button>
          </div>
          <div className="row-1-discord crystyl-tools">
            <span style={{ fontSize: "16px", color: "#dcdde3" }}>
              Crystyl Tools
            </span>
            <label htmlFor="">
              Ignore Twitter Link
              <input
                style={{ marginLeft: "23px" }}
                type="checkbox"
                data-testid="twitter"
                onClick={() => dispatch(handleCheckbox("twitter"))}
              />
            </label>
            <label htmlFor="">
              Ignore Discord Invite
              <input
                type="checkbox"
                data-testid="invite"
                onClick={() => dispatch(handleCheckbox("invite"))}
              />
            </label>
            <label htmlFor="">
              Play Sound
              <input
                data-testid="sound"
                style={{ marginLeft: "66px" }}
                type="checkbox"
                onClick={() => dispatch(handleCheckbox("sound"))}
              />
            </label>
          </div>
        </div>

        <div className="row-2-container-discord">
          <form>
            <label htmlFor="">
              {"\u00A0"}
              {"\u00A0"}
              {"\u00A0"}
              URL Appender
              <br />
              <input
                type="text"
                data-testid="urlform"
                required
                style={{ marginBottom: "0" }}
              />
            </label>
            <button
              style={{ width: "95px", fontSize: "14px", height: "40px" }}
              data-testid="urlbutton"
              className={`toggle-btn-${!urlAppenderEnable}`}
              onClick={() => dispatch(toggleURLAppender())}
            >
              {!urlAppenderEnable ? "Enable" : "Disable"}
            </button>
          </form>
        </div>

        <div className="row-3-container-discord">
          {"\u00A0"}
          {"\u00A0"}
          <div>
            <span>Channel ID(s)</span>
            <div className="channel-container">
              <form>
                <input
                  type="text"
                  style={{ paddingLeft: "20px" }}
                  required
                  data-testid="form"
                  onChange={(event) => {
                    event.preventDefault();
                    setChannelID(event.target.value);
                  }}
                />
                <button
                  className="add-button-plus-discord"
                  data-testid="button"
                  onClick={(e) => {
                    e.preventDefault();
                    channelID && dispatch(addChannelIdLinkOpener(channelID));
                  }}
                >
                  {" "}
                  +{" "}
                </button>
              </form>
              <div className="channel-list-container">
                {channelIdListLinkOpener &&
                  channelIdListLinkOpener.map((id, i) => (
                    <div className="channel-id-container" key={i}>
                      <span>
                        <center> {getChanName(id)}</center>

                        <center
                          style={{ color: "lightgrey", marginTop: "2px" }}
                        >
                          {id}
                        </center>
                        {"\u00A0"}
                        {"\u00A0"}
                      </span>
                      <button
                        style={{
                          height: "15px",
                          width: "15px",
                          borderRadius: "2px",
                          backgroundColor: "red",
                          marginBottom: "3px",
                          fontSize: "8px",
                        }}
                        onClick={() =>
                          dispatch(removeChannelIdFromListLinkOpener(id))
                        }
                      >
                        X
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <div>
            <span>Keywords</span>
            <div className="channel-container">
              <form action="">
                <input
                  style={{ paddingLeft: "20px" }}
                  type="text"
                  data-testid="form1"
                  required
                  onChange={(e) => {
                    e.preventDefault();
                    handleKeyword(e.target.value);
                  }}
                />
                <button
                  className="add-button-plus-discord"
                  data-testid="button1"
                  onClick={(e) => {
                    e.preventDefault();
                    keyword && dispatch(keywordDiscord(true, keyword));
                  }}
                >
                  +
                </button>
              </form>
              <div className="channel-list-container">
                {keywords_discord &&
                  keywords_discord.map((keyw, i) => (
                    <div
                      style={{
                        display: "flex",
                        height: "20px",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "5px",
                        padding: "0 20px",
                      }}
                      key={i}
                    >
                      <span style={{ color: "greenyellow" }}> {keyw}</span>
                      {/*right now- it doesn't show the channel name from ID*/}
                      <button
                        onClick={() => {
                          dispatch(keywordDiscord(false, keyw));
                        }}
                        style={{
                          height: "15px",
                          width: "15px",
                          borderRadius: "2px",
                          backgroundColor: "red",
                          marginBottom: "3px",
                          fontSize: "8px",
                        }}
                      >
                        X
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
        <button
          style={{
            marginLeft: "79%",
            width: "95px",
            fontSize: "15px",
            paddingLeft: "8px",
          }}
          data-testid="main"
          className={`toggle-linkopener-discord toggle-btn-${startLO}`}
          onClick={() => {
            if (!webHookToggles[0]) {
              toast.error("Turn on Link Opener from Settings first");
              return;
            }
            if (!selectedMonitorToken_LO)
              return toast.error("Enter Monitor Token");

            setStartLO(!startLO);
            //toggleLoading(true, "Loading Link Opener 😀");
          }}
        >
          {startLO ? "Start" : "Stop"}
        </button>
      </div>

      {/* right pane*/}
      <Logs viewLogModal={viewLogModal} setViewLogModal={setViewLogModal} />
      <div className="waves-container-LO">
        <Waves id="wave1" amplitude={80} speed={0.3} />
        <Waves id="wave2" amplitude={90} speed={0.2} />
      </div>
    </div>
  );
};
export default LinkOpener;
