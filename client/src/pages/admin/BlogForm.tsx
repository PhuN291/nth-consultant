import { useEffect, useRef, useState } from "react";
import { useLocation, useRoute } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { TiptapEditor } from "@/components/admin/TiptapEditor";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { handleAdminMutationError } from "@/lib/admin-error";
import { useToast } from "@/hooks/use-toast";
import type { BlogPost } from "@shared/schema";
import { ArrowLeft, Upload } from "lucide-react";

const CATEGORIES = [
  "Kế toán thuế",
  "Luật doanh nghiệp",
  "Bảo hiểm xã hội",
  "Quản trị tài chính",
  "Tin tức nội bộ",
];

const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;

function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 200);
}

interface FormState {
  slug: string;
  title: string;
  excerpt: string;
  contentHtml: string;
  coverImageUrl: string | null;
  category: string;
  author: string;
  published: boolean;
}

const EMPTY: FormState = {
  slug: "",
  title: "",
  excerpt: "",
  contentHtml: "",
  coverImageUrl: null,
  category: CATEGORIES[0],
  author: "NTH Consulting",
  published: false,
};

export default function BlogForm() {
  const [, params] = useRoute<{ id: string }>("/admin/blog/:id/edit");
  const isEdit = Boolean(params?.id);
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [form, setForm] = useState<FormState>(EMPTY);
  const [error, setError] = useState<string | null>(null);
  const [slugTouched, setSlugTouched] = useState(false);
  const coverInputRef = useRef<HTMLInputElement>(null);

  const { data: existingPost, isLoading: loadingExisting } = useQuery<BlogPost>({
    queryKey: [`/api/admin/blog/${params?.id}`],
    enabled: isEdit,
  });

  useEffect(() => {
    if (existingPost) {
      setForm({
        slug: existingPost.slug,
        title: existingPost.title,
        excerpt: existingPost.excerpt,
        contentHtml: existingPost.contentHtml,
        coverImageUrl: existingPost.coverImageUrl,
        category: existingPost.category,
        author: existingPost.author,
        published: existingPost.published,
      });
      setSlugTouched(true);
    }
  }, [existingPost]);

  const updateForm = (patch: Partial<FormState>) => {
    setForm((f) => ({ ...f, ...patch }));
    if (error) setError(null);
  };

  const onTitleChange = (title: string) => {
    setForm((f) => ({ ...f, title, slug: slugTouched ? f.slug : slugify(title) }));
    if (error) setError(null);
  };

  const onSlugChange = (raw: string) => {
    setForm((f) => ({ ...f, slug: slugify(raw) }));
    setSlugTouched(true);
    if (error) setError(null);
  };

  const save = useMutation({
    mutationFn: async () => {
      if (isEdit) {
        const res = await apiRequest("PUT", `/api/admin/blog/${params!.id}`, form);
        return await res.json();
      } else {
        const res = await apiRequest("POST", "/api/admin/blog", form);
        return await res.json();
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/blog"] });
      queryClient.invalidateQueries({ queryKey: ["/api/blog"] });
      toast({
        title: isEdit ? "Đã cập nhật bài viết" : "Đã tạo bài viết mới",
      });
      setLocation("/admin/blog");
    },
    onError: (err: any) => {
      const msg = err?.message?.replace(/^\d+:\s*/, "") || "Lưu thất bại";
      setError(msg);
      if (err?.message?.startsWith("401:")) {
        handleAdminMutationError(err);
      }
    },
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    save.mutate();
  };

  const onCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = "";

    if (file.size > MAX_UPLOAD_BYTES) {
      toast({
        title: "Ảnh bìa quá lớn",
        description: `Tối đa 5MB. File này: ${(file.size / 1024 / 1024).toFixed(1)}MB`,
        variant: "destructive",
      });
      return;
    }

    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: fd,
        credentials: "include",
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      if (typeof data?.url !== "string") {
        throw new Error("Server không trả về URL ảnh hợp lệ");
      }
      setForm((f) => ({ ...f, coverImageUrl: data.url }));
      toast({ title: "Tải ảnh bìa thành công" });
    } catch (err: any) {
      toast({
        title: "Tải ảnh bìa thất bại",
        description: err?.message ?? String(err),
        variant: "destructive",
      });
    }
  };

  if (isEdit && loadingExisting) {
    return (
      <AdminLayout>
        <p className="text-slate-500">Đang tải bài viết...</p>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <button
            type="button"
            onClick={() => setLocation("/admin/blog")}
            className="text-sm text-slate-600 hover:text-slate-900 flex items-center gap-1 mb-2"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" /> Quay lại danh sách
          </button>
          <h1 className="text-2xl font-bold font-display text-slate-900">
            {isEdit ? "Sửa bài viết" : "Bài viết mới"}
          </h1>
        </div>
      </div>

      <form onSubmit={onSubmit} className="grid lg:grid-cols-3 gap-6 pb-20 lg:pb-0">
        <div className="lg:col-span-2 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Tiêu đề *</Label>
            <Input
              id="title"
              value={form.title}
              onChange={(e) => onTitleChange(e.target.value)}
              required
              maxLength={300}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Slug (URL) *</Label>
            <Input
              id="slug"
              value={form.slug}
              onChange={(e) => onSlugChange(e.target.value)}
              required
              placeholder="vi-du-slug-bai-viet"
              maxLength={200}
            />
            <p className="text-xs text-slate-600">
              URL: /tin-tuc/<span className="font-mono">{form.slug || "(chưa có)"}</span>
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">Mô tả ngắn</Label>
            <Textarea
              id="excerpt"
              value={form.excerpt}
              onChange={(e) => updateForm({ excerpt: e.target.value })}
              rows={2}
              maxLength={500}
              placeholder="Mô tả ngắn 1-2 câu hiển thị ở danh sách bài viết..."
            />
            <p className="text-xs text-slate-600">{form.excerpt.length}/500 ký tự</p>
          </div>

          <div className="space-y-2">
            <Label>Nội dung *</Label>
            <TiptapEditor
              value={form.contentHtml}
              onChange={(html) => {
                setForm((f) => ({ ...f, contentHtml: html }));
                if (error) setError(null);
              }}
            />
          </div>
        </div>

        <aside className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-4">
            <h2 className="font-bold text-slate-900">Cấu hình</h2>

            <div className="space-y-2">
              <Label htmlFor="category">Danh mục</Label>
              <select
                id="category"
                value={form.category}
                onChange={(e) => updateForm({ category: e.target.value })}
                className="w-full h-9 px-3 rounded-md border border-slate-200 text-sm bg-white"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="author">Tác giả</Label>
              <Input
                id="author"
                value={form.author}
                onChange={(e) => updateForm({ author: e.target.value })}
                maxLength={100}
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                id="published"
                type="checkbox"
                checked={form.published}
                onChange={(e) => updateForm({ published: e.target.checked })}
                className="w-4 h-4"
              />
              <Label htmlFor="published" className="!mt-0">Đăng công khai</Label>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-3">
            <div>
              <h2 className="font-bold text-slate-900">Ảnh bìa</h2>
              <p className="text-xs text-slate-600 mt-1">Khuyến nghị 1200×675px (16:9), tối đa 5MB.</p>
            </div>
            {form.coverImageUrl ? (
              <div className="space-y-2">
                <img
                  src={form.coverImageUrl}
                  alt="Ảnh bìa"
                  className="w-full rounded-lg aspect-video object-cover bg-slate-100"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                  }}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => updateForm({ coverImageUrl: null })}
                >
                  Xoá ảnh bìa
                </Button>
              </div>
            ) : (
              <Button type="button" variant="outline" className="w-full" onClick={() => coverInputRef.current?.click()}>
                <Upload className="w-4 h-4 mr-2" aria-hidden="true" />
                Tải ảnh bìa
              </Button>
            )}
            <input ref={coverInputRef} type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={onCoverUpload} className="hidden" />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-3 py-2">{error}</div>
          )}

          <Button type="submit" className="w-full hidden lg:flex" disabled={save.isPending}>
            {save.isPending ? "Đang lưu..." : isEdit ? "Cập nhật" : "Tạo bài viết"}
          </Button>
        </aside>

        <div className="lg:hidden fixed bottom-0 inset-x-0 z-30 bg-white border-t border-slate-200 px-4 py-3 shadow-[0_-4px_12px_rgba(0,0,0,0.04)]">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-xs rounded-md px-2 py-1.5 mb-2">
              {error}
            </div>
          )}
          <Button
            type="submit"
            className="w-full min-h-[44px]"
            disabled={save.isPending}
          >
            {save.isPending ? "Đang lưu..." : isEdit ? "Cập nhật" : "Tạo bài viết"}
          </Button>
        </div>
      </form>
    </AdminLayout>
  );
}
