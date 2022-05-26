import { getDbConnection } from "../utility/utilitySSM";
import { ObjectId } from "mongodb";

export async function main(event) {
  const db = await getDbConnection();

  const { comment, userId, movieId } = JSON.parse(event.body);
  const newComment = {
    _id: new ObjectId(),
    user_id: userId,
    comment: comment,
    created_at: new Date(),
  };
  let response = await db.collection("movies").updateOne(
    { _id: movieId },
    {
      $push: {
        comments: newComment,
      },
    }
  );

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newComment),
  };
}
