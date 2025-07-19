import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";
import path from "path";

// Load .env.local manually
dotenv.config({ path: path.resolve(__dirname, ".env.local") });

export default defineConfig({
  schema: "./src/db/schema",
  dialect: "turso",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
    authToken: process.env.DATABASE_AUTH_TOKEN!,
  },
});
