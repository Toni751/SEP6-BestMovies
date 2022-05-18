import FrontendStack from "./FrontendStack";
import MyStack from "./MyStack";
import AuthStack from "./AuthStack";

export default async function main(app) {
  app.setDefaultFunctionProps({
    runtime: "nodejs14.x",
  });
  // Fetch SSM value using AWS SDK
  // const ssm = new AWS.SSM({ region: "eu-west-1" });
  // const paramRet = await ssm
  //   .getParameter({
  //     Name: `MongoDB_ConnectionString`,
  //   })
  //   .promise();
  // const paramValue = paramRet.Parameter.Value;

  const apiStack = new MyStack(app, "api");
  // Set default runtime for all functions

  // new MyStack(app, "my-stack");

  const authStack = new AuthStack(app, "auth", {
    api: apiStack.api,
  });
  // Add more stacks
  new FrontendStack(app, "frontend", {
    api: apiStack.api,
    auth: authStack.auth,
    // bucket: storageStack.bucket,
  });
}
