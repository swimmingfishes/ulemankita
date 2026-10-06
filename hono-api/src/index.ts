import { serve } from "@hono/node-server";
import { Hono } from "hono";
import authorRoutes from "./routes/author.ts";
import authRoutes from "./routes/auth.ts";
import { env } from "./data/env.ts";

const app = new Hono();

app.route("/authors", authorRoutes);
app.route("/auth", authRoutes);

serve(
  {
    fetch: app.fetch,
    port: env.PORT,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);
