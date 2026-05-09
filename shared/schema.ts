import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, boolean, index } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// ----------------------------------------------------------------------
// Users (kept for IStorage compatibility — not actively used)
// ----------------------------------------------------------------------
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// ----------------------------------------------------------------------
// Admin users — login để quản lý blog
// ----------------------------------------------------------------------
export const adminUsers = pgTable("admin_users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type AdminUser = typeof adminUsers.$inferSelect;

// ----------------------------------------------------------------------
// Blog posts
// ----------------------------------------------------------------------
export const blogPosts = pgTable(
  "blog_posts",
  {
    id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
    slug: text("slug").notNull().unique(),
    title: text("title").notNull(),
    excerpt: text("excerpt").notNull().default(""),
    contentHtml: text("content_html").notNull().default(""),
    coverImageUrl: text("cover_image_url"),
    category: text("category").notNull().default("Tin tức"),
    author: text("author").notNull().default("NTH Consulting"),
    published: boolean("published").notNull().default(false),
    publishedAt: timestamp("published_at"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => ({
    publishedIdx: index("blog_posts_published_idx").on(table.published, table.publishedAt),
    categoryIdx: index("blog_posts_category_idx").on(table.category),
  }),
);

export const insertBlogPostSchema = createInsertSchema(blogPosts, {
  slug: z.string().min(1).max(200).regex(/^[a-z0-9-]+$/, "Slug chỉ chứa chữ thường, số và dấu gạch ngang"),
  title: z.string().min(1).max(300),
  excerpt: z.string().max(500).optional().default(""),
  contentHtml: z.string().default(""),
  coverImageUrl: z.string().url().optional().nullable(),
  category: z.string().min(1).max(100).optional().default("Tin tức"),
  author: z.string().min(1).max(100).optional().default("NTH Consulting"),
  published: z.boolean().optional().default(false),
}).omit({ id: true, createdAt: true, updatedAt: true, publishedAt: true });

export const updateBlogPostSchema = insertBlogPostSchema.partial();

export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type UpdateBlogPost = z.infer<typeof updateBlogPostSchema>;

// ----------------------------------------------------------------------
// Contact submissions — yêu cầu tư vấn từ form public
// ----------------------------------------------------------------------
export const contactSubmissions = pgTable(
  "contact_submissions",
  {
    id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
    name: text("name").notNull(),
    phone: text("phone").notNull(),
    title: text("title"), // chức danh
    company: text("company"),
    email: text("email"),
    service: text("service"),
    message: text("message"),
    source: text("source"), // URL/button context
    handled: boolean("handled").notNull().default(false), // đã xử lý
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (table) => ({
    createdAtIdx: index("contact_submissions_created_at_idx").on(table.createdAt),
    handledIdx: index("contact_submissions_handled_idx").on(table.handled),
  }),
);

export const insertContactSubmissionSchema = createInsertSchema(contactSubmissions, {
  name: z.string().min(1, "Vui lòng nhập tên").max(200),
  phone: z
    .string()
    .min(8, "Số điện thoại không hợp lệ")
    .max(20)
    .regex(/^[+0-9\s().-]+$/, "Số điện thoại không hợp lệ"),
  title: z.string().max(200).optional().nullable(),
  company: z.string().max(200).optional().nullable(),
  email: z.string().email().optional().nullable().or(z.literal("")),
  service: z.string().max(200).optional().nullable(),
  message: z.string().max(2000).optional().nullable(),
  source: z.string().max(500).optional().nullable(),
}).omit({ id: true, createdAt: true, handled: true });

export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type InsertContactSubmission = z.infer<typeof insertContactSubmissionSchema>;

// ----------------------------------------------------------------------
// Sessions table for connect-pg-simple
// (Schema được connect-pg-simple tự tạo nếu createTableIfMissing: true,
//  nhưng khai báo ở đây để Drizzle theo dõi.)
// ----------------------------------------------------------------------
export const sessions = pgTable("session", {
  sid: varchar("sid").primaryKey(),
  sess: text("sess").notNull(),
  expire: timestamp("expire", { precision: 6 }).notNull(),
});
