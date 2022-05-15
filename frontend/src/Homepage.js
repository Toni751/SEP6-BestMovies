import React from "react";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();

  const goToSignIn = () => {
    navigate("/login");
  };

  const goToSignUp = () => {
    navigate("/signup");
  };

  return (
    <div>
      <h1>Welcome</h1>
      <button onClick={() => goToSignIn()}>Sign In</button>
      <button onClick={() => goToSignUp()}>Sign Up</button>
    </div>
  );
};

export default Homepage;
