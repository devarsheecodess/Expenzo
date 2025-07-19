import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";
import { users } from "./users";

export const expenses = sqliteTable("expenses", {
  id: text().notNull().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  title: text().notNull(),
  description: text().notNull(),
  amount: integer().notNull(),
  date: text().notNull(),
  type: text().notNull(),
});
