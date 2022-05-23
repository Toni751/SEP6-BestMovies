import { getDbConnection } from "../utility/utilitySSM";

export async function main(event) {
  const db = await getDbConnection();

  const userId = event.pathParameters.user_id;
  const page = +event.queryStringParameters.page;

  const movies = await db
    .collection("toplists")
    .aggregate([
      {
        $match: { user_id: userId },
      },
      {
        $lookup: {
          from: "movie",
          localField: "movie_ids",
          foreignField: "_id",
          as: "movies",
        },
      },
      {
        $lookup: {
          from: "people",
          localField: "movies.actors",
          foreignField: "_id",
          as: "joinedActors",
        },
      },
      {
        $lookup: {
          from: "people",
          localField: "movies.directors",
          foreignField: "_id",
          as: "joinedDirectors",
        },
      },
      {
        $project: {
          "movie.title": 1,
          "movie.vote_average": 1,
          "movie.genres": 1,
          "joinedDirectors._id": 1,
          "joinedDirectors.name": 1,
          "joinedActors._id": 1,
          "joinedActors.name": 1,
          "movie.backdrop_path": 1,
          "movie.likes": 1,
          "movie.release_date": 1,
          numberOfLikes: { $size: { $ifNull: ["$movies.likes", []] } },
          numberOfComments: { $size: { $ifNull: ["$movies.comments", []] } },
        },
      },
      { $skip: (page - 1) * 10 },
      { $limit: 10 },
    ])
    .toArray();

  movies.forEach((movie) => {
    movie.isTopListed = true;
    if (movie.likes) {
      movie.isLikedByUser = movie.likes.includes(userId);
      movie.likes = null;
    } else {
      movie.isLikedByUser = false;
    }
  });

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(movies),
  };
}
