import React, { useState, useContext } from "react";
import { AuthContext } from "../auth/AuthProvider";
import { useNavigate } from "react-router";
import "../styles/Login.css";
import popcorn from "../images/popcorn.png";

const Login = () => {
  const [password, setPassword] = useState("");
  const [userid, setUserid] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    auth.login(userid, password, (isSucess) => {
      if (isSucess) {
        setIsLoggedIn(true);
      } else {
        clearFields();
        console.log("Incorrect user credentials");
      }
    });
    navigate("/discover");
  };

  const clearFields = () => {
    setUserid("");
    setPassword("");
    setIsLoggedIn(false);
  };

  return (
    <div className="auth_div">
      <form className="auth_form" onSubmit={handleSubmit}>
        <img
          src={popcorn}
          alt="logo"
          width="60px"
          height="60px"
          className="logo"
        ></img>
        <p className="bold_subheader">Nice to see you back!</p>
        <div className="auth_form_groups">
          <label>Username or email</label>
          <input
            type="text"
            className="form-control"
            id="username"
            placeholder="Username or email..."
            value={userid}
            onChange={(e) => setUserid(e.target.value)}
          ></input>
        </div>

        <div className="auth_form_groups">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <button type="submit" className="signup_button">
          Log in
        </button>
        <p className="helper_text">Don't have an account?</p>
        <p className="helper_text top_margin_text">
          Go to
          <a href="/signup"> sign up</a>.
        </p>
      </form>
    </div>
  );
};

export default Login;
