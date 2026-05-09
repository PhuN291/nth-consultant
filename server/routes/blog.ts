import { Router } from "express";
import sanitizeHtml from "sanitize-html";
import { z } from "zod";
import { storage } from "../storage";
import { insertBlogPostSchema, updateBlogPostSchema } from "@shared/schema";
import { requireAdmin } from "../middleware/requireAdmin";

const router = Router();

// Sanitize HTML content từ Tiptap để tránh XSS
const sanitizeOptions: sanitizeHtml.IOptions = {
  allowedTags: [
    "p", "br", "h1", "h2", "h3", "h4", "h5", "h6",
    "strong", "em", "u", "s", "code", "pre", "blockquote",
    "ul", "ol", "li",
    "a", "img",
    "hr",
    "table", "thead", "tbody", "tr", "th", "td",
    "div", "span",
  ],
  allowedAttributes: {
    a: ["href", "title", "target", "rel"],
    img: ["src", "alt", "title", "width", "height"],
    "*": ["class"],
  },
  allowedSchemes: ["http", "https", "mailto"],
  transformTags: {
    a: sanitizeHtml.simpleTransform("a", { rel: "noopener noreferrer", target: "_blank" }),
  },
};

function cleanContent(html: string): string {
  return sanitizeHtml(html ?? "", sanitizeOptions);
}

// ----------------------------------------------------------------------
// Public endpoints
// ----------------------------------------------------------------------
router.get("/", async (req, res, next) => {
  try {
    const querySchema = z.object({
      page: z.coerce.number().int().min(1).optional(),
      pageSize: z.coerce.number().int().min(1).max(50).optional(),
      category: z.string().optional(),
      search: z.string().optional(),
    });
    const parsed = querySchema.safeParse(req.query);
    if (!parsed.success) {
      return res.status(400).json({ message: "Tham số không hợp lệ" });
    }
    const result = await storage.listBlogPosts({
      ...parsed.data,
      publishedOnly: true,
    });
    return res.json(result);
  } catch (err) {
    next(err);
  }
});

router.get("/:slug", async (req, res, next) => {
  try {
    const post = await storage.getBlogPostBySlug(req.params.slug);
    if (!post || !post.published) {
      return res.status(404).json({ message: "Không tìm thấy bài viết" });
    }
    return res.json(post);
  } catch (err) {
    next(err);
  }
});

// ----------------------------------------------------------------------
// Admin endpoints (mounted under /api/admin/blog with requireAdmin)
// ----------------------------------------------------------------------
export const adminBlogRouter = Router();

adminBlogRouter.use(requireAdmin);

adminBlogRouter.get("/", async (req, res, next) => {
  try {
    const querySchema = z.object({
      page: z.coerce.number().int().min(1).optional(),
      pageSize: z.coerce.number().int().min(1).max(50).optional(),
      search: z.string().optional(),
    });
    const parsed = querySchema.safeParse(req.query);
    if (!parsed.success) {
      return res.status(400).json({ message: "Tham số không hợp lệ" });
    }
    // Admin thấy tất cả bài (cả draft)
    const result = await storage.listBlogPosts({
      ...parsed.data,
      publishedOnly: false,
    });
    return res.json(result);
  } catch (err) {
    next(err);
  }
});

adminBlogRouter.get("/:id", async (req, res, next) => {
  try {
    const post = await storage.getBlogPostById(req.params.id);
    if (!post) return res.status(404).json({ message: "Không tìm thấy bài viết" });
    return res.json(post);
  } catch (err) {
    next(err);
  }
});

adminBlogRouter.post("/", async (req, res, next) => {
  try {
    const parsed = insertBlogPostSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: "Dữ liệu không hợp lệ", errors: parsed.error.flatten() });
    }
    const data = { ...parsed.data, contentHtml: cleanContent(parsed.data.contentHtml ?? "") };

    // Slug uniqueness check
    const existing = await storage.getBlogPostBySlug(data.slug);
    if (existing) {
      return res.status(409).json({ message: "Slug đã tồn tại. Vui lòng chọn slug khác." });
    }

    const post = await storage.createBlogPost(data);
    return res.status(201).json(post);
  } catch (err) {
    next(err);
  }
});

adminBlogRouter.put("/:id", async (req, res, next) => {
  try {
    const parsed = updateBlogPostSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: "Dữ liệu không hợp lệ", errors: parsed.error.flatten() });
    }
    const data = { ...parsed.data };
    if (data.contentHtml !== undefined) {
      data.contentHtml = cleanContent(data.contentHtml);
    }

    // Nếu đổi slug, kiểm tra unique
    if (data.slug) {
      const existing = await storage.getBlogPostBySlug(data.slug);
      if (existing && existing.id !== req.params.id) {
        return res.status(409).json({ message: "Slug đã tồn tại." });
      }
    }

    const post = await storage.updateBlogPost(req.params.id, data);
    if (!post) return res.status(404).json({ message: "Không tìm thấy bài viết" });
    return res.json(post);
  } catch (err) {
    next(err);
  }
});

adminBlogRouter.delete("/:id", async (req, res, next) => {
  try {
    const ok = await storage.deleteBlogPost(req.params.id);
    if (!ok) return res.status(404).json({ message: "Không tìm thấy bài viết" });
    return res.json({ ok: true });
  } catch (err) {
    next(err);
  }
});

export default router;
