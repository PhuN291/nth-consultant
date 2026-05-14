import { ReactNode, useEffect, useState } from "react";
import { Link, useLocation, useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { LogOut, FileText, Inbox, Menu, AlertTriangle } from "lucide-react";
import { useCurrentAdmin, useLogout } from "@/lib/auth";
import type { ContactSubmission } from "@shared/schema";
import logoMark from "@/assets/images/logo-mark.png";

interface AdminLayoutProps {
  children: ReactNode;
}

interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  active: boolean;
  badge?: number;
}

function SidebarContent({
  navItems,
  username,
  onNavigate,
  onLogout,
  isLoggingOut,
}: {
  navItems: NavItem[];
  username: string;
  onNavigate?: () => void;
  onLogout: () => void;
  isLoggingOut: boolean;
}) {
  return (
    <div className="flex flex-col h-full bg-white">
      {/* Logo */}
      <div className="h-14 flex items-center px-5 border-b border-slate-200 flex-shrink-0">
        <Link href="/admin/blog">
          <span
            onClick={onNavigate}
            className="flex items-center gap-2 cursor-pointer"
          >
            <img src={logoMark} alt="" className="w-7 h-7 rounded-md object-cover" />
            <span className="font-display font-bold text-slate-900 text-base">NTH Admin</span>
          </span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href}>
              <span
                onClick={onNavigate}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium cursor-pointer transition-colors ${
                  item.active
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span className="flex-1 truncate">{item.label}</span>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="inline-flex items-center justify-center min-w-[20px] h-[20px] px-1.5 text-[10px] font-bold rounded-full bg-red-500 text-white">
                    {item.badge > 99 ? "99+" : item.badge}
                  </span>
                )}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* User + logout */}
      <div className="border-t border-slate-200 p-3 flex-shrink-0">
        <div className="flex items-center gap-2 px-2 py-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold flex-shrink-0">
            {username.slice(0, 2).toUpperCase()}
          </div>
          <span className="text-sm text-slate-700 truncate flex-1">{username}</span>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="w-full justify-start"
          onClick={onLogout}
          disabled={isLoggingOut}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Đăng xuất
        </Button>
      </div>
    </div>
  );
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const { data: admin, isLoading } = useCurrentAdmin();
  const logout = useLogout();
  const [, setLocation] = useLocation();
  const [isList] = useRoute("/admin/blog");
  const [isContact] = useRoute("/admin/lien-he");
  const [mobileOpen, setMobileOpen] = useState(false);

  // Đếm liên hệ chưa xử lý (chỉ load khi đã login)
  const { data: contactData } = useQuery<{ items: ContactSubmission[] }>({
    queryKey: ["/api/admin/contact"],
    enabled: !!admin,
    refetchInterval: 60_000,
  });
  const pendingContacts = contactData?.items.filter((x) => !x.handled).length ?? 0;

  // Cảnh báo thiếu cấu hình (Cloudinary)
  const { data: configStatus } = useQuery<{ cloudinary: boolean }>({
    queryKey: ["/api/admin/config-status"],
    enabled: !!admin,
    staleTime: 5 * 60_000,
  });

  useEffect(() => {
    if (!isLoading && !admin) {
      setLocation("/admin/login");
    }
  }, [admin, isLoading, setLocation]);

  if (isLoading || !admin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-slate-500">Đang tải...</p>
      </div>
    );
  }

  const navItems: NavItem[] = [
    { href: "/admin/blog", label: "Bài viết", icon: FileText, active: isList },
    { href: "/admin/lien-he", label: "Liên hệ", icon: Inbox, active: isContact, badge: pendingContacts },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Desktop sidebar — fixed, hidden on mobile */}
      <aside className="hidden md:flex md:flex-col md:fixed md:inset-y-0 md:left-0 md:w-60 md:border-r md:border-slate-200 z-30">
        <SidebarContent
          navItems={navItems}
          username={admin.username}
          onLogout={() => logout.mutate()}
          isLoggingOut={logout.isPending}
        />
      </aside>

      {/* Mobile top bar */}
      <header className="md:hidden bg-white border-b border-slate-200 sticky top-0 z-30 flex items-center px-3 h-14 gap-3">
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Mở menu">
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64 gap-0">
            <SheetTitle className="sr-only">Admin navigation</SheetTitle>
            <SidebarContent
              navItems={navItems}
              username={admin.username}
              onNavigate={() => setMobileOpen(false)}
              onLogout={() => {
                setMobileOpen(false);
                logout.mutate();
              }}
              isLoggingOut={logout.isPending}
            />
          </SheetContent>
        </Sheet>
        <Link href="/admin/blog">
          <span className="flex items-center gap-2 cursor-pointer">
            <img src={logoMark} alt="" className="w-7 h-7 rounded-md object-cover" />
            <span className="font-display font-bold text-slate-900">NTH Admin</span>
          </span>
        </Link>
        {pendingContacts > 0 && (
          <Link href="/admin/lien-he">
            <button
              aria-label={`${pendingContacts} yêu cầu liên hệ chưa xử lý`}
              className="ml-auto inline-flex items-center gap-1.5 text-xs text-slate-700 hover:text-blue-600 px-2 py-2 rounded-md hover:bg-slate-50 transition-colors min-h-[40px]"
            >
              <Inbox className="w-4 h-4" aria-hidden="true" />
              <span className="inline-flex items-center justify-center min-w-[20px] h-[20px] px-1.5 text-[10px] font-bold rounded-full bg-red-500 text-white">
                {pendingContacts > 99 ? "99+" : pendingContacts}
              </span>
            </button>
          </Link>
        )}
      </header>

      {/* Main content */}
      <main className="md:pl-60">
        {configStatus && configStatus.cloudinary === false && (
          <div className="bg-amber-50 border-b border-amber-200 px-4 py-2.5 md:px-8 flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
            <p className="text-sm text-amber-900">
              <span className="font-semibold">Cloudinary chưa cấu hình.</span>{" "}
              Tính năng upload ảnh sẽ không hoạt động. Đặt biến môi trường <code className="font-mono text-xs bg-amber-100 px-1.5 py-0.5 rounded">CLOUDINARY_URL</code> trong file <code className="font-mono text-xs bg-amber-100 px-1.5 py-0.5 rounded">.env</code> rồi khởi động lại server.
            </p>
          </div>
        )}
        <div className="px-4 py-6 md:px-8 md:py-8">{children}</div>
      </main>
    </div>
  );
}
