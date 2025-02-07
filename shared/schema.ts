import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const confessions = pgTable("confessions", {
  id: serial("id").primaryKey(),
  message: text("message").notNull(),
  recipientName: text("recipient_name").notNull(),
  senderName: text("sender_name").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertConfessionSchema = createInsertSchema(confessions).pick({
  message: true,
  recipientName: true,
  senderName: true,
}).extend({
  message: z.string().min(1).max(1000),
  recipientName: z.string().min(1).max(100),
  senderName: z.string().min(1).max(100),
});

export type InsertConfession = z.infer<typeof insertConfessionSchema>;
export type Confession = typeof confessions.$inferSelect;
