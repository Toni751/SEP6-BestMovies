import { getDbConnection } from "../utility/utilitySSM";

export async function main(event) {
  const db = await getDbConnection();

  const userId = event.pathParameters.user_id;

  const genres = await db
    .collection("toplists")
    .aggregate([
      { $match: { user_id: userId } },
      {
        $lookup: {
          from: "movies",
          localField: "movie_ids",
          foreignField: "_id",
          as: "movies",
        },
      },
      { $project: { _id: 0, "movies.genres": 1 } },
      { $unwind: "$movies" },
    ])
    .toArray();

  let genresData = [];

  genres.forEach((element) => {
    if (element && element.movies && element.movies.genres) {
      element.movies.genres.forEach((genre) => {
        const found = genresData.find((g) => g.name === genre);
        if (found) {
          found.count++;
        } else {
          genresData.push({ name: genre, count: 1 });
        }
      });
    }
  });

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(genresData),
  };
}
