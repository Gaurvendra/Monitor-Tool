import React, { useState } from "react";
import "./linkOpenerJoiner.css";
import {
  keywordTwitter,
  deleteKeywordTwitter,
  toggleJoinerMode,
  toggleOpenerMode,
} from "./../../../../../Redux/Actions/actionCreator";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const LinkOpenerJoiner = () => {
  const [keyword, setKeyword] = useState("");
  const [linkToggle, setLinkToggle] = useState("Start");
  const [inviteToggle, setInviteToggle] = useState("Start");
  const [inviteColor, setInviteColor] = useState("#1e3799");
  const [linkColor, setLinkColor] = useState("#1e3799");

  const dispatch = useDispatch();
  const keywords = useSelector((state) => state.keywords_twitter);

  const handleSubmit = () => {
    if (keyword !== "") {
      dispatch(keywordTwitter(keyword));
      setKeyword("");
    } else {
      toast("Enter Keyword please!");
    }
  };
  const handleLink = () => {
    if (linkToggle === "Start") {
      setLinkToggle("Stop");
      setLinkColor("red");
    } else {
      setLinkToggle("Start");
      setLinkColor("#1e3799");
    }
    dispatch(toggleJoinerMode());
  };
  const handleInvite = () => {
    if (inviteToggle === "Start") {
      setInviteToggle("Stop");
      setInviteColor("red");
    } else {
      setInviteToggle("Start");
      setInviteColor("#1e3799");
    }
    dispatch(toggleOpenerMode());
  };
  return (
    <div className="common-container">
      <label className="main-label">Auto Link Opener/Joiner</label>
      <div class="form-group ">
        <input
          data-testid="field0"
          type="text"
          className="form-control input-field"
          style={{ paddingLeft: "20px", border: "none", backgroundColor:'var(--third)' }}
          id="usr"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Enter Keywords"
        />
        <button
          data-testid="button0"
          type="button"
          className="btn-save"
          onClick={handleSubmit}
        >
          Save Keywords
        </button>
        <button
          type="button"
          className="btn-start"
          style={{ backgroundColor: `${linkColor}` }}
          onClick={handleLink}
        >
          {linkToggle} Auto Link Opener
        </button>
        <button
          type="button"
          className="btn-start"
          style={{ backgroundColor: `${inviteColor}` }}
          onClick={handleInvite}
        >
          {inviteToggle} Auto Joiner
        </button>
      </div>
    {keywords.length > 0 ? ( <div className="keyword-list">
        {keywords.map((item, i) => (
          <div className="row-container-user" key={i}>
            <h4 className="keyword">{item}</h4>
            <button
              className="delete"
              onClick={() => dispatch(deleteKeywordTwitter(i))}
            >
              X
            </button>
          </div>
        ))}
      </div>):""}
     
    </div>
  );
};

export default LinkOpenerJoiner;
