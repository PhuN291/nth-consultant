import { queryClient } from "@/lib/queryClient";
import { toast } from "@/hooks/use-toast";

const AUTH_QUERY_KEY = ["/api/auth/me"];

export function isAuthError(err: unknown): boolean {
  if (!err) return false;
  const msg = err instanceof Error ? err.message : String(err);
  return msg.startsWith("401:");
}

export function getErrorMessage(err: unknown, fallback = "Đã có lỗi xảy ra"): string {
  if (!err) return fallback;
  const raw = err instanceof Error ? err.message : String(err);
  return raw.replace(/^\d+:\s*/, "") || fallback;
}

export function handleAdminMutationError(err: unknown, opts?: { fallbackTitle?: string }) {
  if (isAuthError(err)) {
    queryClient.setQueryData(AUTH_QUERY_KEY, null);
    queryClient.invalidateQueries();
    toast({
      title: "Phiên đã hết hạn",
      description: "Vui lòng đăng nhập lại để tiếp tục.",
      variant: "destructive",
    });
    window.location.href = "/admin/login";
    return;
  }
  toast({
    title: opts?.fallbackTitle ?? "Thao tác thất bại",
    description: getErrorMessage(err),
    variant: "destructive",
  });
}
