import { config } from "dotenv";
import { join } from "path";

const env = process.env.NODE_ENV || "development";
const configPath = join(__dirname, "..", "..", `.env.${env}`);
config({ path: configPath });