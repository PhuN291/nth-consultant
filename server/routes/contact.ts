import { Router } from "express";
import rateLimit from "express-rate-limit";
import { storage } from "../storage";
import { insertContactSubmissionSchema } from "@shared/schema";
import { requireAdmin } from "../middleware/requireAdmin";

const router = Router();

// Public: submit form — rate-limit chống spam: 5 lần / 10 phút / IP
const submitLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Bạn đã gửi quá nhiều yêu cầu. Vui lòng thử lại sau." },
});

router.post("/", submitLimiter, async (req, res, next) => {
  try {
    const parsed = insertContactSubmissionSchema.safeParse(req.body);
    if (!parsed.success) {
      return res
        .status(400)
        .json({ message: "Dữ liệu không hợp lệ", errors: parsed.error.flatten() });
    }
    // Normalize empty strings → null
    const data = { ...parsed.data };
    (["title", "company", "email", "service", "message", "source"] as const).forEach((k) => {
      if (data[k] === "") (data as any)[k] = null;
    });

    const submission = await storage.createContactSubmission(data);
    return res.status(201).json({ id: submission.id });
  } catch (err) {
    next(err);
  }
});

// ----------------------------------------------------------------------
// Admin endpoints
// ----------------------------------------------------------------------
export const adminContactRouter = Router();
adminContactRouter.use(requireAdmin);

adminContactRouter.get("/", async (_req, res, next) => {
  try {
    const items = await storage.listContactSubmissions();
    return res.json({ items });
  } catch (err) {
    next(err);
  }
});

adminContactRouter.patch("/:id", async (req, res, next) => {
  try {
    const handled = req.body?.handled;
    if (typeof handled !== "boolean") {
      return res.status(400).json({ message: "handled phải là boolean" });
    }
    const item = await storage.setContactSubmissionHandled(req.params.id, handled);
    if (!item) return res.status(404).json({ message: "Không tìm thấy" });
    return res.json(item);
  } catch (err) {
    next(err);
  }
});

adminContactRouter.delete("/:id", async (req, res, next) => {
  try {
    const ok = await storage.deleteContactSubmission(req.params.id);
    if (!ok) return res.status(404).json({ message: "Không tìm thấy" });
    return res.json({ ok: true });
  } catch (err) {
    next(err);
  }
});

export default router;
