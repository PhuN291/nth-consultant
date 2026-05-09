var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// server/app.ts
import "dotenv/config";
import express from "express";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import { createServer } from "http";

// server/routes/auth.ts
import { Router } from "express";
import bcrypt from "bcrypt";
import rateLimit from "express-rate-limit";
import { z as z2 } from "zod";

// shared/schema.ts
var schema_exports = {};
__export(schema_exports, {
  adminUsers: () => adminUsers,
  blogPosts: () => blogPosts,
  contactSubmissions: () => contactSubmissions,
  insertBlogPostSchema: () => insertBlogPostSchema,
  insertContactSubmissionSchema: () => insertContactSubmissionSchema,
  insertUserSchema: () => insertUserSchema,
  sessions: () => sessions,
  updateBlogPostSchema: () => updateBlogPostSchema,
  users: () => users
});
import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, boolean, index } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
var users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull()
});
var insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true
});
var adminUsers = pgTable("admin_users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow()
});
var blogPosts = pgTable(
  "blog_posts",
  {
    id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
    slug: text("slug").notNull().unique(),
    title: text("title").notNull(),
    excerpt: text("excerpt").notNull().default(""),
    contentHtml: text("content_html").notNull().default(""),
    coverImageUrl: text("cover_image_url"),
    category: text("category").notNull().default("Tin t\u1EE9c"),
    author: text("author").notNull().default("\u0110\u0103ng L\xE2m"),
    published: boolean("published").notNull().default(false),
    publishedAt: timestamp("published_at"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow()
  },
  (table) => ({
    publishedIdx: index("blog_posts_published_idx").on(table.published, table.publishedAt),
    categoryIdx: index("blog_posts_category_idx").on(table.category)
  })
);
var insertBlogPostSchema = createInsertSchema(blogPosts, {
  slug: z.string().min(1).max(200).regex(/^[a-z0-9-]+$/, "Slug ch\u1EC9 ch\u1EE9a ch\u1EEF th\u01B0\u1EDDng, s\u1ED1 v\xE0 d\u1EA5u g\u1EA1ch ngang"),
  title: z.string().min(1).max(300),
  excerpt: z.string().max(500).optional().default(""),
  contentHtml: z.string().default(""),
  coverImageUrl: z.string().url().optional().nullable(),
  category: z.string().min(1).max(100).optional().default("Tin t\u1EE9c"),
  author: z.string().min(1).max(100).optional().default("\u0110\u0103ng L\xE2m"),
  published: z.boolean().optional().default(false)
}).omit({ id: true, createdAt: true, updatedAt: true, publishedAt: true });
var updateBlogPostSchema = insertBlogPostSchema.partial();
var contactSubmissions = pgTable(
  "contact_submissions",
  {
    id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
    name: text("name").notNull(),
    phone: text("phone").notNull(),
    title: text("title"),
    // chức danh
    company: text("company"),
    email: text("email"),
    service: text("service"),
    message: text("message"),
    source: text("source"),
    // URL/button context
    handled: boolean("handled").notNull().default(false),
    // đã xử lý
    createdAt: timestamp("created_at").notNull().defaultNow()
  },
  (table) => ({
    createdAtIdx: index("contact_submissions_created_at_idx").on(table.createdAt),
    handledIdx: index("contact_submissions_handled_idx").on(table.handled)
  })
);
var insertContactSubmissionSchema = createInsertSchema(contactSubmissions, {
  name: z.string().min(1, "Vui l\xF2ng nh\u1EADp t\xEAn").max(200),
  phone: z.string().min(8, "S\u1ED1 \u0111i\u1EC7n tho\u1EA1i kh\xF4ng h\u1EE3p l\u1EC7").max(20).regex(/^[+0-9\s().-]+$/, "S\u1ED1 \u0111i\u1EC7n tho\u1EA1i kh\xF4ng h\u1EE3p l\u1EC7"),
  title: z.string().max(200).optional().nullable(),
  company: z.string().max(200).optional().nullable(),
  email: z.string().email().optional().nullable().or(z.literal("")),
  service: z.string().max(200).optional().nullable(),
  message: z.string().max(2e3).optional().nullable(),
  source: z.string().max(500).optional().nullable()
}).omit({ id: true, createdAt: true, handled: true });
var sessions = pgTable("session", {
  sid: varchar("sid").primaryKey(),
  sess: text("sess").notNull(),
  expire: timestamp("expire", { precision: 6 }).notNull()
});

// server/db.ts
import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL is not set. Add it to .env (Neon connection string)."
  );
}
var pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Neon yêu cầu SSL — connection string đã có sslmode=require
  ssl: process.env.DATABASE_URL.includes("sslmode=") ? void 0 : { rejectUnauthorized: false },
  max: 10
});
var db = drizzle(pool, { schema: schema_exports });

