import {
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { user } from "./user";
import { relations } from "drizzle-orm";

export const permission = pgTable("permission", {
  id: uuid("id").primaryKey().defaultRandom(),
  role: varchar("role").notNull(),
  status: varchar("status").notNull(),
  userId: uuid("user_id").references(() => user.id, {
    onUpdate: "cascade",
    onDelete: "cascade",
  }),
  createdBy: uuid("created_by"),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
});

export const permissionRelations = relations(permission, ({ one }) => ({
  user: one(user, {
    fields: [permission.userId],
    references: [user.id],
  }),
  // createdBy: one(user, {
  //   fields: [permission.createdBy],
  //   references: [user.id],
  // }),
}));
