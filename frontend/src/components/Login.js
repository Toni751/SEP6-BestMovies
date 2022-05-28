import React, { useState, useContext } from "react";
import { AuthContext } from "../auth/AuthProvider";
import { useNavigate, useLocation } from "react-router";
import "../styles/Login.css";
import popcorn from "../images/popcorn.png";

const Login = () => {
  const [password, setPassword] = useState("");
  const [userid, setUserid] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [confirmationError, setConfirmationError] = useState("");
  const [isVerified, setIsVerified] = useState(true);
  const [confirmationCode, setConfirmationCode] = useState("");
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const findLoginRedirect = () => {
    if (location.state && location.state.from) {
      console.log("Redirecting", location.state.from);
      return location.state.from;
    }

    return "/discover";
  };

  const verifiyCredentials = () => {
    if (password.length < 8) {
      return "Password must contain more than 8 characters.";
    }
    if (userid.length === 0) {
      return "Username/email is empty.";
    } else {
      return "";
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newErrorMessage = verifiyCredentials();

    if (newErrorMessage === "") {
      const response = await auth.login(userid, password);

      if (response === "true") {
        navigate(findLoginRedirect());
      } else if (response === "User is not confirmed.") {
        setIsVerified(false);
        await auth.resendConfirmation(userid);
      } else {
        clearFields();
        setErrorMessage(response);
      }
    } else {
      setErrorMessage(newErrorMessage);
    }
  };

  const clearFields = () => {
    setUserid("");
    setPassword("");
  };

  const goToSignUp = () => {
    navigate("/signup");
  };

  const handleConfirmationSubmit = async (event) => {
    event.preventDefault();

    const response = await auth.handleConfirmation(
      userid,
      password,
      confirmationCode
    );
    if (response === "true") {
      console.log("Confirmation successful");
      navigate("/discover");
    } else {
      console.log(response);
      setConfirmationError("Incorrect confirmation code");
    }
  };

  return (
    <div className="auth_div">
      {!isVerified ? (
        <form className="auth_form" onSubmit={handleConfirmationSubmit}>
          <img
            src={popcorn}
            alt="logo"
            width="60px"
            height="60px"
            className="logo"
          ></img>
          <p className="sub_subheader inter_bold">Only one more step!</p>
          <div className="auth_form_groups">
            <label>Confirmation code</label>
            <input
              autoFocus
              type="text"
              placeholder="Confirmation code..."
              value={confirmationCode}
              onChange={(e) => setConfirmationCode(e.target.value)}
            />
          </div>
          <span className="auth_err_text">{confirmationCode}</span>
          <button type="submit" className="signup_button">
            Submit
          </button>
          <p className="helper_text">
            *Check your email for a confirmation code.
          </p>
        </form>
      ) : (
        <form className="auth_form" onSubmit={handleSubmit}>
          <img
            src={popcorn}
            alt="logo"
            width="60px"
            height="60px"
            className="logo"
          ></img>
          <p className="sub_subheader inter_bold">Nice to see you back!</p>
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
          <span className="auth_err_text">{errorMessage}</span>
          <button type="submit" className="signup_button">
            Log in
          </button>
          <p className="helper_text">Don't have an account?</p>
          <p className="helper_text top_margin_text">
            Go to
            <span className="links" onClick={() => goToSignUp()}>
              {" "}
              sign up
            </span>
            .
          </p>
        </form>
      )}
    </div>
  );
};

export default Login;
