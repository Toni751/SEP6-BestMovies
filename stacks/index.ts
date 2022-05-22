// import FrontendStack from "./FrontendStack";
import { MyStack } from "./MyStack";
// import AuthStack from "./AuthStack";
import { App } from "@serverless-stack/resources";

export default async function main(app: App) {
  app.setDefaultFunctionProps({
    runtime: "nodejs14.x",
    srcPath: "backend",
    bundle: {
      format: "esm",
    },
  });

  app.stack(MyStack);
}
