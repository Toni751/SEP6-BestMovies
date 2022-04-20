import FrontendStack from "./FrontendStack";
import MyStack from "./MyStack";

export default function main(app) {
  // Set default runtime for all functions
  app.setDefaultFunctionProps({
    runtime: "nodejs14.x",
  });

  new MyStack(app, "my-stack");

  // Add more stacks
  new FrontendStack(app, "frontend", {
    // api: apiStack.api,
    // auth: authStack.auth,
    // bucket: storageStack.bucket,
  });
}
