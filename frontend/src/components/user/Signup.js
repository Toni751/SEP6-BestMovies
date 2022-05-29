import React, { useState, useContext } from "react";
import { AuthContext } from "../../auth/AuthProvider";
import "../../styles/user/Signup.css";
import popcorn from "../../images/popcorn.png";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [confirmationError, setConfirmationError] = useState("");
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const verifiyCredentials = () => {
    const regEmail =
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (password.length < 8) {
      console.log("Ana");
      return "Password must contain more than 8 characters.";
    }
    if (!regEmail.test(email)) {
      return "Email is not valid.";
    }
    if (username.length === 0) {
      return "Username is empty.";
    } else {
      return "";
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newErrorMessage = verifiyCredentials();
    console.log("Error message", newErrorMessage);
    if (newErrorMessage === "") {
      const response = await auth.signUp(username, email, password);
      if (response) {
        console.log("User successfully signed up");
        setIsSignedUp(true);
      } else {
        setIsSignedUp(false);
        console.log("User cannot be created");
        setErrorMessage("User cannot be created");
      }
    } else {
      setErrorMessage(newErrorMessage);
    }
  };

  const handleConfirmationSubmit = async (event) => {
    event.preventDefault();

    const response = await auth.handleConfirmation(
      username,
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

  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="auth_div">
      {isSignedUp ? (
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
          <span className="auth_err_text">{confirmationError}</span>
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
          <p className="sub_subheader neg_margin_text inter_bold">
            Ready for a movie?
          </p>
          <p className="sub_subheader inter_bold">Create an account!</p>
          <div className="auth_form_groups">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Username..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            ></input>
          </div>
          <div className="auth_form_groups">
            <label>Email</label>
            <input
              type="text"
              className="form-control"
              id="email"
              placeholder="Email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            Submit
          </button>
          <p className="helper_text">Already have an account?</p>
          <p className="helper_text top_margin_text">
            Go to
            <span className="links" onClick={() => goToLogin()}>
              {" "}
              log in
            </span>
            .
          </p>
        </form>
      )}
    </div>
  );
};

export default Signup;
