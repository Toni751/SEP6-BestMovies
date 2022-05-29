import React from "react";
import "../../styles/people/ActorBiography.css";

const ActorBiography = ({ biography, parentCallback }) => {
  const onClose = () => {
    parentCallback();
  };

  return (
    <div className="full_modal">
      <div className="modal_div">
        <p className="sub_subheader inter_medium">Biography</p>
        <p className="top_margin_text">{biography}</p>
        <button onClick={() => onClose()}>Close</button>
      </div>
    </div>
  );
};

export default ActorBiography;
