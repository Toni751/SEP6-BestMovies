import React, { useState, useEffect, useContext } from "react";
import MovieCard from "./MovieCard";
import "../styles/Commons.css";
import sparkles from "../images/sparkles.png";
import MovieListPagination from "./MovieListPagination";
import userservice from "../services/userservice";
import { AuthContext } from "../auth/AuthProvider";

const Favourites = () => {
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const auth = useContext(AuthContext);

  useEffect(() => {
    fetchMovies();
  }, []);

  const getUserId = () => {
    return auth.user ? auth.user.username : null;
  };

  const fetchMovies = () => {
    userservice
      .getUserToplist(getUserId(), page)
      .then((response) => {
        console.log("Favourite movies: ", response.data);
        setMovies(response.data);
        console.log(movies);
      })
      .catch((err) => console.log(err));
  };

  const handleCallback = (current_page_index) => {
    setPage(current_page_index);
  };

  return (
    <div className="discover_div">
      <div className="header_w_icon_div">
        <p className="subheader inter_bold">Favourites </p>
        <img src={sparkles} alt="fire icon" width="30px" height="30px"></img>
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

export default Favourites;
