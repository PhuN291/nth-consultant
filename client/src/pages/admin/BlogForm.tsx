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
import type { BlogPost } from "@shared/schema";
import { ArrowLeft, Upload } from "lucide-react";

const CATEGORIES = [
  "Kế toán thuế",
  "Luật doanh nghiệp",
  "Bảo hiểm xã hội",
  "Quản trị tài chính",
  "Tin tức nội bộ",
];

function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
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

  // Auto-slug khi gõ title (chỉ khi chưa edit slug thủ công)
  const onTitleChange = (title: string) => {
    setForm((f) => ({ ...f, title, slug: slugTouched ? f.slug : slugify(title) }));
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
      setLocation("/admin/blog");
    },
    onError: (err: any) => {
      setError(err?.message?.replace(/^\d+:\s*/, "") || "Lưu thất bại");
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
      setForm((f) => ({ ...f, coverImageUrl: data.url }));
    } catch (err: any) {
      alert(`Upload ảnh bìa thất bại: ${err?.message ?? err}`);
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
            onClick={() => setLocation("/admin/blog")}
            className="text-sm text-slate-500 hover:text-slate-900 flex items-center gap-1 mb-2"
          >
            <ArrowLeft className="w-4 h-4" /> Quay lại danh sách
          </button>
          <h1 className="text-2xl font-bold font-display text-slate-900">
            {isEdit ? "Sửa bài viết" : "Bài viết mới"}
          </h1>
        </div>
      </div>

      <form onSubmit={onSubmit} className="grid lg:grid-cols-3 gap-6">
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
              onChange={(e) => {
                setForm((f) => ({ ...f, slug: e.target.value }));
                setSlugTouched(true);
              }}
              required
              placeholder="vi-du-slug-bai-viet"
              pattern="[a-z0-9\-]+"
              maxLength={200}
            />
            <p className="text-xs text-slate-500">
              URL: /tin-tuc/<span className="font-mono">{form.slug || "(chưa có)"}</span>
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">Mô tả ngắn</Label>
            <Textarea
              id="excerpt"
              value={form.excerpt}
              onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
              rows={2}
              maxLength={500}
              placeholder="Mô tả ngắn 1-2 câu hiển thị ở danh sách bài viết..."
            />
            <p className="text-xs text-slate-500">{form.excerpt.length}/500 ký tự</p>
          </div>

          <div className="space-y-2">
            <Label>Nội dung *</Label>
            <TiptapEditor value={form.contentHtml} onChange={(html) => setForm((f) => ({ ...f, contentHtml: html }))} />
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
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
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
                onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))}
                maxLength={100}
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                id="published"
                type="checkbox"
                checked={form.published}
                onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))}
                className="w-4 h-4"
              />
              <Label htmlFor="published" className="!mt-0">Đăng công khai</Label>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-3">
            <h2 className="font-bold text-slate-900">Ảnh bìa</h2>
            {form.coverImageUrl ? (
              <div className="space-y-2">
                <img src={form.coverImageUrl} alt="Cover" className="w-full rounded-lg aspect-video object-cover" />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => setForm((f) => ({ ...f, coverImageUrl: null }))}
                >
                  Xoá ảnh bìa
                </Button>
              </div>
            ) : (
              <Button type="button" variant="outline" className="w-full" onClick={() => coverInputRef.current?.click()}>
                <Upload className="w-4 h-4 mr-2" />
                Tải ảnh bìa
              </Button>
            )}
            <input ref={coverInputRef} type="file" accept="image/*" onChange={onCoverUpload} className="hidden" />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-3 py-2">{error}</div>
          )}

          <Button type="submit" className="w-full" disabled={save.isPending}>
            {save.isPending ? "Đang lưu..." : isEdit ? "Cập nhật" : "Tạo bài viết"}
          </Button>
        </aside>
      </form>
    </AdminLayout>
  );
}
