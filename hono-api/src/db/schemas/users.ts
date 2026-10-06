import { pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const usersRoleEnum = pgEnum("user_role", ["user", "admin"]);

export const UserTable = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  email: text().notNull().unique(),
  passwordHash: text().notNull(),
  role: usersRoleEnum().notNull().default("user"),
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
});
