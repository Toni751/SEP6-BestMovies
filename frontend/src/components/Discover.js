import React, { useState, useEffect } from "react";
import movieservice from "../services/movieservice";
import "../styles/Discover.css";
import MovieCard from "./MovieCard";
import MovieListPagination from "./MovieListPagination";

const Discover = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    // movieservice
    //   .getMovies()
    //   .then((data) => {
    //     console.log(data);
    //     setMovies(data.data);
    //   })
    //   .catch((err) => console.log(err));
  }, []);

  const handleCallback = (current_page_index) => {
    setPage(current_page_index);
  };

  return (
    <div className="discover_div">
      <p className="subheader inter_bold">Discover the newest movies</p>
      <div className="div_dropdown">
        <select className="dropdown_list discover_dropdown">
          <option value="1">Newest-Oldest</option>
          <option value="1">Oldest-Newest</option>
          <option value="1">Newest-Oldest</option>
          <option value="1">Newest-Oldest</option>
          <option value="1">Newest-Oldest</option>
        </select>
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

export default Discover;