// server/storage.ts
import { and, desc, eq, sql as sql2 } from "drizzle-orm";
import { randomUUID } from "crypto";
var DbStorage = class {
  async getUser(id) {
    const rows = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return rows[0];
  }
  async getUserByUsername(username) {
    const rows = await db.select().from(users).where(eq(users.username, username)).limit(1);
    return rows[0];
  }
  async createUser(insertUser) {
    const id = randomUUID();
    const [row] = await db.insert(users).values({ id, ...insertUser }).returning();
    return row;
  }
  async getAdminByUsername(username) {
    const rows = await db.select().from(adminUsers).where(eq(adminUsers.username, username)).limit(1);
    return rows[0];
  }
  async createAdmin(username, passwordHash) {
    const [row] = await db.insert(adminUsers).values({ username, passwordHash }).returning();
    return row;
  }
  async listBlogPosts(opts = {}) {
    const page = Math.max(1, opts.page ?? 1);
    const pageSize = Math.min(50, Math.max(1, opts.pageSize ?? 20));
    const offset = (page - 1) * pageSize;
    const filters = [];
    if (opts.publishedOnly) filters.push(eq(blogPosts.published, true));
    if (opts.category) filters.push(eq(blogPosts.category, opts.category));
    if (opts.search) {
      const like = `%${opts.search.toLowerCase()}%`;
      filters.push(sql2`(LOWER(${blogPosts.title}) LIKE ${like} OR LOWER(${blogPosts.excerpt}) LIKE ${like})`);
    }
    const whereClause = filters.length ? and(...filters) : void 0;
    const [postsRows, countRows] = await Promise.all([
      db.select().from(blogPosts).where(whereClause).orderBy(desc(blogPosts.publishedAt), desc(blogPosts.createdAt)).limit(pageSize).offset(offset),
      db.select({ count: sql2`count(*)::int` }).from(blogPosts).where(whereClause)
    ]);
    return { posts: postsRows, total: countRows[0]?.count ?? 0 };
  }
  async getBlogPostBySlug(slug) {
    const rows = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug)).limit(1);
    return rows[0];
  }
  async getBlogPostById(id) {
    const rows = await db.select().from(blogPosts).where(eq(blogPosts.id, id)).limit(1);
    return rows[0];
  }
  async createBlogPost(data) {
    const publishedAt = data.published ? /* @__PURE__ */ new Date() : null;
    const [row] = await db.insert(blogPosts).values({ ...data, publishedAt }).returning();
    return row;
  }
  async updateBlogPost(id, data) {
    const existing = await this.getBlogPostById(id);
    if (!existing) return void 0;
    const updates = { ...data, updatedAt: /* @__PURE__ */ new Date() };
    if (data.published === true && !existing.published) {
      updates.publishedAt = /* @__PURE__ */ new Date();
    }
    if (data.published === false) {
      updates.publishedAt = null;
    }
    const [row] = await db.update(blogPosts).set(updates).where(eq(blogPosts.id, id)).returning();
    return row;
  }
  async deleteBlogPost(id) {
    const result = await db.delete(blogPosts).where(eq(blogPosts.id, id)).returning();
    return result.length > 0;
  }
  async createContactSubmission(data) {
    const [row] = await db.insert(contactSubmissions).values(data).returning();
    return row;
  }
  async listContactSubmissions() {
    return db.select().from(contactSubmissions).orderBy(desc(contactSubmissions.createdAt));
  }
  async setContactSubmissionHandled(id, handled) {
    const [row] = await db.update(contactSubmissions).set({ handled }).where(eq(contactSubmissions.id, id)).returning();
    return row;
  }
  async deleteContactSubmission(id) {
    const result = await db.delete(contactSubmissions).where(eq(contactSubmissions.id, id)).returning();
    return result.length > 0;
  }
};
var storage = new DbStorage();

