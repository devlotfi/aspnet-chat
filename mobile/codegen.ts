import fs from "node:fs";
import openapiTS, { astToString } from "openapi-typescript";

const ast = await openapiTS(new URL("./my-schema.yaml", import.meta.url));
const contents = astToString(ast);

// (optional) write to file
fs.writeFileSync("./__generated__/schema.ts", contents);
