import * as mongodb from "mongodb";
import { SSM } from "aws-sdk";

const MongoClient = mongodb.MongoClient;

// The connection is cached for efficiency
let cachedDb: mongodb.Db = null;

export async function getDbConnection() {
  if (cachedDb) {
    return cachedDb;
  }

  // In a real-life case, we would have 2 distinct databases, 1 for development and 1 for production
  // and based on the current stage, the connecting string for the appropriate database would be used
  // and the production data would be well separated from the development data (we only have 1 db here from financial reasons)
  const currentStageDbParam = process.env.IS_LOCAL
    ? "MongoDB_ConnectionString"
    : "MongoDB_ConnectionString"; // here could be a production db connection param, like: MongoDB_ConnectionStringProd

  const ssm = new SSM({ region: "eu-west-1" });
  const paramRet = await ssm
    .getParameter({
      Name: currentStageDbParam,
      WithDecryption: true,
    })
    .promise();

  // Connect to MongoDB database hosted on MongoDB Atlas
  const client = await MongoClient.connect(paramRet.Parameter.Value);

  // Specify which database to use
  cachedDb = await client.db("bestmoviesdb");

  return cachedDb;
}

let cachedApiKey = null;

// Example request URL: https://api.themoviedb.org/3/movie/15724?api_key=VALUE
export async function getApiKey() {
  if (cachedApiKey) {
    return cachedApiKey;
  }

  const ssm = new SSM({ region: "eu-west-1" });
  const paramRet = await ssm
    .getParameter({
      Name: "TMDB_API_KEY",
      WithDecryption: true,
    })
    .promise();

  cachedApiKey = paramRet.Parameter.Value;

  return cachedApiKey;
}
