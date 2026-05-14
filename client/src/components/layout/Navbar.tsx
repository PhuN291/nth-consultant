import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useState, useEffect, ReactNode } from "react";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import { ContactDialog } from "@/components/ContactDialog";
import { AnchorLink } from "@/components/AnchorLink";
import logoHorizontal from "@/assets/images/logo-horizontal.png";

// Wrapper: dùng AnchorLink cho hash, Link cho path
function NavItem({ href, children, onClick }: { href: string; children: ReactNode; onClick?: () => void }) {
  if (href.includes("#")) {
    return (
      <AnchorLink href={href} onClick={onClick}>
        {children}
      </AnchorLink>
    );
  }
  return (
    <Link href={href}>
      <span onClick={onClick}>{children}</span>
    </Link>
  );
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [desktopServicesOpen, setDesktopServicesOpen] = useState(false);
  const [location] = useLocation();

  const isHome = location === "/";
  const useDarkNav = !isHome || isScrolled || mobileMenuOpen;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const serviceGroups: { label: string; items: { name: string; href?: string }[] }[] = [
    {
      label: "Dịch vụ kế toán và thuế",
      items: [
        { name: "Kế toán trọn gói", href: "/dich-vu/ke-toan-tron-goi" },
        { name: "Rà soát sổ sách kế toán", href: "/dich-vu/ra-soat-so-sach" },
        { name: "Lập BCTC cuối năm", href: "/dich-vu/lap-bctc-cuoi-nam" },
        { name: "Báo cáo thuế", href: "/dich-vu/ke-khai-thue" },
        { name: "Hỗ trợ thanh tra/quyết toán thuế", href: "/dich-vu/quyet-toan-thue" },
        { name: "Hoàn thuế (TNCN/GTGT)" },
      ],
    },
    {
      label: "Dịch vụ pháp lý doanh nghiệp",
      items: [
        { name: "Thành lập doanh nghiệp", href: "/dich-vu/thanh-lap-doanh-nghiep" },
        { name: "Thay đổi thông tin đăng ký doanh nghiệp" },
        { name: "Tạm ngừng kinh doanh" },
        { name: "Thành lập chi nhánh/Văn phòng đại diện" },
        { name: "Giải thể doanh nghiệp", href: "/dich-vu/giai-the-doanh-nghiep" },
      ],
    },
    {
      label: "Giấy phép lao động và thẻ tạm trú",
      items: [
        { name: "Xin cấp/xin miễn/gia hạn giấy phép lao động cho người nước ngoài", href: "/dich-vu/giay-phep-lao-dong" },
        { name: "Xin cấp/xin miễn/gia hạn thẻ tạm trú cho người nước ngoài", href: "/dich-vu/giay-phep-lao-dong" },
      ],
    },
  ];

  const navLinks = [
    { name: "Trang chủ", href: "/" },
    { name: "Về chúng tôi", href: "#ve-chung-toi" },
    { name: "Dịch vụ", href: "#dich-vu", hasSubmenu: true },
    { name: "Bảng giá", href: "#bang-gia" },
    { name: "Tin tức", href: "/tin-tuc" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        useDarkNav ? "bg-white/90 backdrop-blur-md shadow-sm py-4 h-[72px]" : "bg-transparent py-6 h-[88px]"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between h-full">
        <Link href="/">
          <div className="cursor-pointer rounded-lg overflow-hidden inline-flex bg-white">
            <img
              src={logoHorizontal}
              alt="NTH Consulting"
              className="h-9 md:h-10 w-auto block"
            />
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) =>
            link.hasSubmenu ? (
              <div
                key={link.name}
                className="relative"
                onMouseEnter={() => setDesktopServicesOpen(true)}
                onMouseLeave={() => setDesktopServicesOpen(false)}
              >
                <div
                  className={`cursor-pointer text-sm font-medium transition-colors hover:opacity-80 flex items-center gap-1 ${
                    useDarkNav ? "text-slate-700 hover:text-primary" : "text-white/90 hover:text-white"
                  }`}
                >
                  {link.name}
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${desktopServicesOpen ? "rotate-180" : ""}`} />
                </div>
                {desktopServicesOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50">
                    <div className="bg-white rounded-xl shadow-xl border border-slate-100 p-6 w-[860px] animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="grid grid-cols-3 gap-6">
                        {serviceGroups.map((group) => (
                          <div key={group.label}>
                            <div className="text-xs font-semibold uppercase tracking-wider text-blue-600 mb-3 pb-2 border-b border-slate-100">
                              {group.label}
                            </div>
                            <div className="flex flex-col gap-0.5">
                              {group.items.map((item) =>
                                item.href ? (
                                  <Link key={item.name} href={item.href}>
                                    <div className="px-3 py-2 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition-colors rounded-md leading-snug">
                                      {item.name}
                                    </div>
                                  </Link>
                                ) : (
                                  <div
                                    key={item.name}
                                    className="px-3 py-2 text-sm text-slate-400 cursor-default rounded-md leading-snug"
                                  >
                                    {item.name}
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <NavItem key={link.name} href={link.href}>
                <div
                  className={`cursor-pointer text-sm font-medium transition-colors hover:opacity-80 ${
                    useDarkNav ? "text-slate-700 hover:text-primary" : "text-white/90 hover:text-white"
                  }`}
                >
                  {link.name}
                </div>
              </NavItem>
            )
          )}
          <ContactDialog
            source="navbar-cta"
            trigger={
              <Button
                className={`font-semibold shadow-lg transition-all ${
                  useDarkNav
                    ? "bg-primary text-white shadow-primary/20 hover:bg-primary/90"
                    : "bg-white text-primary hover:bg-blue-50 border-transparent shadow-black/5"
                }`}
              >
                Liên hệ ngay
              </Button>
            }
          />
        </nav>

        {/* Mobile Toggle */}
        <button
          className={`md:hidden p-2 transition-colors ${useDarkNav ? "text-slate-700" : "text-white"}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-slate-100 shadow-xl p-4 flex flex-col gap-1 animate-in slide-in-from-top-5 max-h-[calc(100vh-80px)] overflow-y-auto">
          {navLinks.map((link) =>
            link.hasSubmenu ? (
              <div key={link.name}>
                <div
                  className="cursor-pointer text-slate-700 font-medium py-2 px-4 hover:bg-slate-50 rounded-lg flex items-center justify-between"
                  onClick={() => setServicesOpen(!servicesOpen)}
                >
                  {link.name}
                  {servicesOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
                {servicesOpen && (
                  <div className="ml-4 border-l-2 border-blue-100 pl-2 flex flex-col gap-3 mt-1 mb-2">
                    {serviceGroups.map((group) => (
                      <div key={group.label}>
                        <div className="text-xs font-semibold uppercase tracking-wider text-blue-600 px-3 py-1.5">
                          {group.label}
                        </div>
                        <div className="flex flex-col gap-0.5">
                          {group.items.map((item) =>
                            item.href ? (
                              <Link key={item.name} href={item.href}>
                                <div
                                  className="cursor-pointer text-slate-600 text-sm py-2 px-3 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors leading-snug"
                                  onClick={() => { setMobileMenuOpen(false); setServicesOpen(false); }}
                                >
                                  {item.name}
                                </div>
                              </Link>
                            ) : (
                              <div
                                key={item.name}
                                className="text-slate-400 text-sm py-2 px-3 cursor-default leading-snug"
                              >
                                {item.name}
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <NavItem
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="cursor-pointer text-slate-700 font-medium py-2 px-4 hover:bg-slate-50 rounded-lg">
                  {link.name}
                </div>
              </NavItem>
            )
          )}
          <ContactDialog
            source="navbar-mobile-cta"
            trigger={<Button className="w-full mt-2">Liên hệ ngay</Button>}
          />
        </div>
      )}
    </header>
  );
}
