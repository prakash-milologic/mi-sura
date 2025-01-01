import { relations } from "drizzle-orm";
import {
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { permission } from "./permission";
import { plant } from "./plant";
import { device } from "./device";

export const user = pgTable("user", {
  id: uuid("id").primaryKey(),
  name: varchar("name").notNull(),
  email: text("email").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
});

export const userRelations = relations(user, ({ one, many }) => ({
  plants: many(plant),
  permission: one(permission),
}));

export type User = typeof user.$inferSelect; // return type when queried