// server/routes/auth.ts
var router = Router();
var loginSchema = z2.object({
  username: z2.string().min(1).max(100),
  password: z2.string().min(1).max(200)
});
var loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1e3,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Qu\xE1 nhi\u1EC1u l\u1EA7n th\u1EED \u0111\u0103ng nh\u1EADp. Vui l\xF2ng th\u1EED l\u1EA1i sau 15 ph\xFAt." }
});
router.post("/login", loginLimiter, async (req, res, next) => {
  try {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: "Thi\u1EBFu username ho\u1EB7c password" });
    }
    const { username, password } = parsed.data;
    const admin = await storage.getAdminByUsername(username);
    if (!admin) {
      await bcrypt.compare(password, "$2b$10$invalidinvalidinvalidinvalidinvalidinvalidinvalidinvali");
      return res.status(401).json({ message: "Sai th\xF4ng tin \u0111\u0103ng nh\u1EADp" });
    }
    const ok = await bcrypt.compare(password, admin.passwordHash);
    if (!ok) {
      return res.status(401).json({ message: "Sai th\xF4ng tin \u0111\u0103ng nh\u1EADp" });
    }
    req.session.adminId = admin.id;
    req.session.adminUsername = admin.username;
    return res.json({
      id: admin.id,
      username: admin.username
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
      username: req.session.adminUsername
    });
  }
  return res.status(401).json({ message: "Not logged in" });
});
var auth_default = router;

// server/routes/blog.ts
import { Router as Router2 } from "express";
import sanitizeHtml from "sanitize-html";
import { z as z3 } from "zod";

// server/middleware/requireAdmin.ts
function requireAdmin(req, res, next) {
  if (req.session?.adminId) {
    return next();
  }
  return res.status(401).json({ message: "Unauthorized" });
}

