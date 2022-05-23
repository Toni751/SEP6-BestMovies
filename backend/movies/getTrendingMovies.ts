import { getDbConnection } from "../utility/utilitySSM";

export async function main(event) {
  const db = await getDbConnection();

  const page = +event.queryStringParameters.page;
  const userId = event.queryStringParameters.user_id;

  const movies = await db
    .collection("movies")
    .aggregate([
      {
        $lookup: {
          from: "people",
          localField: "actors",
          foreignField: "_id",
          as: "joinedActors",
        },
      },
      {
        $lookup: {
          from: "people",
          localField: "directors",
          foreignField: "_id",
          as: "joinedDirectors",
        },
      },
      {
        $project: {
          title: 1,
          vote_average: 1,
          genres: 1,
          "joinedDirectors._id": 1,
          "joinedDirectors.name": 1,
          "joinedActors._id": 1,
          "joinedActors.name": 1,
          backdrop_path: 1,
          likes: 1,
          release_date: 1,
          numberOfLikes: { $size: { $ifNull: ["$likes", []] } },
          numberOfComments: { $size: { $ifNull: ["$comments", []] } },
        },
      },
      { $sort: { numberOfLikes: 1 } },
      { $skip: (page - 1) * 10 },
      { $limit: 10 },
    ])
    .toArray();

  const userTopList = await db
    .collection("toplists")
    .findOne({ user_id: userId });

  movies.forEach((movie) => {
    if (userTopList && userTopList.movie_ids) {
      movie.isTopListed = userTopList.movie_ids.includes(movie._id);
    } else {
      movie.isTopListed = false;
    }

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
