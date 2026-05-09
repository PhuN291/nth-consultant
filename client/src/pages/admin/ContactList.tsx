import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { ContactSubmission } from "@shared/schema";
import { Phone, Trash2, Check, Mail, Building2, Briefcase, Calendar, RotateCcw } from "lucide-react";

interface ContactListResponse {
  items: ContactSubmission[];
}

function formatDateTime(d: Date | string) {
  const dt = typeof d === "string" ? new Date(d) : d;
  return dt.toLocaleString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AdminContactList() {
  const { data, isLoading } = useQuery<ContactListResponse>({
    queryKey: ["/api/admin/contact"],
    refetchInterval: 30_000, // refresh mỗi 30 giây
  });

  const toggleHandled = useMutation({
    mutationFn: async ({ id, handled }: { id: string; handled: boolean }) => {
      const res = await apiRequest("PATCH", `/api/admin/contact/${id}`, { handled });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/contact"] });
    },
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/admin/contact/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/contact"] });
    },
  });

  const items = data?.items ?? [];
  const pendingCount = items.filter((x) => !x.handled).length;

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold font-display text-slate-900">Liên hệ từ khách</h1>
          <p className="text-sm text-slate-500 mt-1">
            {pendingCount > 0 ? (
              <span className="text-blue-600 font-medium">{pendingCount} yêu cầu chưa xử lý</span>
            ) : (
              "Tất cả yêu cầu đã được xử lý"
            )}
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-slate-500">
          Đang tải...
        </div>
      ) : items.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <p className="text-slate-500">Chưa có yêu cầu liên hệ nào.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item.id}
              className={`bg-white rounded-xl border p-5 transition-colors ${
                item.handled ? "border-slate-200 opacity-70" : "border-blue-300 shadow-sm"
              }`}
            >
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-2">
                    <h3 className="text-lg font-bold text-slate-900">{item.name}</h3>
                    {!item.handled && (
                      <span className="inline-flex items-center text-xs font-semibold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                        Mới
                      </span>
                    )}
                    {item.handled && (
                      <span className="inline-flex items-center gap-1 text-xs font-medium bg-green-50 text-green-700 px-2 py-0.5 rounded-full">
                        <Check className="w-3 h-3" /> Đã xử lý
                      </span>
                    )}
                  </div>

                  <div className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5 text-sm text-slate-700">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-slate-400 flex-shrink-0" />
                      <a href={`tel:${item.phone}`} className="font-medium hover:text-blue-600">
                        {item.phone}
                      </a>
                    </div>
                    {item.email && (
                      <div className="flex items-center gap-2 min-w-0">
                        <Mail className="w-4 h-4 text-slate-400 flex-shrink-0" />
                        <a href={`mailto:${item.email}`} className="hover:text-blue-600 truncate">
                          {item.email}
                        </a>
                      </div>
                    )}
                    {item.title && (
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-slate-400 flex-shrink-0" />
                        <span>{item.title}</span>
                      </div>
                    )}
                    {item.company && (
                      <div className="flex items-center gap-2 min-w-0">
                        <Building2 className="w-4 h-4 text-slate-400 flex-shrink-0" />
                        <span className="truncate">{item.company}</span>
                      </div>
                    )}
                  </div>

                  {item.service && (
                    <div className="mt-2 text-sm">
                      <span className="text-slate-500">Quan tâm: </span>
                      <span className="font-medium text-slate-700">{item.service}</span>
                    </div>
                  )}
                  {item.message && (
                    <p className="mt-2 text-sm text-slate-600 italic bg-slate-50 px-3 py-2 rounded-md border border-slate-100">
                      &ldquo;{item.message}&rdquo;
                    </p>
                  )}

                  <div className="mt-3 flex items-center gap-4 text-xs text-slate-400 flex-wrap">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> {formatDateTime(item.createdAt)}
                    </span>
                    {item.source && <span className="font-mono">{item.source}</span>}
                  </div>
                </div>

                <div className="flex flex-col gap-2 sm:flex-row sm:items-start">
                  <Button
                    asChild
                    size="sm"
                    variant="default"
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <a href={`tel:${item.phone}`}>
                      <Phone className="w-4 h-4 mr-1" /> Gọi
                    </a>
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => toggleHandled.mutate({ id: item.id, handled: !item.handled })}
                    disabled={toggleHandled.isPending}
                  >
                    {item.handled ? (
                      <>
                        <RotateCcw className="w-4 h-4 mr-1" /> Mở lại
                      </>
                    ) : (
                      <>
                        <Check className="w-4 h-4 mr-1" /> Đánh dấu xong
                      </>
                    )}
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      if (confirm(`Xoá yêu cầu của "${item.name}"?`)) remove.mutate(item.id);
                    }}
                    disabled={remove.isPending}
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
