import React from "react";
import white_like from "../images/white_like.png";
import yellow_like from "../images/yellow_like.png";
import white_star from "../images/white_star.png";
import yellow_star from "../images/yellow_star.png";
import default_movie_logo from "../images/default-movie-logo.png";
import "../styles/MovieCard.css";

const MovieCard = ({ movie }) => {
  const giveLike = () => {
    console.log("Like given");
  };

  const addToFavourites = () => {
    console.log("Added to favourites");
  };

  const goToMovieDetails = () => {
    console.log("Going to movie details");
  };

  const getImageSrc = (path) => {
    if (path === null || path === undefined || path.length === 0) {
      return default_movie_logo;
    }
    return `https://image.tmdb.org/t/p/w200${path}`;
  };

  const convertPersonArrayToText = (people) => {
    if (people === null || people === undefined || people.length === 0) {
      return "Unknwon";
    }
    let text = "";
    people.forEach((person) => (text += `${person.name}, `));
    return text.slice(0, -2);
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
        <p className="row_div">
          <span className="inter_medium">Genres: </span>
          {movie.genres.toString()}
        </p>

        <div>
          <p className="row_div">
            <span className="inter_medium">Director: </span>
            {convertPersonArrayToText(movie.joinedDirectors)}
          </p>
        </div>

        <div className="footer_row_div">
          <div>
            <p>
              <span className="inter_medium">Actors: </span>
              {convertPersonArrayToText(movie.joinedActors)}
            </p>
          </div>

          <p className="links" onClick={() => goToMovieDetails()}>
            {movie.numberOfComments} comments...
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
