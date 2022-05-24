import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/MoviePage.css";
import default_movie_logo from "../images/default-movie-logo.png";
import movieservice from "../services/movieservice";

const MoviePage = () => {
  let { movieId } = useParams();
  const [movie, setMovie] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    console.log("Movie page", movieId);
    movieservice
      .getMovieById(movieId)
      .then((response) => {
        console.log(response);
        setMovie(response.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const handleNavigatePerson = (personId) => {
    navigate(`/person/${personId}`);
  };
  return (
    <div className="moviepage_div">
      <p className="subheader inter_bold">{movie.title}</p>
      <div className="movie_details_div">
        <div className="movie_details_image_div">
          <img
            src={
              movie.backdrop_path
                ? `https://image.tmdb.org/t/p/w300${movie.backdrop_path}`
                : default_movie_logo
            }
            alt="Image of movie"
            className="movie_details_image"
          ></img>
        </div>
        <div className="movie_details_description_div">
          <p className="inter_bold top_margin_text">Overview:</p>
          <p className="Overview top_margin_text">{movie.overview}</p>
          <p className="inter_bold top_margin_text">Known for:</p>
          {/* <p className="top_margin_text">
            {movie.movieMovies &&
              movie.movieMovies
                .concat(movie.directorMovies)
                .map((movie, index) => {
                  return (
                    <span
                      key={movie._id}
                      className="person_name"
                      onClick={() => handleNavigateMovie(movie._id)}
                    >
                      {movie.title}
                      {index !== movie.movieMovies.length - 1 && ", "}
                    </span>
                  );
                })}
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default MoviePage;
