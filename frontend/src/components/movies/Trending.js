import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../auth/AuthProvider";
import movieservice from "../../services/movieservice";
import "../../styles/movies/Discover.css";
import MovieListPagination from "./MovieListPagination";
import fire from "../../images/fire.png";
import MovieList from "./MovieList";
import { useNavigate } from "react-router-dom";

const Trending = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalNumberOfPages, setTotalNumberOfPages] = useState(1);

  const getUserId = () => {
    return auth.user ? auth.user.username : null;
  };

  const fetchMovies = (page) => {
    movieservice
      .getTrendingMovies(page, getUserId())
      .then((response) => {
        console.log(response);
        setMovies(response.data.movies);
        setTotalNumberOfPages(response.data.totalNumberOfPages);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (getUserId() === null) {
      navigate("/");
    }

    fetchMovies(page);
  }, []);

  const handlePageChange = (current_page_index) => {
    console.log("Changing page", current_page_index);
    setPage(current_page_index);
    fetchMovies(current_page_index);
  };

  return (
    <div className="discover_div">
      <div className="header_w_icon_div">
        <p className="subheader inter_bold">What's trending?</p>
        <img src={fire} alt="fire icon" width="30px" height="30px"></img>
      </div>
      <MovieList parentMovies={movies} />
      <MovieListPagination
        parentCallback={(p) => handlePageChange(p)}
        totalNumberOfPages={totalNumberOfPages}
      />
      <p>
        Page: <span className="inter_bold">{page}</span> out of{" "}
        <span className="inter_bold">{totalNumberOfPages}</span>
      </p>
    </div>
  );
};

export default Trending;
