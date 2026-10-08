import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./src/db/migrations",
  dialect: "sqlite",
  dbCredentials: {
    url: "./src/db/local-db/v3/d1/miniflare-D1DatabaseObject/8082573aef929b4022cb5dfb7d34da66f5d9ede140a74c2939f883b36e6b81e0.sqlite",
  },
});
