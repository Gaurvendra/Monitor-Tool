import { useSelector, useDispatch } from "react-redux";
import "./userProfileModal.css";
import { showUserProfile } from "../../../Redux/Actions/actionCreator";
var jwt = require("jsonwebtoken");

const UserProfileModal = () => {
  const { showUserProfileModal, user } = useSelector((state) => state);
  const dispatch = useDispatch();

  let decoded = jwt.verify(user, "123Jwt");

  if (!showUserProfileModal) return <></>;
  return (
    <div className="userProfileContainer">
      <div>
        <button onClick={() => dispatch(showUserProfile(false))}> X </button>
      </div>
      <img src={decoded.avatar} alt="userImg" />
      <p
        style={{ fontSize: "30px", fontWeight: "500" }}
      >{`${decoded.username}#${decoded.discriminator}`}</p>
      <p style={{ fontSize: "16px", fontWeight: "400" }}>{decoded.email}</p>
      <p style={{ fontSize: "24px" }}>Roles</p>
      <p style={{ fontSize: "16px", fontWeight: "400", marginLeft: "10px" }}>
        {decoded.roles.map((role) => (
          <div key={role}>{role} &nbsp;</div>
        ))}
      </p>
    </div>
  );
};
export default UserProfileModal;
