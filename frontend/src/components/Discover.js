import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../auth/AuthProvider";
import movieservice from "../services/movieservice";
import "../styles/Discover.css";
import MovieListPagination from "./MovieListPagination";
import Multiselect from "multiselect-react-dropdown";
import allGenres from "../utils/genres";
import MovieList from "./MovieList";
import fire from "../images/fire.png";

const convertGenresToString = (genres) => {
  const genreNames = [];
  genres.forEach((genre) => genreNames.push(genre.name));
  return genreNames.toString();
};

const Discover = () => {
  const auth = useContext(AuthContext);

  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalNumberOfPages, setTotalNumberOfPages] = useState(1);
  const [filter, setFilter] = useState("newest");
  const [genres, setGenres] = useState([]);

  const getUserId = () => {
    return auth.user ? auth.user.username : null;
  };

  const fetchMovies = (page, filter, genres) => {
    console.log("Fetch movies", page, filter, genres);
    movieservice
      .getDiscoverMovies(
        page,
        filter,
        convertGenresToString(genres),
        getUserId()
      )
      .then((response) => {
        console.log(response);
        setMovies(response.data.movies);
        setTotalNumberOfPages(response.data.totalNumberOfPages);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchMovies(page, filter, genres);
  }, []);

  const handlePageChange = (current_page_index) => {
    console.log("Changing page", current_page_index);
    setPage(current_page_index);
    fetchMovies(current_page_index, filter, genres);
  };

  const handleFilterChange = (newValue) => {
    console.log("Changing filter to", newValue);
    setFilter(newValue);
    fetchMovies(page, newValue, genres);
  };

  const onGenreSelect = (list, item) => {
    console.log("Selected genre", list, item);
    setGenres(list);
    fetchMovies(page, filter, list);
  };

  const onGenreRemove = (list, item) => {
    console.log("Removed genre", list, item);
    setGenres(list);
    fetchMovies(page, filter, list);
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
        <Multiselect
          options={allGenres}
          selectedValues={genres}
          onSelect={(list, item) => onGenreSelect(list, item)}
          onRemove={(list, item) => onGenreRemove(list, item)}
          displayValue="name"
          avoidHighlightFirstOption={true}
          style={{
            searchBox: {
              backgroundColor: "white",
              borderRadius: "25px",
              height: "30px",
              display: "flex",
              alignItems: "center",
              marginLeft: "10px",
              width: "500px",
            },
            optionContainer: {
              color: "black",
              fontSize: "13px",
            },
            chips: {
              backgroundColor: "#e8931c",
              height: "20px",
              marginTop: "5px",
            },
          }}
        />
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

export default Discover;
