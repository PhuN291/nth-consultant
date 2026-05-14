import { useEffect } from "react";
import { Link } from "wouter";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { AnchorLink } from "@/components/AnchorLink";
import { ContactDialog } from "@/components/ContactDialog";
import { Home, Search, ArrowRight, Compass } from "lucide-react";

const POPULAR_LINKS = [
  { name: "Kế toán trọn gói", href: "/dich-vu/ke-toan-tron-goi" },
  { name: "Lập BCTC cuối năm", href: "/dich-vu/lap-bctc-cuoi-nam" },
  { name: "Thành lập doanh nghiệp", href: "/dich-vu/thanh-lap-doanh-nghiep" },
  { name: "Giấy phép lao động & Thẻ tạm trú", href: "/dich-vu/giay-phep-lao-dong" },
];

export default function NotFound() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <div className="bg-blue-900 sticky top-0 z-50">
        <Navbar />
      </div>

      <main className="flex-1 flex items-center justify-center pt-20 pb-16 md:pt-28 md:pb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="relative inline-block mb-8">
              <div className="text-[120px] md:text-[180px] font-bold font-display leading-none bg-gradient-to-br from-blue-600 to-blue-900 bg-clip-text text-transparent select-none">
                404
              </div>
              <div className="absolute -top-4 -right-4 md:-top-6 md:-right-6 w-16 h-16 md:w-20 md:h-20 bg-blue-50 rounded-2xl flex items-center justify-center rotate-12 shadow-sm">
                <Compass className="w-8 h-8 md:w-10 md:h-10 text-blue-600" />
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold font-display text-slate-900 mb-4 leading-tight">
              Trang bạn tìm không tồn tại
            </h1>
            <p className="text-base md:text-lg text-slate-600 max-w-xl mx-auto mb-10 leading-relaxed">
              Có thể đường dẫn đã thay đổi, bị xoá hoặc bạn gõ sai địa chỉ. Hãy quay về trang chủ hoặc khám phá các dịch vụ phổ biến bên dưới.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
              <Link href="/">
                <Button size="lg" className="font-semibold shadow-lg shadow-primary/20 w-full sm:w-auto">
                  <Home className="w-4 h-4 mr-2" />
                  Về trang chủ
                </Button>
              </Link>
              <AnchorLink href="/#dich-vu">
                <Button size="lg" variant="outline" className="font-semibold w-full sm:w-auto">
                  <Search className="w-4 h-4 mr-2" />
                  Xem tất cả dịch vụ
                </Button>
              </AnchorLink>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 md:p-8 text-left">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-blue-600 mb-4">
                Dịch vụ phổ biến
              </h2>
              <div className="grid sm:grid-cols-2 gap-2">
                {POPULAR_LINKS.map((link) => (
                  <Link key={link.href} href={link.href}>
                    <div className="group flex items-center justify-between px-4 py-3 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors">
                      <span className="text-sm md:text-base text-slate-700 group-hover:text-blue-600 font-medium">
                        {link.name}
                      </span>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                    </div>
                  </Link>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-slate-100 text-center">
                <p className="text-sm text-slate-600 mb-3">
                  Không tìm thấy thứ bạn cần? Đội ngũ NTH Consulting sẵn sàng hỗ trợ.
                </p>
                <ContactDialog
                  source="not-found-cta"
                  trigger={
                    <Button variant="ghost" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 font-semibold">
                      Liên hệ tư vấn miễn phí
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
