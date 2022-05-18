import React, { useEffect } from "react";
import movieservice from "../services/movieservice";

const Discover = () => {
  useEffect(() => {
    movieservice
      .getMovies()
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }, []);
  return <div>Discover</div>;
};

export default Discover;
