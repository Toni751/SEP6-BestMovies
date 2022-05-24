import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const MoviePage = () => {
  let { movieId } = useParams();
  useEffect(() => {
    console.log("Movie page", movieId);
  }, []);
  return <div style={{ width: "300px", height: "400px" }}>Hi</div>;
};

export default MoviePage;
