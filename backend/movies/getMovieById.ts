import { getDbConnection } from "../utility/utilitySSM";

export async function main(event) {
  // console.log("Event", event.queryStringParameters, event.pathParameters);
  const db = await getDbConnection();
  // Make a MongoDB MQL Query
  const movie = await db
    .collection("movies")
    .findOne({ _id: +event.pathParameters.movie_id });
  const userId = event.queryStringParameters.user_id;

  if (!movie.comments) {
    movie.comments = [];
  }

  movie.numberOfLikes = 0;
  if (movie.likes) {
    movie.numberOfLikes = movie.likes.length;
    movie.isLikedByUser = movie.likes.includes(userId);
    movie.likes = null;
  } else {
    movie.numberOfLikes = 0;
    movie.isLikedByUser = false;
  }

  movie.isTopListed =
    (await db
      .collection("toplists")
      .findOne({ user_id: userId, movie_ids: movie._id })) !== null;

  const personIds = [];
  personIds.push(...movie.directors);
  personIds.push(...movie.actors);

  const persons = await db
    .collection("people")
    .find({ _id: { $in: personIds } }, { projection: { name: 1 } })
    .toArray();

  movie.actors = persons.filter((p) => movie.actors.includes(p._id));
  movie.directors = persons.filter((p) => movie.directors.includes(p._id));

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(movie),
  };
}
