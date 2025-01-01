import {
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { User, user } from "./user";
import { relations } from "drizzle-orm";
import { Plant, plant } from "./plant";

export const device = pgTable("device", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  serialNumber: varchar("serial_number", { length: 256 }).notNull().unique(),
  plantId: integer("plant_id").references(() => plant.id, {
    onUpdate: "cascade",
    onDelete: "set null",
  }),
  createdBy: uuid("created_by").references(() => user.id, {
    onUpdate: "cascade",
    onDelete: "cascade",
  }),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
});

export const deviceRelations = relations(device, ({ one }) => ({
  plant: one(plant, {
    fields: [device.plantId],
    references: [plant.id],
  }),
}));

export type Device = typeof device.$inferSelect; // return type when queried
export type DeviceWithPlant = {
  plant: Plant | null;
} & Device;
export type NewDevice = typeof device.$inferInsert; // insert type
