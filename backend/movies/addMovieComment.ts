import { getDbConnection } from "../utility/utilitySSM";

export async function main() {
  const rand = Math.floor(Math.random() * 10);
  // Get an instance of our database
  const db = await getDbConnection();

  return {
    statusCode: 200,
    headers: { "Content-Type": "text/json" },
    body: JSON.stringify({ message: `Private Random Number: ${rand}` }),
  };
}
