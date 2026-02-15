import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const isHome = location === "/";
  const useDarkNav = !isHome || isScrolled;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Trang chủ", href: "/" },
    { name: "Về chúng tôi", href: "#about" },
    { name: "Dịch vụ", href: "#services" },
    { name: "Bảng giá", href: "#pricing" },
    { name: "Tin tức", href: "/news" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        useDarkNav ? "bg-white/90 backdrop-blur-md shadow-sm py-4 h-[72px]" : "bg-transparent py-6 h-[88px]"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between h-full">
        <Link href="/">
          <div className={`cursor-pointer text-2xl font-bold font-display tracking-tight flex items-center gap-2 transition-colors ${
            useDarkNav ? "text-primary" : "text-white"
          }`}>
            <span className={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${
              useDarkNav ? "bg-primary text-white" : "bg-white text-primary"
            }`}>DL</span>
            ĐĂNG LÂM
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href}>
              <div
                className={`cursor-pointer text-sm font-medium transition-colors hover:opacity-80 ${
                  useDarkNav ? "text-slate-700 hover:text-primary" : "text-white/90 hover:text-white"
                }`}
              >
                {link.name}
              </div>
            </Link>
          ))}
          <Button 
            className={`font-semibold shadow-lg transition-all ${
              useDarkNav 
                ? "bg-primary text-white shadow-primary/20 hover:bg-primary/90" 
                : "bg-white text-primary hover:bg-blue-50 border-transparent shadow-black/5"
            }`}
          >
            Liên hệ ngay
          </Button>
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
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-slate-100 shadow-xl p-4 flex flex-col gap-4 animate-in slide-in-from-top-5 max-h-[calc(100vh-80px)] overflow-y-auto">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href}>
              <div
                className="cursor-pointer text-slate-700 font-medium py-2 px-4 hover:bg-slate-50 rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </div>
            </Link>
          ))}
          <Button className="w-full">Liên hệ ngay</Button>
        </div>
      )}
    </header>
  );
}
