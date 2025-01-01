import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const invt = pgTable("invt", {
  sn: text("sn"),
  timestamp: timestamp("timestamp", {
    withTimezone: true,
    mode: "string",
  }).notNull(),
  internaltemp: integer("internaltemp"),
  pv1InputVoltageV: integer("pv1_input_voltage_v"),
  pv1InputCurrentA: integer("pv1_input_current_a"),
  dailyGenerationKwh: integer("daily_generation_kwh"),
  totalPowerGenerationKwh: integer("total_power_generation_kwh"),
  alarm: text("alarm"),
  dailyLoadKwh: integer("daily_load_kwh"),
  totalLoadConsumptionKwh: integer("total_load_consumption_kwh"),
  totalreactivepowerVar: integer("totalreactivepower_var"),
  activepowerW: integer("activepower_w"),
  loadPowerKw: integer("load_power_kw"),
});
