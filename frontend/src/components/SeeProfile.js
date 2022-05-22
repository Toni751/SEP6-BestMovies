import React, { useContext } from "react";
import { AuthContext } from "../auth/AuthProvider";
import "../styles/SeeProfile.css";
import { useNavigate } from "react-router-dom";

const SeeProfile = () => {
  const auth = useContext(AuthContext);
  const username = "@" + auth.user.username;
  const email = auth.user.email;
  const navigate = useNavigate();

  const goToSignOut = () => {
    auth.signOut();
    navigate("/");
  };

  const deleteAccount = () => {
    auth.deleteAccount();
  };

  return (
    <div className="seeprofile_div">
      <p className="subheader inter_medium" id="seeprofile_username">
        {username}
      </p>
      <div className="separated_div">
        <div className="individual_div" id="right_border">
          <p>
            Email: <span className="inter_light">{email}</span>
          </p>
          <p
            className="inter_medium"
            id="delete_account"
            onClick={() => deleteAccount()}
          >
            Delete account
          </p>
          <p className="links" onClick={() => goToSignOut()}>
            Sign out
          </p>
        </div>
        <div className="individual_div">
          <p className="inter_bold">Do you have any inquiries?</p>
          <p>Send us feedback at: 293121@via.dk</p>
        </div>
      </div>
    </div>
  );
};

export default SeeProfile;
