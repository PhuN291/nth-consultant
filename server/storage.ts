import {
  users,
  blogPosts,
  adminUsers,
  contactSubmissions,
  type User,
  type InsertUser,
  type BlogPost,
  type InsertBlogPost,
  type UpdateBlogPost,
  type AdminUser,
  type ContactSubmission,
  type InsertContactSubmission,
} from "@shared/schema";
import { db } from "./db";
import { and, desc, eq, sql } from "drizzle-orm";
import { randomUUID } from "crypto";

export interface BlogListOptions {
  page?: number;
  pageSize?: number;
  category?: string;
  publishedOnly?: boolean;
  search?: string;
}

export interface BlogListResult {
  posts: BlogPost[];
  total: number;
}

export interface IStorage {
  // Users (legacy — giữ để không phá interface cũ)
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Admin auth
  getAdminByUsername(username: string): Promise<AdminUser | undefined>;
  createAdmin(username: string, passwordHash: string): Promise<AdminUser>;

  // Blog
  listBlogPosts(opts: BlogListOptions): Promise<BlogListResult>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  getBlogPostById(id: string): Promise<BlogPost | undefined>;
  createBlogPost(data: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: string, data: UpdateBlogPost): Promise<BlogPost | undefined>;
  deleteBlogPost(id: string): Promise<boolean>;

  // Contact submissions
  createContactSubmission(data: InsertContactSubmission): Promise<ContactSubmission>;
  listContactSubmissions(): Promise<ContactSubmission[]>;
  setContactSubmissionHandled(id: string, handled: boolean): Promise<ContactSubmission | undefined>;
  deleteContactSubmission(id: string): Promise<boolean>;
}

export class DbStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const rows = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return rows[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const rows = await db.select().from(users).where(eq(users.username, username)).limit(1);
    return rows[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const [row] = await db.insert(users).values({ id, ...insertUser }).returning();
    return row;
  }

  async getAdminByUsername(username: string): Promise<AdminUser | undefined> {
    const rows = await db
      .select()
      .from(adminUsers)
      .where(eq(adminUsers.username, username))
      .limit(1);
    return rows[0];
  }

  async createAdmin(username: string, passwordHash: string): Promise<AdminUser> {
    const [row] = await db
      .insert(adminUsers)
      .values({ username, passwordHash })
      .returning();
    return row;
  }

  async listBlogPosts(opts: BlogListOptions = {}): Promise<BlogListResult> {
    const page = Math.max(1, opts.page ?? 1);
    const pageSize = Math.min(50, Math.max(1, opts.pageSize ?? 20));
    const offset = (page - 1) * pageSize;

    const filters = [] as any[];
    if (opts.publishedOnly) filters.push(eq(blogPosts.published, true));
    if (opts.category) filters.push(eq(blogPosts.category, opts.category));
    if (opts.search) {
      const like = `%${opts.search.toLowerCase()}%`;
      filters.push(sql`(LOWER(${blogPosts.title}) LIKE ${like} OR LOWER(${blogPosts.excerpt}) LIKE ${like})`);
    }
    const whereClause = filters.length ? and(...filters) : undefined;

    const [postsRows, countRows] = await Promise.all([
      db
        .select()
        .from(blogPosts)
        .where(whereClause as any)
        .orderBy(desc(blogPosts.publishedAt), desc(blogPosts.createdAt))
        .limit(pageSize)
        .offset(offset),
      db
        .select({ count: sql<number>`count(*)::int` })
        .from(blogPosts)
        .where(whereClause as any),
    ]);

    return { posts: postsRows, total: countRows[0]?.count ?? 0 };
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const rows = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug)).limit(1);
    return rows[0];
  }

  async getBlogPostById(id: string): Promise<BlogPost | undefined> {
    const rows = await db.select().from(blogPosts).where(eq(blogPosts.id, id)).limit(1);
    return rows[0];
  }

  async createBlogPost(data: InsertBlogPost): Promise<BlogPost> {
    const publishedAt = data.published ? new Date() : null;
    const [row] = await db
      .insert(blogPosts)
      .values({ ...data, publishedAt })
      .returning();
    return row;
  }

  async updateBlogPost(id: string, data: UpdateBlogPost): Promise<BlogPost | undefined> {
    const existing = await this.getBlogPostById(id);
    if (!existing) return undefined;

    const updates: Record<string, unknown> = { ...data, updatedAt: new Date() };
    // Set publishedAt khi chuyển từ draft → published
    if (data.published === true && !existing.published) {
      updates.publishedAt = new Date();
    }
    if (data.published === false) {
      updates.publishedAt = null;
    }

    const [row] = await db
      .update(blogPosts)
      .set(updates as any)
      .where(eq(blogPosts.id, id))
      .returning();
    return row;
  }

  async deleteBlogPost(id: string): Promise<boolean> {
    const result = await db.delete(blogPosts).where(eq(blogPosts.id, id)).returning();
    return result.length > 0;
  }

  async createContactSubmission(data: InsertContactSubmission): Promise<ContactSubmission> {
    const [row] = await db.insert(contactSubmissions).values(data).returning();
    return row;
  }

  async listContactSubmissions(): Promise<ContactSubmission[]> {
    return db.select().from(contactSubmissions).orderBy(desc(contactSubmissions.createdAt));
  }

  async setContactSubmissionHandled(id: string, handled: boolean): Promise<ContactSubmission | undefined> {
    const [row] = await db
      .update(contactSubmissions)
      .set({ handled })
      .where(eq(contactSubmissions.id, id))
      .returning();
    return row;
  }

  async deleteContactSubmission(id: string): Promise<boolean> {
    const result = await db.delete(contactSubmissions).where(eq(contactSubmissions.id, id)).returning();
    return result.length > 0;
  }
}

export const storage: IStorage = new DbStorage();
