import { Router } from "express";
import bcrypt from "bcrypt";
import rateLimit from "express-rate-limit";
import { z } from "zod";
import { storage } from "../storage";

const router = Router();

const loginSchema = z.object({
  username: z.string().min(1).max(100),
  password: z.string().min(1).max(200),
});

// Rate-limit chống brute-force: 10 attempts / 15 phút / IP
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Quá nhiều lần thử đăng nhập. Vui lòng thử lại sau 15 phút." },
});

router.post("/login", loginLimiter, async (req, res, next) => {
  try {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: "Thiếu username hoặc password" });
    }
    const { username, password } = parsed.data;

    const admin = await storage.getAdminByUsername(username);
    if (!admin) {
      // Compare dummy hash để tránh timing attack
      await bcrypt.compare(password, "$2b$10$invalidinvalidinvalidinvalidinvalidinvalidinvalidinvali");
      return res.status(401).json({ message: "Sai thông tin đăng nhập" });
    }

    const ok = await bcrypt.compare(password, admin.passwordHash);
    if (!ok) {
      return res.status(401).json({ message: "Sai thông tin đăng nhập" });
    }

    req.session.adminId = admin.id;
    req.session.adminUsername = admin.username;

    return res.json({
      id: admin.id,
      username: admin.username,
    });
  } catch (err) {
    next(err);
  }
});

router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout failed" });
    }
    res.clearCookie("connect.sid");
    return res.json({ ok: true });
  });
});

router.get("/me", (req, res) => {
  if (req.session?.adminId) {
    return res.json({
      id: req.session.adminId,
      username: req.session.adminUsername,
    });
  }
  return res.status(401).json({ message: "Not logged in" });
});

export default router;
