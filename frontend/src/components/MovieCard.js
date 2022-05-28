import React, { useState, useContext } from "react";
import white_like from "../images/white_like.png";
import yellow_like from "../images/yellow_like.png";
import white_star from "../images/white_star.png";
import yellow_star from "../images/yellow_star.png";
import default_movie_logo from "../images/default-movie-logo.png";
import "../styles/MovieCard.css";
import { AuthContext } from "../auth/AuthProvider";
import { useNavigate } from "react-router-dom";
import movieservice from "../services/movieservice";
import userservice from "../services/userservice";

const MovieCard = ({ movie, handleLike, handleStar }) => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const giveLike = () => {
    if (auth.user && auth.user.username) {
      movieservice
        .addMovieLike({
          isLike: !movie.isLikedByUser,
          userId: auth.user.username,
          movieId: movie._id,
        })
        .then((response) => {
          console.log("Like added successfully", response);
          handleLike(movie._id);
        })
        .catch((err) => console.log("Error adding like", err));
    }
  };

  const addToFavourites = () => {
    if (auth.user && auth.user.username) {
      userservice
        .addUserToplist({
          isAdd: !movie.isTopListed,
          userId: auth.user.username,
          movieId: movie._id,
        })
        .then((response) => {
          console.log("Movie to toplist added successfully", response);
          handleStar(movie._id);
        })
        .catch((err) => console.log("Error adding movie to toplist", err));
    }
  };

  const goToMovieDetails = () => {
    console.log("Going to movie details");
    navigate(`/movie/${movie._id}`);
  };

  const handleNavigateToPerson = (personId) => {
    console.log("Going to person details", personId);
    navigate(`/person/${personId}`);
  };

  const getImageSrc = (path) => {
    if (path === null || path === undefined || path.length === 0) {
      return default_movie_logo;
    }
    return `https://image.tmdb.org/t/p/w200${path}`;
  };

  return (
    <div className="moviecards_div">
      <div className="movie_image_div">
        <img
          src={getImageSrc(movie.backdrop_path)}
          alt="Movie Background"
          className="movie_image"
        ></img>
      </div>
      <div className="movie_details">
        <div className="header_row_div">
          <p
            className="movie_text inter_medium links"
            onClick={() => goToMovieDetails()}
          >
            {movie.title}
          </p>
          <div className="left_group_div">
            <p>{movie.numberOfLikes}</p>
            <img
              src={movie.isLikedByUser ? yellow_like : white_like}
              alt="Like"
              width="18px"
              height="18px"
              id="like_icon"
              className="icons"
              onClick={() => giveLike()}
            ></img>
            <img
              src={movie.isTopListed ? yellow_star : white_star}
              alt="Favourite"
              width="18px"
              height="18px"
              className="icons"
              onClick={() => addToFavourites()}
            ></img>
          </div>
        </div>
        <p className="row_div">
          <span className="inter_medium">Rating: </span>
          {movie.vote_average}
        </p>
        {movie.genres && movie.genres.length !== 0 ? (
          <p className="row_div">
            <span className="inter_medium">Genres: </span>
            {movie.genres.join(", ")}
          </p>
        ) : (
          <p className="row_div">
            <span className="inter_medium">Genres: </span>
            Unknown
          </p>
        )}

        <div>
          <p className="row_div">
            <span className="inter_medium">Director(s): </span>
            {movie.joinedDirectors &&
              movie.joinedDirectors.map((director, index) => {
                return (
                  <span
                    key={director._id}
                    className="person_name"
                    onClick={() => handleNavigateToPerson(director._id)}
                  >
                    {director.name}
                    {index !== movie.joinedDirectors.length - 1 && ", "}
                  </span>
                );
              })}
            {movie.joinedDirectors.length === 0 && <span>Unknown</span>}
          </p>
        </div>

        <div className="footer_row_div">
          <div>
            {movie.joinedActors && movie.joinedActors.length !== 0 ? (
              <p>
                <span className="inter_medium">Actors: </span>
                {movie.joinedActors &&
                  movie.joinedActors.slice(0, 4).map((actor, index) => {
                    return (
                      <span
                        key={actor._id}
                        className="person_name"
                        onClick={() => handleNavigateToPerson(actor._id)}
                      >
                        {actor.name}
                        {index !== 3 && ", "}
                      </span>
                    );
                  })}
                {movie.joinedActors && (
                  <span className="links" onClick={goToMovieDetails}>
                    {" "}
                    and others ...
                  </span>
                )}
              </p>
            ) : (
              <p>
                <span className="inter_medium">Actors: </span>
                Unknown
              </p>
            )}
          </div>

          <p className="links" onClick={() => goToMovieDetails()}>
            {movie.numberOfComments}{" "}
            {movie.numberOfComments !== 1 ? "comments..." : "comment..."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
