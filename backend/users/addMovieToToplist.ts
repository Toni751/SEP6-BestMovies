import { getDbConnection } from "../utility/utilitySSM";

export async function main(event) {
  const db = await getDbConnection();

  const { isAdd, userId, movieId } = JSON.parse(event.body);
  let response;
  if (isAdd) {
    response = await db
      .collection("toplists")
      .updateOne(
        { user_id: userId },
        { $push: { movie_ids: movieId } },
        { upsert: true }
      );
  } else {
    response = await db
      .collection("toplists")
      .updateOne({ user_id: userId }, { $pull: { movie_ids: movieId } });
  }

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(response),
  };
}
