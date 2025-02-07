import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { insertConfessionSchema } from "@shared/schema";

export function registerRoutes(app: Express) {
  app.post("/api/confessions", async (req, res) => {
    try {
      const confession = insertConfessionSchema.parse(req.body);
      const created = await storage.createConfession(confession);
      res.json(created);
    } catch (error) {
      res.status(400).json({ message: "Invalid confession data" });
    }
  });

  app.get("/api/confessions/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid confession ID" });
    }

    const confession = await storage.getConfession(id);
    if (!confession) {
      return res.status(404).json({ message: "Confession not found" });
    }

    res.json(confession);
  });

  return createServer(app);
}
