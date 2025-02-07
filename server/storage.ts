import { confessions, type Confession, type InsertConfession } from "@shared/schema";

export interface IStorage {
  createConfession(confession: InsertConfession): Promise<Confession>;
  getConfession(id: number): Promise<Confession | undefined>;
}

export class MemStorage implements IStorage {
  private confessions: Map<number, Confession>;
  private currentId: number;

  constructor() {
    this.confessions = new Map();
    this.currentId = 1;
  }

  async createConfession(confession: InsertConfession): Promise<Confession> {
    const id = this.currentId++;
    const newConfession: Confession = {
      ...confession,
      id,
      createdAt: new Date(),
    };
    this.confessions.set(id, newConfession);
    return newConfession;
  }

  async getConfession(id: number): Promise<Confession | undefined> {
    return this.confessions.get(id);
  }
}

export const storage = new MemStorage();
