import { useQuery, useMutation } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { BlogPost } from "@shared/schema";
import { Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";

interface BlogListResponse {
  posts: BlogPost[];
  total: number;
}

export default function AdminBlogList() {
  const { data, isLoading } = useQuery<BlogListResponse>({
    queryKey: ["/api/admin/blog"],
  });

  const deletePost = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/admin/blog/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/blog"] });
    },
  });

  const onDelete = (id: string, title: string) => {
    if (!confirm(`Xoá bài "${title}"? Hành động này không thể hoàn tác.`)) return;
    deletePost.mutate(id);
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold font-display text-slate-900">Bài viết</h1>
        <Link href="/admin/blog/new">
          <Button>
            <Plus className="w-4 h-4 mr-1" />
            Bài mới
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-slate-500">Đang tải...</div>
        ) : !data || data.posts.length === 0 ? (
          <div className="p-8 text-center text-slate-500">
            Chưa có bài viết nào. <Link href="/admin/blog/new" className="text-blue-600 hover:underline">Tạo bài mới</Link>.
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr className="text-left text-slate-600 font-medium">
                <th className="px-4 py-3">Tiêu đề</th>
                <th className="px-4 py-3">Danh mục</th>
                <th className="px-4 py-3">Trạng thái</th>
                <th className="px-4 py-3">Cập nhật</th>
                <th className="px-4 py-3 w-32 text-right">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.posts.map((post) => (
                <tr key={post.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <div className="font-medium text-slate-900">{post.title}</div>
                    <div className="text-xs text-slate-400 mt-0.5">/{post.slug}</div>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{post.category}</td>
                  <td className="px-4 py-3">
                    {post.published ? (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
                        <Eye className="w-3 h-3" /> Đã đăng
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
                        <EyeOff className="w-3 h-3" /> Bản nháp
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-slate-500 text-xs">
                    {new Date(post.updatedAt).toLocaleDateString("vi-VN", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link href={`/admin/blog/${post.id}/edit`}>
                      <Button variant="ghost" size="sm">
                        <Pencil className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(post.id, post.title)}
                      disabled={deletePost.isPending}
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </AdminLayout>
  );
}
