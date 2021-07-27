import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./modal.css";
import { editAccount } from "../../../../Redux/Actions/actionCreator";
import Form from "react-bootstrap/Form";
import { Col, Button, Row } from "react-bootstrap";
const ModalEditAccount = ({ showEditModal, setEditShowModal, editProfile }) => {
  const dispatch = useDispatch();

  const [modalInput, setModalInput] = useState({
    name: "",
    value: "",
    type: "",
    id: "",
  });
  const { name, type, value, id } = editProfile;
  useEffect(() => {
    setModalInput({ ...modalInput, name, value, type, id });
  }, [editProfile]);

  if (!showEditModal) return <></>;

  const handleInput = (value, valueType) => {
    if (valueType === "profileName")
      setModalInput({ ...modalInput, name: value });
    else if (valueType === "type")
      setModalInput({ ...modalInput, type: value });
    else setModalInput({ ...modalInput, value: value });
  };
  const handleEditSubmit = () => {
    dispatch(
      editAccount(
        modalInput.name,
        modalInput.type,
        modalInput.value,
        modalInput.id
      )
    );
    setEditShowModal(false);
  };

  return (
    <div className="modal display-yes">
      <section className="modal-main">
        <div className="innerContainerModal">
          <Form>
            <h2>Edit Profile</h2>
            <Row>
              <Col lg={6}>
                <Form.Group controlId="formGridEmail">
                  <Form.Label>Profile Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={modalInput.name}
                    onChange={(event) =>
                      handleInput(event.target.value, "profileName")
                    }
                    className="field"
                    required
                  />
                </Form.Group>
              </Col>
              <Col lg={6}>
                <Form.Group controlId="formGridState">
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    as="select"
                    value={modalInput.type}
                    required
                    name="typeOfAccount"
                    id="typeOfAccount"
                    onChange={(event) =>
                      handleInput(event.target.value, "type")
                    }
                    className="field"
                  >
                    <option disabled>Choose...</option>
                    <option value="discord">Discord</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="formGridAddress1">
                  <Form.Label>Token</Form.Label>
                  <Form.Control
                    type="text"
                    value={modalInput.value}
                    onChange={(event) =>
                      handleInput(event.target.value, "token")
                    }
                    className="field"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </div>
        <Row style={{ justifyContent: "center" }}>
          <div style={{ float: "right" }}>
            <Col>
              <Button
                style={{
                  margin: "0 30px 18px 0",
                }}
                onClick={() => handleEditSubmit()}
              >
                {" "}
                Submit{" "}
              </Button>

              <Button
                style={{
                  margin: "0 30px 18px 0",
                }}
                onClick={() => setEditShowModal(false)}
              >
                Cancel
              </Button>
            </Col>
          </div>
        </Row>
      </section>
    </div>
  );
};
export default ModalEditAccount;
