import {
  jsonb,
  numeric,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { User, user } from "./user";
import { relations } from "drizzle-orm";
import { Device, device } from "./device";

export const plant = pgTable("plant", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  capacity: numeric("capacity"),
  address: text("address").notNull(),
  coordinates: jsonb("coordinates")
    .$type<{ lat: number; lng: number }>()
    .notNull(),
  userId: uuid("user_id").references(() => user.id, {
    onUpdate: "cascade",
    onDelete: "set null",
  }),
  createdBy: uuid("created_by").references(() => user.id, {
    onUpdate: "cascade",
    onDelete: "set null",
  }),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
});

export const plantRelations = relations(plant, ({ one, many }) => ({
  user: one(user, {
    fields: [plant.userId],
    references: [user.id],
  }),
  devices: many(device),
  // createdBy: one(user, {
  //   fields: [permission.createdBy],
  //   references: [user.id],
  // }),
}));

export type Plant = typeof plant.$inferSelect; // return type when queried
export type PlantWithUser = {
  user: User | null;
  devices: Device[];
} & Plant;
export type NewPlant = typeof plant.$inferInsert; // insert type
