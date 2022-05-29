import { MyStack } from "./MyStack";
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
