import type { Express } from "express";
import { type Server } from "http";
import authRouter from "./routes/auth";
import blogRouter, { adminBlogRouter } from "./routes/blog";
import uploadRouter from "./routes/upload";
import contactRouter, { adminContactRouter } from "./routes/contact";

export async function registerRoutes(
  _httpServer: Server,
  app: Express
): Promise<Server> {
  // Public APIs
  app.use("/api/auth", authRouter);
  app.use("/api/blog", blogRouter);
  app.use("/api/contact", contactRouter);

  // Admin APIs (auth + blog admin CRUD + upload + contact)
  app.use("/api/admin/blog", adminBlogRouter);
  app.use("/api/admin/upload", uploadRouter);
  app.use("/api/admin/contact", adminContactRouter);

  return _httpServer;
}
