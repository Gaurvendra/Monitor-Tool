import React, { useState, useEffect } from "react";
import "./addTweets.css";
import { useSelector, useDispatch } from "react-redux";
import {
  addUserTwitter,
  deleteUserTwitter,
} from "../../../../Redux/Actions/actionCreator";
import { toast } from "react-toastify";

const AddTweets = () => {
  const [user, setUser] = useState("");
  const [showpop, setShowPO] = useState(false);
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users_twitter);

  const handleSubmit = () => {
    if (user === "") {
      toast("Enter User name please!");
    } else {
      dispatch(addUserTwitter(user));
      setUser("");
    }
  };
  return (
    <div className="common-container">
      <label className="main-label">Add User</label>
      <div className="form-group">
        <div className="row-container-user">
          <input
            type="text"
            style={{ paddingLeft: "20px" }}
            className=" input-field-user"
            id="usr"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            placeholder="Enter Username"
          />
          <div>
            <button
              className="add-button"
              onClick={handleSubmit}
              style={{
                width: "27px",
                height: "30px",
                paddingBottom: "2px",
              }}
            >
              +
            </button>
          </div>
        </div>
      </div>
      {users.length > 0 ? ( <div className="user-list">
        {users.map((item, i) => (
          <div className="row-container-user" key={i}>
            <h4 className="user-name">{item}</h4>
            <button
              className="delete"
              onClick={() => dispatch(deleteUserTwitter(i))}
            >
              X
            </button>
          </div>
        ))}
      </div>):""}
     
    </div>
  );
};

export default AddTweets;
