import React, { useState, useEffect } from "react";
import movieservice from "../services/movieservice";
import MovieCard from "./MovieCard";
import "../styles/Discover.css";
import "../styles/Trending.css";
import fire from "../images/fire.png";
import MovieListPagination from "./MovieListPagination";

const Trending = () => {
  const [movies, setMovies] = useState([]);
  const [moviesToDisplay, setMoviesToDisplay] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    movieservice
      .getMovies()
      .then((data) => {
        console.log(data);
        setMovies(data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleCallback = (current_page_index) => {
    setPage(current_page_index);
  };

  return (
    <div className="discover_div">
      <div className="trending_div">
        <p className="subheader inter_bold">What's trending?</p>
        <img src={fire} alt="fire icon" width="30px" height="30px"></img>
      </div>
      {movies.map((movie) => (
        <MovieCard key={movie._id} movie={movie} />
      ))}
      <MovieListPagination parentCallback={(p) => handleCallback(p)} />
      <p>
        Page: <span className="inter_bold">{page}</span> out of{" "}
        <span className="inter_bold">10</span>
      </p>
    </div>
  );
};

export default Trending;
