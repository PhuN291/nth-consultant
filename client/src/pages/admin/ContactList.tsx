import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
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
import type { ContactSubmission } from "@shared/schema";
import { Phone, Trash2, Check, Mail, Building2, Briefcase, Calendar, RotateCcw } from "lucide-react";

interface ContactListResponse {
  items: ContactSubmission[];
}

function formatDateTime(d: Date | string | null | undefined) {
  if (!d) return "—";
  const dt = typeof d === "string" ? new Date(d) : d;
  if (isNaN(dt.getTime())) return "—";
  return dt.toLocaleString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AdminContactList() {
  const [deleteTarget, setDeleteTarget] = useState<ContactSubmission | null>(null);
  const [filter, setFilter] = useState<"all" | "pending" | "handled">("pending");
  const { toast } = useToast();

  const { data, isLoading } = useQuery<ContactListResponse>({
    queryKey: ["/api/admin/contact"],
    refetchInterval: 30_000,
  });

  const toggleHandled = useMutation({
    mutationFn: async ({ id, handled }: { id: string; handled: boolean }) => {
      const res = await apiRequest("PATCH", `/api/admin/contact/${id}`, { handled });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/contact"] });
    },
    onError: (err) => {
      handleAdminMutationError(err, { fallbackTitle: "Cập nhật trạng thái thất bại" });
    },
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/admin/contact/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/contact"] });
      toast({ title: "Đã xoá yêu cầu liên hệ" });
      setDeleteTarget(null);
    },
    onError: (err) => {
      handleAdminMutationError(err, { fallbackTitle: "Xoá yêu cầu thất bại" });
    },
  });

  const items = data?.items ?? [];
  const pendingCount = items.filter((x) => !x.handled).length;
  const handledCount = items.length - pendingCount;
  const filteredItems = items.filter((x) =>
    filter === "all" ? true : filter === "pending" ? !x.handled : x.handled
  );

  const filterChips: { key: typeof filter; label: string; count: number }[] = [
    { key: "pending", label: "Chưa xử lý", count: pendingCount },
    { key: "handled", label: "Đã xử lý", count: handledCount },
    { key: "all", label: "Tất cả", count: items.length },
  ];

  return (
    <AdminLayout>
      <div className="mb-5 md:mb-6">
        <h1 className="text-2xl font-bold font-display text-slate-900">Liên hệ từ khách</h1>
        <p className="text-sm text-slate-500 mt-1">
          {pendingCount > 0 ? (
            <span className="text-blue-600 font-medium">{pendingCount} yêu cầu chưa xử lý</span>
          ) : (
            "Tất cả yêu cầu đã được xử lý"
          )}
        </p>
      </div>

      <div className="flex gap-2 mb-4 overflow-x-auto scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0" role="tablist" aria-label="Lọc liên hệ">
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

      {isLoading ? (
        <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-slate-500">
          Đang tải...
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <p className="text-slate-500">
            {filter === "pending"
              ? "Không có yêu cầu nào chưa xử lý."
              : filter === "handled"
              ? "Chưa có yêu cầu nào được đánh dấu xong."
              : "Chưa có yêu cầu liên hệ nào."}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredItems.map((item) => (
            <article
              key={item.id}
              className={`bg-white rounded-xl border p-4 md:p-5 transition-colors ${
                item.handled ? "border-slate-200 opacity-70" : "border-blue-300 shadow-sm"
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-2">
                    <h3 className="text-base md:text-lg font-bold text-slate-900 break-words">
                      {item.name}
                    </h3>
                    {!item.handled ? (
                      <span
                        className="inline-flex items-center text-xs font-semibold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full"
                        role="status"
                      >
                        <span className="sr-only">Trạng thái: </span>Mới
                      </span>
                    ) : (
                      <span
                        className="inline-flex items-center gap-1 text-xs font-medium bg-green-50 text-green-700 px-2 py-0.5 rounded-full"
                        role="status"
                      >
                        <Check className="w-3 h-3" aria-hidden="true" />
                        <span className="sr-only">Trạng thái: </span>Đã xử lý
                      </span>
                    )}
                  </div>

                  <div className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5 text-sm text-slate-700">
                    <div className="flex items-center gap-2 min-w-0">
                      <Phone className="w-4 h-4 text-slate-500 flex-shrink-0" aria-hidden="true" />
                      <a href={`tel:${item.phone}`} className="font-medium hover:text-blue-600 truncate">
                        {item.phone}
                      </a>
                    </div>
                    {item.email && (
                      <div className="flex items-center gap-2 min-w-0">
                        <Mail className="w-4 h-4 text-slate-500 flex-shrink-0" aria-hidden="true" />
                        <a href={`mailto:${item.email}`} className="hover:text-blue-600 truncate">
                          {item.email}
                        </a>
                      </div>
                    )}
                    {item.title && (
                      <div className="flex items-center gap-2 min-w-0">
                        <Briefcase className="w-4 h-4 text-slate-500 flex-shrink-0" aria-hidden="true" />
                        <span className="truncate">{item.title}</span>
                      </div>
                    )}
                    {item.company && (
                      <div className="flex items-center gap-2 min-w-0">
                        <Building2 className="w-4 h-4 text-slate-500 flex-shrink-0" aria-hidden="true" />
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
                    <p className="mt-2 text-sm text-slate-600 italic bg-slate-50 px-3 py-2 rounded-md border border-slate-100 break-words">
                      &ldquo;{item.message}&rdquo;
                    </p>
                  )}

                  <div className="mt-3 flex items-center gap-3 text-xs text-slate-500 flex-wrap">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                      {formatDateTime(item.createdAt)}
                    </span>
                    {item.source && <span className="font-mono text-slate-500">{item.source}</span>}
                  </div>
                </div>

                <div className="flex flex-row md:flex-col gap-2 md:gap-2 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100 md:flex-shrink-0">
                  <Button
                    asChild
                    variant="default"
                    className="bg-green-600 hover:bg-green-700 flex-1 md:flex-none min-h-[44px] md:min-h-[36px]"
                  >
                    <a href={`tel:${item.phone}`} aria-label={`Gọi ${item.name} qua số ${item.phone}`}>
                      <Phone className="w-4 h-4 mr-1.5" aria-hidden="true" />
                      Gọi
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => toggleHandled.mutate({ id: item.id, handled: !item.handled })}
                    disabled={toggleHandled.isPending}
                    className="flex-1 md:flex-none min-h-[44px] md:min-h-[36px]"
                  >
                    {item.handled ? (
                      <>
                        <RotateCcw className="w-4 h-4 mr-1.5" aria-hidden="true" />
                        Mở lại
                      </>
                    ) : (
                      <>
                        <Check className="w-4 h-4 mr-1.5" aria-hidden="true" />
                        <span className="md:hidden">Xong</span>
                        <span className="hidden md:inline">Đánh dấu xong</span>
                      </>
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => setDeleteTarget(item)}
                    disabled={remove.isPending}
                    aria-label={`Xoá yêu cầu của ${item.name}`}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 min-h-[44px] md:min-h-[36px] flex-shrink-0 px-3"
                  >
                    <Trash2 className="w-4 h-4" aria-hidden="true" />
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      <AlertDialog open={!!deleteTarget} onOpenChange={(open) => !open && !remove.isPending && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xoá yêu cầu liên hệ?</AlertDialogTitle>
            <AlertDialogDescription>
              Yêu cầu của <span className="font-semibold text-slate-900">{deleteTarget?.name}</span> sẽ bị xoá vĩnh viễn và không thể khôi phục.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={remove.isPending}>Huỷ</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                if (deleteTarget && !remove.isPending) remove.mutate(deleteTarget.id);
              }}
              disabled={remove.isPending}
              className="bg-red-600 hover:bg-red-700"
            >
              {remove.isPending ? "Đang xoá..." : "Xoá"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
}
