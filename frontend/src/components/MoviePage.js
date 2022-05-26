import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../auth/AuthProvider";
import "../styles/MoviePage.css";
import default_movie_logo from "../images/default-movie-logo.png";
import white_like from "../images/white_like.png";
import yellow_like from "../images/yellow_like.png";
import white_star from "../images/white_star.png";
import yellow_star from "../images/yellow_star.png";
import movieservice from "../services/movieservice";
import userservice from "../services/userservice";
import MovieCommentCard from "./MovieCommentCard";

const MoviePage = () => {
  let { movieId } = useParams();
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const [movie, setMovie] = useState({});
  const [comment, setComment] = useState("");

  const getUserId = () => {
    return auth.user ? auth.user.username : null;
  };

  useEffect(() => {
    console.log("Movie page", movieId);
    movieservice
      .getMovieById(movieId, getUserId())
      .then((response) => {
        console.log(response);
        setMovie(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const addLike = () => {
    if (auth.user && auth.user.username) {
      movieservice
        .addMovieLike({
          isLike: !movie.isLikedByUser,
          userId: auth.user.username,
          movieId: movie._id,
        })
        .then((response) => {
          console.log("Like added successfully", response);
          if (movie.isLikedByUser) {
            setMovie({
              ...movie,
              isLikedByUser: !movie.isLikedByUser,
              numberOfLikes: movie.numberOfLikes - 1,
            });
          } else {
            setMovie({
              ...movie,
              isLikedByUser: !movie.isLikedByUser,
              numberOfLikes: movie.numberOfLikes + 1,
            });
          }
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
          setMovie({ ...movie, isTopListed: !movie.isTopListed });
        })
        .catch((err) => console.log("Error adding movie to toplist", err));
    }
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (auth.user && auth.user.username) {
      const commentObject = {
        comment: comment,
        userId: auth.user.username,
        movieId: movie._id,
      };
      movieservice
        .addMovieComment(commentObject)
        .then((response) => {
          console.log("Movie comment added successfully", response);
          const temp = [...movie.comments];
          temp.push(response.data);
          setMovie({ ...movie, comments: temp });
          setComment("");
        })
        .catch((err) => console.log("Error adding movie to toplist", err));
    }
  };

  const handleDeleteComment = (commentId) => {
    let temp = [...movie.comments];
    temp = temp.filter((comment) => comment._id !== commentId);
    setMovie({ ...movie, comments: temp });
  };

  const handleNavigatePerson = (personId) => {
    navigate(`/person/${personId}`);
  };

  return (
    <div className="moviepage_div">
      <p className="subheader inter_bold">
        {movie.title}
        <img
          src={movie.isTopListed ? yellow_star : white_star}
          alt="Favourite"
          width="24px"
          height="24px"
          className="icons"
          style={{ marginLeft: "16px" }}
          onClick={() => addToFavourites()}
        ></img>
      </p>
      <div className="movie_details_div">
        <div className="movie_details_image_div" style={{ paddingTop: "20px" }}>
          <img
            src={
              movie.backdrop_path
                ? `https://image.tmdb.org/t/p/w300${movie.backdrop_path}`
                : default_movie_logo
            }
            alt="Image of movie"
            className="movie_details_image"
          ></img>
          <div className="left_group_div" style={{ marginTop: "15px" }}>
            <p style={{ fontSize: "20px" }}>{movie.numberOfLikes} </p>
            <img
              src={movie.isLikedByUser ? yellow_like : white_like}
              alt="Like"
              width="24px"
              height="24px"
              id="like_icon"
              className="icons"
              onClick={() => addLike()}
            ></img>
          </div>
        </div>
        <div className="movie_details_description_div">
          <p className="inter_bold top_margin_text">Description:</p>
          <p className="movie_overview top_margin_text">{movie.overview}</p>
          <p className="top_margin_text">
            <span className="inter_bold ">Genre(s):</span>{" "}
            {movie.genres && movie.genres.toString()}
          </p>
          <p className="top_margin_text">
            <span className="inter_bold ">Rating:</span>{" "}
            {movie.vote_average ? movie.vote_average : "Unknown"}
          </p>
          <p className="top_margin_text">
            <span className="inter_bold ">Release date:</span>{" "}
            {movie.release_date}
          </p>
          <p className="top_margin_text">
            <span className="inter_bold">Director(s): </span>
            {movie.directors &&
              movie.directors.map((person, index) => {
                return (
                  <span
                    key={person._id}
                    className="person_name"
                    onClick={() => handleNavigatePerson(person._id)}
                  >
                    {person.name}
                    {index !== movie.directors.length - 1 && ", "}
                  </span>
                );
              })}
          </p>
          <p className="top_margin_text">
            <span className="inter_bold">Actors:</span>{" "}
            {movie.actors &&
              movie.actors.map((person, index) => {
                return (
                  <span
                    key={person._id}
                    className="person_name"
                    onClick={() => handleNavigatePerson(person._id)}
                  >
                    {person.name}
                    {index !== movie.actors.length - 1 && ", "}
                  </span>
                );
              })}
          </p>
        </div>
      </div>

      <div className="movie_details_comment_container">
        <input
          type="text"
          className="movie_details_comment_text"
          placeholder="Write a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button style={{ height: "34px" }} onClick={(e) => handleAddComment(e)}>
          Post
        </button>
      </div>
      <div style={{ width: "100%" }}>
        {movie.comments &&
          movie.comments.map((comment) => {
            return (
              <MovieCommentCard
                key={comment._id}
                {...comment}
                handleDeleteCallback={(commentId) =>
                  handleDeleteComment(commentId)
                }
              />
            );
          })}
      </div>
    </div>
  );
};

export default MoviePage;
