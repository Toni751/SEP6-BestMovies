import React, { useContext } from "react";
import { AuthContext } from "../../auth/AuthProvider";
import trash from "../../images/trash.png";
import movieservice from "../../services/movieservice";

const MovieCommentCard = ({
  _id,
  user_id,
  comment,
  created_at,
  handleDeleteCallback,
}) => {
  const auth = useContext(AuthContext);

  const canUserDeleteComment = () => {
    if (auth.user && auth.user.username) {
      return auth.user.username === user_id;
    }

    return false;
  };

  const deleteComment = () => {
    movieservice
      .deleteMovieComment(_id)
      .then((response) => {
        console.log("Delete comment response", response);
        handleDeleteCallback(_id);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div
      className="moviecards_div"
      style={{
        width: "99%",
        height: "100px",
        paddingBottom: "0px",
        paddingLeft: "0px",
        paddingRight: "8px",
      }}
    >
      <div className="movie_details">
        <div className="header_row_div">
          <p
            className="movie_text"
            style={{ marginBottom: "12px", fontSize: "20px", color: "#E8931C" }}
          >
            @{user_id}
          </p>
          <div
            style={{
              width: "200px",
              paddingRight: "16px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <p style={{ color: "#999" }}>
              {created_at &&
                created_at.substring(0, 10) +
                  " " +
                  created_at.substring(11, 19)}
            </p>
            {canUserDeleteComment() && (
              <img
                src={trash}
                alt="Trash"
                width="20px"
                height="20px"
                className="icons"
                style={{ marginLeft: "16px" }}
                onClick={() => deleteComment()}
              ></img>
            )}
          </div>
        </div>
        <p className="row_div" style={{ height: "60px", overflowY: "auto" }}>
          <span>{comment}</span>
        </p>
      </div>
    </div>
  );
};

export default MovieCommentCard;
