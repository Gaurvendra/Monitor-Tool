import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createChromeUserDiscord } from "../../../../Redux/Actions/actionCreator";
import "./createProfile.css";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateProfileModal = ({ showModal }) => {
  const dispatch = useDispatch();
  const [profileName, setProfileName] = useState("");
  const handleCreateUser = () => {
    if (!profileName) {
      toast.error("Profile name can't be empty");
      return;
    }

    dispatch(createChromeUserDiscord(profileName));
    showModal(false);
  };
  return (
    <div className="modal-container">
      <Form>
        <h2>Create Profile</h2>
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>Enter Profile Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Name"
              className="field"
              data-testid="modalfield"
              onChange={(event) => setProfileName(event.target.value)}
              required
              style={{ marginLeft: "0px" }}
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          {" "}
          <Button
            className="create-profile-btn"
            style={{ backgroundColor: "#2b4591" }}
            data-testid="modalbutton"
            onClick={() => handleCreateUser()}
          >
            Add
          </Button>
          <Button
            className="create-profile-btn"
            style={{ backgroundColor: "#dc3545" }}
            onClick={() => showModal(false)}
          >
            Cancel
          </Button>
        </Form.Row>
      </Form>
    </div>
  );
};

export default CreateProfileModal;
