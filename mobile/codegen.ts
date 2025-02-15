import fs from "node:fs";
import openapiTS, { astToString } from "openapi-typescript";
import { config } from "dotenv";

async function writeSchema() {
  config();

  const ast = await openapiTS(process.env.OPENAPI_URL!);
  const contents = astToString(ast);

  fs.writeFileSync("./src/__generated__/schema.ts", contents);
}

writeSchema();
