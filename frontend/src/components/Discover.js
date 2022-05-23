import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthProvider";
import movieservice from "../services/movieservice";
import "../styles/Discover.css";
import MovieCard from "./MovieCard";
import MovieListPagination from "./MovieListPagination";

const Discover = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("newest");
  const [genres, setGenres] = useState([]);

  const getUserId = () => {
    return auth.user ? auth.user.username : null;
  };

  const fetchMovies = () => {
    movieservice
      .getDiscoverMovies(page, filter, genres.toString(), getUserId())
      .then((response) => {
        console.log(response);
        setMovies(response.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleCallback = (current_page_index) => {
    setPage(current_page_index);
  };

  const handleFilterChange = (newValue) => {
    console.log("Changing filter to", newValue);
    setFilter(newValue);
  };

  return (
    <div className="discover_div">
      <p className="subheader inter_bold">Discover the newest movies</p>
      <div className="div_dropdown">
        <select
          className="dropdown_list discover_dropdown"
          onChange={(e) => handleFilterChange(e.target.value)}
          value={filter}
        >
          <option value="newest">Newest-Oldest</option>
          <option value="oldest">Oldest-Newest</option>
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
