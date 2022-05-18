import React, { useState, useContext } from "react";
import { AuthContext } from "../auth/AuthProvider";
import "../styles/Signup.css";
import popcorn from "../images/popcorn.png";
import { Navigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const auth = useContext(AuthContext);

  const verifiyCredentials = () => {
    const regEmail =
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (password.length < 8)
      setErrorMessage("Password must contain more than 8 characters.");
    if (!regEmail.test(email)) setErrorMessage("Email is not valid.");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // verifiyCredentials();
    // if (errorMessage) {
    //   console.log("Ana");
    auth.signUp(username, email, password, (isSuccess) => {
      if (isSuccess) {
        console.log("User successfully sign up");
        setIsSignedUp(true);
      } else {
        setIsSignedUp(false);
        console.log("User cannot be created");
      }
    });
    // }
  };

  const handleConfirmationSubmit = (event) => {
    event.preventDefault();

    auth.handleConfirmation(
      username,
      password,
      confirmationCode,
      (isSuccess) => {
        if (isSuccess) {
          console.log("Confirmation successful");
        } else {
          console.log("Confirmation unsuccessful");
        }
      }
    );
    Navigate("/discover");
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
          <p className="bold_subheader">Only one more step!</p>
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
          <button type="submit" className="signup_button">
            Submit
          </button>
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
          <p className="bold_subheader neg_margin_text">Ready for a movie?</p>
          <p className="bold_subheader">Create an account!</p>
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
            <a href="/login"> log in</a>.
          </p>
        </form>
      )}
    </div>
  );
};

export default Signup;
