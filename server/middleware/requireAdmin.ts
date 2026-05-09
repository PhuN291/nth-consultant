import type { Request, Response, NextFunction } from "express";

declare module "express-session" {
  interface SessionData {
    adminId?: string;
    adminUsername?: string;
  }
}

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (req.session?.adminId) {
    return next();
  }
  return res.status(401).json({ message: "Unauthorized" });
}
