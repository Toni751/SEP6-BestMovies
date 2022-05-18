import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../images/logo.png";
import fire from "../images/fire.png";
import "../styles/Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  const goToSignUp = () => {
    navigate("/signup");
  };

  return (
    <div className="nav_div nav_text">
      <img
        src={logo}
        alt="Logo"
        width="220px"
        height="60px"
        onClick={() => handleLogoClick()}
      />
      <div className="nav_div">
        <div className="nav_div" id="trending_nav">
          <a href="/discover">What's trending?</a>
          <img src={fire} alt="Fire" width="18px" height="18px" />
        </div>
        <a href="/login" className="margin_text">
          Login
        </a>
        <button className="nav_text" onClick={() => goToSignUp()}>
          Sign up
        </button>
      </div>
    </div>
  );
};

export default Navbar;
