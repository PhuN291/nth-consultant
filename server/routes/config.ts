import { Router } from "express";
import { requireAdmin } from "../middleware/requireAdmin";

const router = Router();

router.get("/", requireAdmin, (_req, res) => {
  res.json({
    cloudinary: Boolean(process.env.CLOUDINARY_URL),
  });
});

export default router;
