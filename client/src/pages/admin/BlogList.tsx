import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { handleAdminMutationError } from "@/lib/admin-error";
import { useToast } from "@/hooks/use-toast";
import type { BlogPost } from "@shared/schema";
import { Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";

interface BlogListResponse {
  posts: BlogPost[];
  total: number;
}

type Filter = "all" | "published" | "draft";

function formatDate(d: Date | string | null | undefined) {
  if (!d) return "—";
  const dt = new Date(d);
  if (isNaN(dt.getTime())) return "—";
  return dt.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export default function AdminBlogList() {
  const [deleteTarget, setDeleteTarget] = useState<BlogPost | null>(null);
  const [filter, setFilter] = useState<Filter>("all");
  const { toast } = useToast();

  const { data, isLoading } = useQuery<BlogListResponse>({
    queryKey: ["/api/admin/blog"],
  });

  const deletePost = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/admin/blog/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/blog"] });
      toast({ title: "Đã xoá bài viết" });
      setDeleteTarget(null);
    },
    onError: (err) => {
      handleAdminMutationError(err, { fallbackTitle: "Xoá bài viết thất bại" });
    },
  });

  const posts = data?.posts ?? [];
  const publishedCount = posts.filter((p) => p.published).length;
  const draftCount = posts.length - publishedCount;
  const filteredPosts = posts.filter((p) =>
    filter === "all" ? true : filter === "published" ? p.published : !p.published
  );

  const filterChips: { key: Filter; label: string; count: number }[] = [
    { key: "all", label: "Tất cả", count: posts.length },
    { key: "published", label: "Đã đăng", count: publishedCount },
    { key: "draft", label: "Bản nháp", count: draftCount },
  ];

  return (
    <AdminLayout>
      <div className="flex items-center justify-between gap-3 mb-5 md:mb-6">
        <h1 className="text-2xl font-bold font-display text-slate-900">Bài viết</h1>
        <Link href="/admin/blog/new">
          <Button className="min-h-[40px]">
            <Plus className="w-4 h-4 mr-1" aria-hidden="true" />
            <span className="hidden sm:inline">Bài mới</span>
            <span className="sm:hidden">Mới</span>
          </Button>
        </Link>
      </div>

      {posts.length > 0 && (
        <div
          className="flex gap-2 mb-4 overflow-x-auto scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0"
          role="tablist"
          aria-label="Lọc bài viết"
        >
          {filterChips.map((chip) => (
            <button
              key={chip.key}
              role="tab"
              aria-selected={filter === chip.key}
              onClick={() => setFilter(chip.key)}
              className={`flex-shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-medium transition-colors min-h-[40px] ${
                filter === chip.key
                  ? "bg-blue-600 text-white"
                  : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
              }`}
            >
              {chip.label}
              <span
                className={`text-xs font-semibold rounded-full px-1.5 ${
                  filter === chip.key ? "bg-white/20" : "bg-slate-100 text-slate-600"
                }`}
              >
                {chip.count}
              </span>
            </button>
          ))}
        </div>
      )}

      {isLoading ? (
        <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-slate-500">
          Đang tải...
        </div>
      ) : posts.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-slate-500">
          Chưa có bài viết nào.{" "}
          <Link href="/admin/blog/new" className="text-blue-600 hover:underline">
            Tạo bài mới
          </Link>
          .
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-slate-500">
          {filter === "published"
            ? "Chưa có bài viết nào đã đăng."
            : "Chưa có bản nháp."}
        </div>
      ) : (
        <>
          {/* Mobile cards */}
          <div className="md:hidden space-y-3">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-xl border border-slate-200 p-4"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-slate-900 leading-snug break-words">
                      {post.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 font-mono truncate">/{post.slug}</p>
                  </div>
                  {post.published ? (
                    <span
                      className="flex-shrink-0 inline-flex items-center gap-1 text-xs font-medium text-green-700 bg-green-50 px-2 py-0.5 rounded-full"
                      role="status"
                    >
                      <Eye className="w-3 h-3" aria-hidden="true" />
                      Đã đăng
                    </span>
                  ) : (
                    <span
                      className="flex-shrink-0 inline-flex items-center gap-1 text-xs font-medium text-slate-700 bg-slate-100 px-2 py-0.5 rounded-full"
                      role="status"
                    >
                      <EyeOff className="w-3 h-3" aria-hidden="true" />
                      Bản nháp
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-100">
                  <div className="flex items-center gap-2 text-xs text-slate-500 min-w-0">
                    <span className="truncate">{post.category}</span>
                    <span className="text-slate-300">•</span>
                    <span className="flex-shrink-0">{formatDate(post.updatedAt)}</span>
                  </div>
                  <div className="flex gap-1 flex-shrink-0">
                    <Link href={`/admin/blog/${post.id}/edit`}>
                      <Button variant="ghost" size="sm" aria-label={`Sửa bài "${post.title}"`} className="min-h-[40px] min-w-[40px]">
                        <Pencil className="w-4 h-4" aria-hidden="true" />
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setDeleteTarget(post)}
                      disabled={deletePost.isPending}
                      aria-label={`Xoá bài "${post.title}"`}
                      className="min-h-[40px] min-w-[40px] text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" aria-hidden="true" />
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Desktop table */}
          <div className="hidden md:block bg-white rounded-xl border border-slate-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr className="text-left text-slate-700 font-medium">
                  <th className="px-4 py-3">Tiêu đề</th>
                  <th className="px-4 py-3">Danh mục</th>
                  <th className="px-4 py-3">Trạng thái</th>
                  <th className="px-4 py-3">Cập nhật</th>
                  <th className="px-4 py-3 w-32 text-right">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3">
                      <div className="font-medium text-slate-900">{post.title}</div>
                      <div className="text-xs text-slate-500 mt-0.5">/{post.slug}</div>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{post.category}</td>
                    <td className="px-4 py-3">
                      {post.published ? (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
                          <Eye className="w-3 h-3" aria-hidden="true" />
                          Đã đăng
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-700 bg-slate-100 px-2 py-0.5 rounded-full">
                          <EyeOff className="w-3 h-3" aria-hidden="true" />
                          Bản nháp
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-slate-600 text-xs">{formatDate(post.updatedAt)}</td>
                    <td className="px-4 py-3 text-right">
                      <Link href={`/admin/blog/${post.id}/edit`}>
                        <Button variant="ghost" size="sm" aria-label={`Sửa bài "${post.title}"`}>
                          <Pencil className="w-4 h-4" aria-hidden="true" />
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setDeleteTarget(post)}
                        disabled={deletePost.isPending}
                        aria-label={`Xoá bài "${post.title}"`}
                      >
                        <Trash2 className="w-4 h-4 text-red-600" aria-hidden="true" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      <AlertDialog open={!!deleteTarget} onOpenChange={(open) => !open && !deletePost.isPending && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xoá bài viết?</AlertDialogTitle>
            <AlertDialogDescription>
              Bài <span className="font-semibold text-slate-900">&ldquo;{deleteTarget?.title}&rdquo;</span> sẽ bị xoá vĩnh viễn và không thể hoàn tác.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deletePost.isPending}>Huỷ</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                if (deleteTarget && !deletePost.isPending) deletePost.mutate(deleteTarget.id);
              }}
              disabled={deletePost.isPending}
              className="bg-red-600 hover:bg-red-700"
            >
              {deletePost.isPending ? "Đang xoá..." : "Xoá"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
}
