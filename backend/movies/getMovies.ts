import { getDbConnection } from "../utility/utilitySSM";

export async function main(event) {
  const db = await getDbConnection();

  const userId = event.queryStringParameters.user_id;
  const page = +event.queryStringParameters.page;
  const filter = event.queryStringParameters.filter;
  const genresRaw = event.queryStringParameters.genres;
  const genres = genresRaw.split(",");
  console.log("Genres", genres);
  const filterObject =
    filter === "oldest" ? { release_date: 1 } : { release_date: -1 };

  const currentYear = `${new Date().getFullYear()}-12-31`;
  console.log("Current Year", currentYear);
  const movies = await db
    .collection("movies")
    .aggregate([
      {
        $match: {
          genres: { $elemMatch: { $in: genres } },
          release_date: { $lte: currentYear },
        },
      },
      { $sort: filterObject },
      { $skip: (page - 1) * 10 },
      { $limit: 10 },
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