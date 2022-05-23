import { getDbConnection } from "../utility/utilitySSM";

export async function main(event) {
  const db = await getDbConnection();

  const { isLike, userId, movieId } = JSON.parse(event.body);
  let response;
  if (isLike) {
    response = await db
      .collection("movies")
      .updateOne({ _id: movieId }, { $push: { likes: userId } });
  } else {
    response = await db
      .collection("movies")
      .updateOne({ _id: movieId }, { $pull: { likes: userId } });
  }

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(response),
  };
}
