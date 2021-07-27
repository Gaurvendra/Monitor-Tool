import React, { useState } from "react";
import "./inviteJoiner.css";
import Waves from "../../../Animations/Waves/waves";
import Logs from "../Logs/logs";
import LogsModal from "../Logs/LogsModal/logsModal";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleSafeMode,
  setDelay,
  addChannelIdListInviteJoiner,
  removeChannelIdFromListInviteJoiner,
  toggleInviteJoiner,
  selectMonitorIJ,
  selectClaimerIJ,
} from "../../../Redux/Actions/actionCreator";

const InviteJoiner = ({ startIJ, setStartIJ }) => {
  const dispatch = useDispatch();
  const { delay, safeMode, channelIdListInviteJoiner, start, webHookToggles } =
    useSelector((state) => state);

  //not storing the selected monitor token and claimer token in the redux store as they are specific to this component only
  //therefore, using reacthooks only
  const {
    monitorTokens,
    selectedMonitorToken_IJ,
    selectedClaimerToken_IJ,
    channelidWithNameIJ,
  } = useSelector((state) => state);

  let chanId = "";
  const handleChannelId = (id) => {
    chanId = id;
  };

  const [viewLogModal, setViewLogModal] = useState(false);

  const getChanName = (id) => {
    for (let i = 0; i < channelidWithNameIJ.length; i++)
      if (channelidWithNameIJ[i].id === id) return channelidWithNameIJ[i].name;
  };

  return (
    <div className="inviteJoiner-wrapper-discord">
      <LogsModal
        viewLogModal={viewLogModal}
        setViewLogModal={setViewLogModal}
      />
      <div className="leftPane-invitejoiner-discord">
        <div>
          <div>
            <span style={{ marginLeft: "12px" }}>Monitor Token</span> <br />
            <select
              data-testid="monitor"
              name="monitorTokens"
              id="monitorTokens"
              onChange={(event) =>
                dispatch(selectMonitorIJ(event.target.value))
              }
            >
              <option value="">
                {selectedMonitorToken_IJ
                  ? monitorTokens.map((token) => {
                      if (token.value === selectedMonitorToken_IJ)
                        return token.name;
                    })
                  : "Select a token"}
              </option>
              {monitorTokens.map((token, i) => (
                <option
                  key={i}
                  value={token.value}
                  data-testid="select-option0"
                >
                  {token.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <span style={{ marginLeft: "10px" }}>Claimer Token </span>
            <br />
            <select
              data-testid="claimer"
              name="claimerTokens"
              id="claimerTokens"
              onChange={(event) =>
                dispatch(selectClaimerIJ(event.target.value))
              }
            >
              <option value="">
                {selectedClaimerToken_IJ
                  ? monitorTokens.map((token) => {
                      if (token.value === selectedClaimerToken_IJ)
                        return token.name;
                    })
                  : "Select a token"}
              </option>
              {monitorTokens.map((token, i) => (
                <option
                  key={i}
                  value={token.value}
                  data-testid="select-option1"
                >
                  {token.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="delay-discord-inviteJoiner">
          <span style={{ marginLeft: "12px", marginBottom: "-10px" }}>
            Delay
          </span>
          <div>
            <input
              type="text"
              placeholder={delay}
              style={{ height: "43px" }}
              data-testid="delay"
              onChange={(event) => dispatch(setDelay(event.target.value))}
            />
            <button //style={{ width: "100px", fontSize: "14px", marginTop:'10px', marginLeft:'18px' }}
              className={`safe-mode-LO toggle-btn-${safeMode}`}
              data-testid="safemode"
              onClick={() => dispatch(toggleSafeMode(safeMode))}
            >
              Safe Mode : {safeMode ? "on" : "off"}
            </button>
          </div>
        </div>

        <div className="row-3-container-discord">
          <div>
            <span>Channel ID(s)</span>
            <div className="channel-container">
              {/* className is same as the channel div in link Opener-- so same css properties are shared*/}
              <form>
                <input
                  type="text"
                  required
                  data-testid="form"
                  onChange={(event) => handleChannelId(event.target.value)}
                />
                <button
                  className="add-button-plus-discord"
                  data-testid="button"
                  onClick={(e) => {
                    e.preventDefault();
                    chanId && dispatch(addChannelIdListInviteJoiner(chanId));
                  }}
                >
                  +
                </button>
              </form>
              <div className="channel-list-container">
                {channelIdListInviteJoiner &&
                  channelIdListInviteJoiner.map((id, i) => (
                    <div className="channel-id-container" key={i}>
                      <span>
                        <center style={{ marginTop: "5px" }}>
                          {" "}
                          {getChanName(id)}
                        </center>
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
                          height: "20px",
                          width: "20px",
                          borderRadius: "2px",
                          backgroundColor: "red",
                          marginBottom: "10px",
                        }}
                        onClick={() =>
                          dispatch(removeChannelIdFromListInviteJoiner(id))
                        }
                      >
                        -
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
        <button
          style={{
            width: "100px",
            fontSize: "15px",
            paddingLeft: "7px",
            position: "absolute",
            left: "44%",
            top: "98%",
          }}
          className={`toggle-inviteJoiner-discord toggle-btn-${startIJ}`}
          data-testid="main"
          onClick={() => {
            if (!webHookToggles[1]) {
              toast.error("Turn on Invite Joiner from Settings first");
              return;
            }
            setStartIJ(!startIJ);
            dispatch(toggleInviteJoiner(!start.inviteJoiner));
          }}
        >
          {startIJ ? "Start" : "Stop"}
        </button>
      </div>

      <div
        style={{
          position: "absolute",
          width: "auto",
          height: "auto",
          right: "7%",
        }}
      >
        <Logs viewLogModal={viewLogModal} setViewLogModal={setViewLogModal} />
      </div>
      <div className="waves-container-LO">
        <Waves id="wave1" amplitude={80} speed={0.3} />
        <Waves id="wave2" amplitude={90} speed={0.2} />
      </div>
    </div>
  );
};
export default InviteJoiner;
