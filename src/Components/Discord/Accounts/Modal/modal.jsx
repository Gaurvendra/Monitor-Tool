// modal to create and edit account info
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./modal.css";
import { createAccount } from "../../../../Redux/Actions/actionCreator";

import Form from "react-bootstrap/Form";
import { Col, Button } from "react-bootstrap";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Modal = ({ showModal, setShowModal }) => {
  let initialInput = {
    profileName: "",
    type: "",
    token: "",
  };
  const [modalInput, setModalInput] = useState(initialInput);
  const dispatch = useDispatch();

  if (!showModal) return <></>;

  const handleInput = (value, valueType) => {
    if (valueType === "profileName")
      setModalInput({ ...modalInput, profileName: value });
    else if (valueType === "type")
      setModalInput({ ...modalInput, type: value });
    else setModalInput({ ...modalInput, token: value });
  };

  const handleCreate = ({ profileName, type, token }) => {
    if (!profileName || !token) {
      toast.error("Input fields can't be empty!");
      return;
    }
    dispatch(createAccount(profileName, type, token));
    setShowModal(false);
  };

  return (
    <div className="modal display-yes">
      <section className="modal-main">
        <div className="innerContainerModal">
          <Form>
            <h2>Create Profile</h2>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Profile Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  onChange={(event) =>
                    handleInput(event.target.value, "profileName")
                  }
                  data-testid="field0"
                  className="field"
                  required="true"
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>State</Form.Label>
                <Form.Control
                  as="select"
                  required="true"
                  name="typeOfAccount"
                  id="typeOfAccount"
                  data-testid="field1"
                  onChange={(event) => handleInput(event.target.value, "type")}
                  className="field"
                >
                  <option disabled selected>
                    Select
                  </option>
                  <option value="discord">Discord</option>
                </Form.Control>
              </Form.Group>
            </Form.Row>

            <Form.Group controlId="formGridAddress1">
              <Form.Label>Token</Form.Label>
              <Form.Control
                placeholder="Token"
                type="text"
                onChange={(event) => handleInput(event.target.value, "token")}
                className="field"
                required="true"
                data-testid="field2"
              />
            </Form.Group>
          </Form>
        </div>

        <div className="create-profile-modal-btns-div">
          <Button
            onClick={() => handleCreate(modalInput)}
            data-testid="button0"
          >
            {" "}
            Create{" "}
          </Button>
          <Button
            onClick={() => setShowModal(false)}
            style={{ backgroundColor: "rgb(220, 53, 69)", border: "none" }}
          >
            {" "}
            Cancel{" "}
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Modal;
