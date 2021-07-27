import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import Waves from "../../../Animations/Waves/waves";
import {
  setWebHook,
  toggleWebHookButtons,
  setBGAnimation,
  deleteChromeUserDiscord,
  selectChromeProfile,
  unSelectChromeProfile,
} from "../../../Redux/Actions/actionCreator";

import CreateProfileModal from "./createProfileModal/createProfileModal";
import "./settings.css";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import handleWebHook from "../../../Utils/handleWebhook";

var jwt = require("jsonwebtoken");
const Settings = () => {
  const [hook, setHook] = useState("");
  const dispatch = useDispatch();
  const [showCreateProfileModal, setShowCreateProfileModal] = useState(false);

  const { chromeUsersDiscord, webHookToggles, backgroundAnimations, user } =
    useSelector((state) => state);

  let decoded = jwt.verify(
    user ||
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc2NjMwNzYxMTY4MjUzNzQ4MyIsInVzZXJuYW1lIjoiR2F1cnZlbmRyYSIsImF2YXRhciI6Imh0dHBzOi8vY2RuLmRpc2NvcmRhcHAuY29tL2F2YXRhcnMvNzY2MzA3NjExNjgyNTM3NDgzLzYyZWNiYzJkMWJjNThmNTNhZDA5ZTU5YmEyMzRkODI0LnBuZyIsImRpc2NyaW1pbmF0b3IiOiIzMDIzIiwicHVibGljX2ZsYWdzIjowLCJmbGFncyI6MCwiYmFubmVyIjpudWxsLCJiYW5uZXJfY29sb3IiOm51bGwsImFjY2VudF9jb2xvciI6bnVsbCwibG9jYWxlIjoiZW4tVVMiLCJtZmFfZW5hYmxlZCI6ZmFsc2UsInByZW1pdW1fdHlwZSI6MiwiZW1haWwiOiJnYXVydmVuZHJhMTkwNzIwMDFuQGdtYWlsLmNvbSIsInZlcmlmaWVkIjp0cnVlLCJqb2luZWRfYXQiOiIyMDIxLTAxLTIyVDE3OjEwOjUzLjM3NTAwMCswMDowMCIsInJvbGVzIjpbIkFkbWluIl0sImlhdCI6MTYyNjk3NTI1M30.Uds1-YMkVoz5_J-kqOOpeRWWhnSy_k3FNjsH2bXljlI",
    "123Jwt"
  );

  const d = decoded.joined_at.split("-");
  let month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handleSelectUser = (id, name) => {
    console.log(id);
    if (document.getElementById(`userProfileChecbox${id}`).checked)
      dispatch(selectChromeProfile(name));
    
  };

  return (
    <>
      <Container
        fluid
        style={{
          backgroundColor: "#4f4653",
          paddingTop: "20px",
          color: "white",
          position: "absolute",
          top: "9%",
          left: "5.3%",
          paddingRight: "120px",
          paddingLeft: "20px",
        }}
      >
        <Row>
          <Col>
            {" "}
            <Row>
              <Col style={{ margin: "10px" }}>
                <Card
                  style={{
                    borderRadius: "10px",
                    backgroundColor: "#39303d",
                    textAlign: "Right",
                    height: "150px",
                    padding: "10px",
                  }}
                >
                  <Card.Body>
                    <img
                      src={decoded.avatar}
                      style={{
                        width: "30%",
                        float: "left",
                        borderRadius: "20px",
                      }}
                      alt="abc"
                    />
                    <Card.Title data-testid="user">
                      Welcome
                      <br /> {`${decoded.username}`}
                      <br />
                      {`#${decoded.discriminator}`}
                    </Card.Title>

                    <Card.Text>
                      <p>
                        User {month[parseInt(d[1]) - 1]} {d[0]}
                      </p>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>

              <Col style={{ margin: "10px" }}>
                <Card
                  style={{
                    borderRadius: "10px",
                    backgroundColor: "#39303d",
                    height: "150px",
                    textAlign: "left",
                    fontSize: "12px",
                  }}
                >
                  <Card.Body style={{ paddingTop: "10px" }}>
                    <Card.Title style={{ color: "grey" }}>
                      Member Type
                    </Card.Title>

                    <Card.Text style={{ color: "red" }}>CRYSTYL BETA</Card.Text>
                    <Card.Title style={{ color: "grey" }}>
                      Expire Date
                    </Card.Title>

                    <Card.Text style={{ color: "red" }}>AFTER BETA</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col style={{ margin: "10px" }}>
                <Card
                  style={{
                    borderRadius: "10px",
                    backgroundColor: "#39303d",
                    height: "280px",
                    textAlign: "left",
                    padding: "10px",
                    zIndex: "200",
                  }}
                >
                  <Card.Body>
                    <Card.Title>Webhook</Card.Title>
                    <Form>
                      <Form.Control
                        type="text"
                        value={hook}
                        placeholder="Enter Webhook"
                        data-testid="webhookField"
                        onChange={(event) => setHook(event.target.value)}
                        className="field"
                        required
                        id="webhook_discord"
                        style={{
                          backgroundColor: "inherit",
                          marginLeft: "0px",
                        }}
                      />
                      <br />
                      <Form.Check
                        type="switch"
                        label="Link Opener"
                        id="custom-switch1"
                        data-testid="webhookswitch0"
                        checked={webHookToggles[0]}
                        onClick={() => dispatch(toggleWebHookButtons(0))}
                      />

                      <Form.Check
                        type="switch"
                        label="Invite Joiner"
                        id="custom-switch2"
                        data-testid="webhookswitch1"
                        checked={webHookToggles[1]}
                        onClick={() => dispatch(toggleWebHookButtons(1))}
                      />

                      <Form.Check
                        type="switch"
                        label="Log On/Off"
                        id="custom-switch3"
                        checked={webHookToggles[2]}
                        data-testid="webhookswitch2"
                        onClick={() => dispatch(toggleWebHookButtons(2))}
                      />
                      <Button
                        variant="success"
                        data-testid="webhookButton"
                        style={{
                          width: "80px",
                          height: "40px",
                          float: "right",
                          fontSize: "18px",
                          backgroundColor: "#34bd6b",
                        }}
                        onClick={(event) => {
                          if (!hook) {
                            toast.error("Webhook can't be empty!");
                          } else {
                            dispatch(setWebHook(hook));
                            handleWebHook(hook);
                          }
                        }}
                      >
                        {" "}
                        Test{" "}
                      </Button>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col style={{ margin: "10px" }}>
                <Card
                  style={{
                    borderRadius: "10px",
                    backgroundColor: "#39303d",
                    textAlign: "Left",
                    height: "100px",
                    paddingBottom: "2px",
                    zIndex: "4000",
                  }}
                >
                  <Card.Body>
                    {" "}
                    <Card.Title>System Toggle</Card.Title>
                    <Form.Check
                      type="switch"
                      label="Background animation"
                      id="custom-switch4"
                      defaultChecked={backgroundAnimations}
                      data-testid="animation"
                      onClick={() => dispatch(setBGAnimation())}
                    />
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
          <Col style={{ margin: "10px" }}>
            <Card
              style={{
                borderRadius: "10px",
                backgroundColor: "#39303d",
                textAlign: "Left",
                height: "auto",
                padding: "10px",
              }}
            >
              <Card.Body>
                {" "}
                <Card.Title>
                  <span style={{ fontSize: "16px" }}>Chrome Users</span>
                  <button
                    style={{
                      float: "right",
                      margin: "0px",
                      paddingBottom: "2px",
                      fontSize:'20px'
                    }}
                    className="add-button-plus-discord"
                    onClick={() => setShowCreateProfileModal(true)}
                  >
                    +
                  </button>
                </Card.Title>
                <br />
                <Card.Text className="over" style={{ height: "450px" }}>
                  {chromeUsersDiscord.map((user, index) => {
                    return (
                      <div key={index} className="table-row">
                        <img
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyVbE0fVbWucUP7upnL0I6buj-AsjnoYosUNHO5irR_kNd_NNgm_J8ZPlnygslP1bB8UQ&usqp=CAU"
                          alt="userImg"
                        />
                        <span>{user.name}</span>
                        <input
                          style={{ height: "20px", width: "20px" }}
                          type="checkbox"
                          id={`userProfileChecbox${user.id}`}
                          onClick={() => handleSelectUser(user.id, user.name)}
                        />
                        <Button
                          variant="danger"
                          style={{
                            height: "5px",
                            width: "23px",
                            marginBottom: "10px",
                            fontSize: "10px",
                            paddingBottom: "18px",
                            paddingLeft: "8px",
                          }}
                          onClick={() => {
                            return dispatch(deleteChromeUserDiscord(user.id));
                          }}
                        >
                          X
                        </Button>
                      </div>
                    );
                  })}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        {showCreateProfileModal && (
          <CreateProfileModal showModal={setShowCreateProfileModal} />
        )}
      </Container>

      <div className="waves-container-LO">
        <Waves id="wave1" amplitude={80} speed={0.3} />
        <Waves id="wave2" amplitude={90} speed={0.2} />
      </div>
    </>
  );
};
export default Settings;
