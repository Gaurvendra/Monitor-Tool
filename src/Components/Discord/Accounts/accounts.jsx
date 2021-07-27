import React, { useEffect, useState } from "react";
import "./accounts.css";
import discord from "../../../Assets/Icons/discord.png";
import edit from "../../../Assets/Icons/edit.png";
import trash from "../../../Assets/Icons/trash.png";
import { useSelector, useDispatch } from "react-redux";
import { deleteAccount } from "../../../Redux/Actions/actionCreator";
import Modal from "./Modal/modal";
import ModalEditAccount from "./Modal/modalEditAccount";
import Waves from "../../../Animations/Waves/waves";

const Accounts = () => {
  const dispatch = useDispatch();
  const monitorTokens = useSelector((state) => state.monitorTokens);

  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setEditShowModal] = useState(false);
  const [editProfile, setEditProfile] = useState({
    name: "",
    type: "",
    value: "",
    id: "",
  });

  const handleEditAccount = (name, type, value, id) => {
    setEditProfile({ ...editProfile, name, type, value, id });
    setEditShowModal(true);
  };
  const [accountList, setAccountList] = useState("");

  const showAccounts = () => (
    <tbody>
      {monitorTokens.map((token) => (
        <>
          <tr
            key={token.value + token.name}
            style={{
              backgroundColor: "#39303d",
            }}
          >
            <td> {token.name}</td>
            <td>
              <img src={discord} alt={token.type} />
            </td>
            <td> {token.value}</td>
            <td>
              <img
                src={edit}
                alt=""
                onClick={() =>
                  handleEditAccount(
                    token.name,
                    token.type,
                    token.value,
                    token.id
                  )
                }
              />
              {"\u00A0 \u00A0"} {/** adds space */}
              <img
                src={trash}
                alt=""
                onClick={() => {
                  dispatch(deleteAccount(token.id));
                }}
              />
            </td>
          </tr>
          <div
            style={{ height: "20px", backgroundColor: "var(--second)" }}
          ></div>
        </>
      ))}
    </tbody>
  );

  // useEffect runs when there is any change(add/edit/remove) in the monitorToken list-- so it executes the showAccount function
  useEffect(() => {
    setAccountList(showAccounts());
  }, [monitorTokens]);
  return (
    <div className="discordAccount">
      <div>
        <button
          className="main-button"
          onClick={() => setShowModal(true)}
          style={{
            float: "right",
            backgroundColor: "#2b4591",
            width: "100px",
            marginRight: "160px",
          }}
        >
          Create
        </button>
      </div>
      <Modal showModal={showModal} setShowModal={setShowModal} />
      <ModalEditAccount
        showEditModal={showEditModal}
        setEditShowModal={setEditShowModal}
        editProfile={editProfile}
      />
      <table className="tablemain">
        <tbody>
          <tr style={{ boxShadow: "none" }}>
            <td style={{ boxShadow: "none" }}>Name</td>
            <td style={{ boxShadow: "none" }}>Type</td>
            <td style={{ boxShadow: "none" }}>Value</td>
            <td style={{ boxShadow: "none" }}>Actions</td>
          </tr>
        </tbody>
        {accountList}
      </table>

      <div className="waves-container-Account">
        <Waves id="wave1" amplitude={80} speed={0.3} />
        <Waves id="wave2" amplitude={90} speed={0.2} />
      </div>
    </div>
  );
};
export default Accounts;
