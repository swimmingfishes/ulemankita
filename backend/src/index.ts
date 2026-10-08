// src/index.ts
import { Hono } from "hono";
import { drizzle } from "drizzle-orm/d1";
import { eq, desc, and, isNotNull } from "drizzle-orm";
import * as schema from "./db/schema.ts";

type Env = {
  ulemankita_db: D1Database;
};

const app = new Hono<{ Bindings: Env }>();

// Initialize Drizzle — one line, no connection pool needed
const getDb = (env: Env) => drizzle(env.ulemankita_db, { schema });

app.get("/", (c) => {
  return c.text("hello");
});

// Get user by email
app.get("/users/:email", async (c) => {
  const db = getDb(c.env);
  const email = c.req.param("email");

  const user = await db
    .select()
    .from(schema.users)
    .where(eq(schema.users.email, email))
    .get();

  if (!user) return c.json({ error: "User not found" }, 404);
  return c.json(user);
});

// Get published posts with author
app.get("/posts", async (c) => {
  const db = getDb(c.env);

  const posts = await db
    .select({
      id: schema.posts.id,
      title: schema.posts.title,
      slug: schema.posts.slug,
      publishedAt: schema.posts.publishedAt,
      author: {
        id: schema.users.id,
        name: schema.users.name,
      },
    })
    .from(schema.posts)
    .innerJoin(schema.users, eq(schema.posts.userId, schema.users.id))
    .where(isNotNull(schema.posts.publishedAt))
    .orderBy(desc(schema.posts.publishedAt))
    .limit(20)
    .all();

  return c.json(posts);
});

// Create user
app.post("/users", async (c) => {
  const db = getDb(c.env);
  const body = await c.req.json<{ email: string; name: string }>();

  const newUser: schema.NewUser = {
    id: crypto.randomUUID(),
    email: body.email,
    name: body.name,
    plan: "free",
  };

  const user = await db.insert(schema.users).values(newUser).returning().get();
  return c.json(user, 201);
});

// Batch operations (D1 native)
app.post("/batch", async (c) => {
  const db = getDb(c.env);

  // D1 batch: multiple statements in one round trip
  const userId = crypto.randomUUID();
  const postId = crypto.randomUUID();

  await db.batch([
    db.insert(schema.users).values({
      id: userId,
      email: "batch@example.com",
      name: "Batch User",
      plan: "pro",
    }),
    db.insert(schema.posts).values({
      id: postId,
      userId,
      title: "First Post",
      slug: "first-post",
      content: "Hello from the edge!",
    }),
  ]);

  return c.json({ userId, postId });
});

export default app;
