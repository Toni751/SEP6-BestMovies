import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Homepage.css";

const Homepage = () => {
  const navigate = useNavigate();

  const goToDiscover = () => {
    navigate("/discover");
  };

  return (
    <div className="home_div">
      <p className="header neg_margin_text inter_bold">Are you a movieholic?</p>
      <p className="subheader inter_medium">Then come join our community!</p>
      <button className="home_button" onClick={() => goToDiscover()}>
        Discover movies
      </button>
    </div>
  );
};

export default Homepage;