// server/routes/blog.ts
var router2 = Router2();
var sanitizeOptions = {
  allowedTags: [
    "p",
    "br",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "strong",
    "em",
    "u",
    "s",
    "code",
    "pre",
    "blockquote",
    "ul",
    "ol",
    "li",
    "a",
    "img",
    "hr",
    "table",
    "thead",
    "tbody",
    "tr",
    "th",
    "td",
    "div",
    "span"
  ],
  allowedAttributes: {
    a: ["href", "title", "target", "rel"],
    img: ["src", "alt", "title", "width", "height"],
    "*": ["class"]
  },
  allowedSchemes: ["http", "https", "mailto"],
  transformTags: {
    a: sanitizeHtml.simpleTransform("a", { rel: "noopener noreferrer", target: "_blank" })
  }
};
function cleanContent(html) {
  return sanitizeHtml(html ?? "", sanitizeOptions);
}
router2.get("/", async (req, res, next) => {
  try {
    const querySchema = z3.object({
      page: z3.coerce.number().int().min(1).optional(),
      pageSize: z3.coerce.number().int().min(1).max(50).optional(),
      category: z3.string().optional(),
      search: z3.string().optional()
    });
    const parsed = querySchema.safeParse(req.query);
    if (!parsed.success) {
      return res.status(400).json({ message: "Tham s\u1ED1 kh\xF4ng h\u1EE3p l\u1EC7" });
    }
    const result = await storage.listBlogPosts({
      ...parsed.data,
      publishedOnly: true
    });
    return res.json(result);
  } catch (err) {
    next(err);
  }
});
router2.get("/:slug", async (req, res, next) => {
  try {
    const post = await storage.getBlogPostBySlug(req.params.slug);
    if (!post || !post.published) {
      return res.status(404).json({ message: "Kh\xF4ng t\xECm th\u1EA5y b\xE0i vi\u1EBFt" });
    }
    return res.json(post);
  } catch (err) {
    next(err);
  }
});
var adminBlogRouter = Router2();
adminBlogRouter.use(requireAdmin);
adminBlogRouter.get("/", async (req, res, next) => {
  try {
    const querySchema = z3.object({
      page: z3.coerce.number().int().min(1).optional(),
      pageSize: z3.coerce.number().int().min(1).max(50).optional(),
      search: z3.string().optional()
    });
    const parsed = querySchema.safeParse(req.query);
    if (!parsed.success) {
      return res.status(400).json({ message: "Tham s\u1ED1 kh\xF4ng h\u1EE3p l\u1EC7" });
    }
    const result = await storage.listBlogPosts({
      ...parsed.data,
      publishedOnly: false
    });
    return res.json(result);
  } catch (err) {
    next(err);
  }
});
adminBlogRouter.get("/:id", async (req, res, next) => {
  try {
    const post = await storage.getBlogPostById(req.params.id);
    if (!post) return res.status(404).json({ message: "Kh\xF4ng t\xECm th\u1EA5y b\xE0i vi\u1EBFt" });
    return res.json(post);
  } catch (err) {
    next(err);
  }
});
adminBlogRouter.post("/", async (req, res, next) => {
  try {
    const parsed = insertBlogPostSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: "D\u1EEF li\u1EC7u kh\xF4ng h\u1EE3p l\u1EC7", errors: parsed.error.flatten() });
    }
    const data = { ...parsed.data, contentHtml: cleanContent(parsed.data.contentHtml ?? "") };
    const existing = await storage.getBlogPostBySlug(data.slug);
    if (existing) {
      return res.status(409).json({ message: "Slug \u0111\xE3 t\u1ED3n t\u1EA1i. Vui l\xF2ng ch\u1ECDn slug kh\xE1c." });
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
      return res.status(400).json({ message: "D\u1EEF li\u1EC7u kh\xF4ng h\u1EE3p l\u1EC7", errors: parsed.error.flatten() });
    }
    const data = { ...parsed.data };
    if (data.contentHtml !== void 0) {
      data.contentHtml = cleanContent(data.contentHtml);
    }
    if (data.slug) {
      const existing = await storage.getBlogPostBySlug(data.slug);
      if (existing && existing.id !== req.params.id) {
        return res.status(409).json({ message: "Slug \u0111\xE3 t\u1ED3n t\u1EA1i." });
      }
    }
    const post = await storage.updateBlogPost(req.params.id, data);
    if (!post) return res.status(404).json({ message: "Kh\xF4ng t\xECm th\u1EA5y b\xE0i vi\u1EBFt" });
    return res.json(post);
  } catch (err) {
    next(err);
  }
});
adminBlogRouter.delete("/:id", async (req, res, next) => {
  try {
    const ok = await storage.deleteBlogPost(req.params.id);
    if (!ok) return res.status(404).json({ message: "Kh\xF4ng t\xECm th\u1EA5y b\xE0i vi\u1EBFt" });
    return res.json({ ok: true });
  } catch (err) {
    next(err);
  }
});
var blog_default = router2;

// server/routes/upload.ts
import { Router as Router3 } from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
var router3 = Router3();
if (process.env.CLOUDINARY_URL) {
  cloudinary.config({ secure: true });
}
var upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  // 5MB
  fileFilter(_req, file, cb) {
    const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowed.includes(file.mimetype)) {
      return cb(new Error("Ch\u1EC9 ch\u1EA5p nh\u1EADn \u1EA3nh JPG, PNG, WEBP, GIF"));
    }
    cb(null, true);
  }
});
router3.post("/", requireAdmin, upload.single("file"), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Kh\xF4ng c\xF3 file \u0111\u01B0\u1EE3c upload" });
    }
    if (!process.env.CLOUDINARY_URL) {
      return res.status(500).json({ message: "Cloudinary ch\u01B0a \u0111\u01B0\u1EE3c c\u1EA5u h\xECnh (CLOUDINARY_URL)" });
    }
    const result = await new Promise(
      (resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "accounting-hub/blog",
            resource_type: "image",
            transformation: [{ quality: "auto:good", fetch_format: "auto" }]
          },
          (err, uploaded) => {
            if (err || !uploaded) return reject(err);
            resolve({
              secure_url: uploaded.secure_url,
              public_id: uploaded.public_id,
              width: uploaded.width,
              height: uploaded.height
            });
          }
        );
        stream.end(req.file.buffer);
      }
    );
    return res.json({ url: result.secure_url, ...result });
  } catch (err) {
    if (err?.message?.includes("File too large")) {
      return res.status(413).json({ message: "\u1EA2nh qu\xE1 l\u1EDBn (t\u1ED1i \u0111a 5MB)" });
    }
    next(err);
  }
});
var upload_default = router3;

