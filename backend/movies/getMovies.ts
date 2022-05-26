import { getDbConnection } from "../utility/utilitySSM";

let totalNumberOfPages = 0;
export async function main(event) {
  const db = await getDbConnection();

  const userId = event.queryStringParameters.user_id;
  const page = +event.queryStringParameters.page;
  const filter = event.queryStringParameters.filter;
  const genresRaw = event.queryStringParameters.genres;

  // console.log("Genres", genresRaw, page, filter, userId);
  const filterObject =
    filter === "oldest" ? { release_date: 1 } : { release_date: -1 };

  const currentYear = `${new Date().getFullYear()}-12-31`;

  const isGenresEmpty = genresRaw ? genresRaw.length === 0 : true;
  let genres = [];
  if (!isGenresEmpty) {
    genres = genresRaw.split(",");
  }
  console.log("Genres", genres, genresRaw);
  const genresMatchObject = isGenresEmpty
    ? { release_date: { $lte: currentYear } }
    : {
        genres: { $elemMatch: { $in: genres } },
        release_date: { $lte: currentYear },
      };

  const movies = await db
    .collection("movies")
    .aggregate([
      {
        $match: genresMatchObject,
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

  let userTopList = null;
  if (userId) {
    userTopList = await db.collection("toplists").findOne({ user_id: userId });
  }

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

  if (totalNumberOfPages === 0) {
    const numberOfDocuments = await db.collection("movies").countDocuments();
    totalNumberOfPages = Math.floor(numberOfDocuments / 10);
    if (numberOfDocuments % 10 !== 0) {
      totalNumberOfPages += 1;
    }
  }

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ movies, totalNumberOfPages }),
  };
}
