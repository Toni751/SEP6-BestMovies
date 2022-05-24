import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../images/logo.png";
import fire from "../images/fire.png";
import { AuthContext } from "../auth/AuthProvider";
import "../styles/Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const handleLogoClick = () => {
    navigate(auth.user ? "/discover" : "/");
  };

  const goToSignUp = () => {
    navigate("/signup");
  };

  const goToTrending = () => {
    navigate("/trending");
  };

  const goToLogin = () => {
    navigate("/login");
  };

  const goToFavourites = () => {
    navigate("/favourites");
  };

  const goToSeeProfile = () => {
    navigate("/seeprofile");
  };

  return (
    <div className="nav_div nav_text">
      <div className="nav_div">
        <img
          src={logo}
          alt="Logo"
          width="230px"
          height="63px"
          onClick={() => handleLogoClick()}
        />
        <input
          type="search"
          className="form-control search_bar"
          placeholder="Search for a movie, actor or director..."
        />
      </div>
      <div className="nav_div">
        <div className="nav_div" id="trending_nav">
          <p className="links" onClick={() => goToTrending()}>
            What's trending?
          </p>
          <img src={fire} alt="Fire" width="18px" height="18px" />
        </div>
        {auth.user ? (
          <div className="changing_div">
            <p className="links margin_text" onClick={() => goToFavourites()}>
              My favourites
            </p>
            <p className="links margin_text" onClick={() => goToSeeProfile()}>
              See profile
            </p>
          </div>
        ) : (
          <div className="changing_div">
            <p className="links margin_text" onClick={() => goToLogin()}>
              Login
            </p>
            <button className="nav_text" onClick={() => goToSignUp()}>
              Sign up
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
