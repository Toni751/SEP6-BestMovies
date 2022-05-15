import FrontendStack from "./FrontendStack";
import MyStack from "./MyStack";
import AuthStack from "./AuthStack";

export default function main(app) {
  app.setDefaultFunctionProps({
    runtime: "nodejs14.x",
  });
  const apiStack = new MyStack(app, "api");

  const authStack = new AuthStack(app, "auth", {
    api: apiStack.api,
  });
  // Set default runtime for all functions

  // new MyStack(app, "my-stack");

  // Add more stacks
  new FrontendStack(app, "frontend", {
    api: apiStack.api,
    auth: authStack.auth,
    // bucket: storageStack.bucket,
  });
}
