import React, { useState, useEffect, useContext } from "react";
import "../styles/Commons.css";
import sparkles from "../images/sparkles.png";
import MovieListPagination from "./MovieListPagination";
import userservice from "../services/userservice";
import { AuthContext } from "../auth/AuthProvider";
import MovieList from "./MovieList";

const Favourites = () => {
  const auth = useContext(AuthContext);
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const [totalNumberOfPages, setTotalNumberOfPages] = useState(1);

  useEffect(() => {
    fetchMovies(page);
  }, []);

  const getUserId = () => {
    return auth.user ? auth.user.username : null;
  };

  const fetchMovies = (currentPage) => {
    userservice
      .getUserToplist(getUserId(), currentPage)
      .then((response) => {
        console.log("Favourite movies: ", response.data);
        setMovies(response.data.movies);
        setTotalNumberOfPages(response.data.totalNumberOfPages);
        console.log(movies);
      })
      .catch((err) => console.log(err));
  };

  const handleCallback = (current_page_index) => {
    setPage(current_page_index);
    fetchMovies(current_page_index);
  };

  return (
    <div className="discover_div">
      <div className="header_w_icon_div">
        <p className="subheader inter_bold">Favourites </p>
        <img src={sparkles} alt="fire icon" width="30px" height="30px"></img>
      </div>
      <MovieList parentMovies={movies} />
      <MovieListPagination
        parentCallback={(p) => handleCallback(p)}
        totalNumberOfPages={totalNumberOfPages}
      />
      <p>
        Page: <span className="inter_bold">{page}</span> out of{" "}
        <span className="inter_bold">{totalNumberOfPages}</span>
      </p>
    </div>
  );
};

export default Favourites;
