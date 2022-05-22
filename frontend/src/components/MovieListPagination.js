import React, { useState } from "react";
import "../styles/MovieListPagination.css";

const MovieListPagination = ({ parentCallback }) => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [totalPageNo, setTotalPageNo] = useState(10);

  const onButtonTrigger = (index) => {
    if (index <= totalPageNo && index >= 1) {
      setCurrentIndex(index);
      parentCallback(index);
    }
  };

  return (
    <div className="pagination_div">
      <button className="pagination_button" onClick={() => onButtonTrigger(1)}>
        {"<<"}
      </button>
      <button
        className="pagination_button"
        onClick={() => onButtonTrigger(currentIndex - 1)}
      >
        {"< Previous"}
      </button>
      <button
        className="pagination_button inter_bold"
        onClick={() => onButtonTrigger(currentIndex)}
      >
        {currentIndex}
      </button>
      <button
        className="pagination_button"
        onClick={() => onButtonTrigger(currentIndex + 1)}
      >
        {"Next >"}
      </button>
      <button
        className="pagination_button"
        onClick={() => onButtonTrigger(totalPageNo)}
      >
        {">>"}
      </button>
    </div>
  );
};

export default MovieListPagination;