// server/routes/contact.ts
import { Router as Router4 } from "express";
import rateLimit2 from "express-rate-limit";
var router4 = Router4();
var submitLimiter = rateLimit2({
  windowMs: 10 * 60 * 1e3,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "B\u1EA1n \u0111\xE3 g\u1EEDi qu\xE1 nhi\u1EC1u y\xEAu c\u1EA7u. Vui l\xF2ng th\u1EED l\u1EA1i sau." }
});
router4.post("/", submitLimiter, async (req, res, next) => {
  try {
    const parsed = insertContactSubmissionSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: "D\u1EEF li\u1EC7u kh\xF4ng h\u1EE3p l\u1EC7", errors: parsed.error.flatten() });
    }
    const data = { ...parsed.data };
    ["title", "company", "email", "service", "message", "source"].forEach((k) => {
      if (data[k] === "") data[k] = null;
    });
    const submission = await storage.createContactSubmission(data);
    return res.status(201).json({ id: submission.id });
  } catch (err) {
    next(err);
  }
});
var adminContactRouter = Router4();
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
      return res.status(400).json({ message: "handled ph\u1EA3i l\xE0 boolean" });
    }
    const item = await storage.setContactSubmissionHandled(req.params.id, handled);
    if (!item) return res.status(404).json({ message: "Kh\xF4ng t\xECm th\u1EA5y" });
    return res.json(item);
  } catch (err) {
    next(err);
  }
});
adminContactRouter.delete("/:id", async (req, res, next) => {
  try {
    const ok = await storage.deleteContactSubmission(req.params.id);
    if (!ok) return res.status(404).json({ message: "Kh\xF4ng t\xECm th\u1EA5y" });
    return res.json({ ok: true });
  } catch (err) {
    next(err);
  }
});
var contact_default = router4;

// server/routes.ts
async function registerRoutes(_httpServer, app) {
  app.use("/api/auth", auth_default);
  app.use("/api/blog", blog_default);
  app.use("/api/contact", contact_default);
  app.use("/api/admin/blog", adminBlogRouter);
  app.use("/api/admin/upload", upload_default);
  app.use("/api/admin/contact", adminContactRouter);
  return _httpServer;
}

// server/app.ts
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function buildApp() {
  const app = express();
  const httpServer = createServer(app);
  app.set("trust proxy", 1);
  const PgSession = connectPgSimple(session);
  if (!process.env.SESSION_SECRET) {
    console.warn(
      "[warn] SESSION_SECRET is not set \u2014 using a random secret. Sessions will be invalidated on every restart."
    );
  }
  app.use(
    session({
      store: new PgSession({
        pool,
        tableName: "session",
        createTableIfMissing: true
      }),
      secret: process.env.SESSION_SECRET || `dev-${Math.random().toString(36).slice(2)}`,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1e3
      }
    })
  );
  app.use(
    express.json({
      verify: (req, _res, buf) => {
        req.rawBody = buf;
      }
    })
  );
  app.use(express.urlencoded({ extended: false }));
  app.use((req, res, next) => {
    const start = Date.now();
    const path = req.path;
    let capturedJsonResponse = void 0;
    const originalResJson = res.json;
    res.json = function(bodyJson, ...args) {
      capturedJsonResponse = bodyJson;
      return originalResJson.apply(res, [bodyJson, ...args]);
    };
    res.on("finish", () => {
      const duration = Date.now() - start;
      if (path.startsWith("/api")) {
        let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
        if (capturedJsonResponse) {
          logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
        }
        log(logLine);
      }
    });
    next();
  });
  await registerRoutes(httpServer, app);
  app.use((err, _req, res, next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    console.error("Internal Server Error:", err);
    if (res.headersSent) {
      return next(err);
    }
    return res.status(status).json({ message });
  });
  return { app, httpServer };
}

// api/_handler.ts
var appPromise;
function getApp() {
  if (!appPromise) {
    appPromise = buildApp().then(({ app }) => app);
  }
  return appPromise;
}
async function handler(req, res) {
  const app = await getApp();
  return app(req, res);
}
export {
  handler as default
};
