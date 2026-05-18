import { useEffect } from "react";
import { Link } from "wouter";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { ContactDialog } from "@/components/ContactDialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowRight, CheckCircle2, Phone } from "lucide-react";
import { categories } from "@/data/service-categories";

export default function ServicesPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen font-sans bg-white selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden">
      <div className="bg-blue-900 sticky top-0 z-50">
        <Navbar />
      </div>

      {/* HERO */}
      <section className="bg-gradient-to-b from-blue-50/60 to-white border-b border-slate-100 pt-20 md:pt-24 pb-10 md:pb-14">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <span className="inline-block text-primary font-semibold tracking-wider text-xs uppercase mb-3 bg-blue-100 px-2.5 py-1 rounded-sm">
            Danh mục dịch vụ
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display text-slate-900 mb-4 leading-tight">
            Tất cả dịch vụ của NTH Consulting
          </h1>
          <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
            Chọn dịch vụ phù hợp và đặt lịch tư vấn miễn phí — chuyên viên sẽ liên hệ trong vòng 15 phút.
          </p>
        </div>
      </section>

      {/* CATEGORY TABLES */}
      <section className="py-10 md:py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="space-y-12 md:space-y-16">
            {categories.map((category) => (
              <div key={category.label}>
                <div className="mb-5 md:mb-6">
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-bold font-display text-slate-900">
                    {category.label}
                  </h2>
                  {category.intro && (
                    <p className="text-slate-600 mt-2 max-w-3xl text-sm md:text-base">
                      {category.intro}
                    </p>
                  )}
                </div>

                <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-slate-50 hover:bg-slate-50">
                        <TableHead className="min-w-[260px] text-slate-700 font-semibold">
                          Dịch vụ
                        </TableHead>
                        <TableHead className="min-w-[280px] text-slate-700 font-semibold">
                          Phạm vi & tính năng
                        </TableHead>
                        <TableHead className="min-w-[120px] text-slate-700 font-semibold whitespace-nowrap">
                          Trạng thái
                        </TableHead>
                        <TableHead className="min-w-[200px] text-right text-slate-700 font-semibold">
                          Hành động
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {category.services.map((service, index) => {
                        const Icon = service.icon;
                        const isComingSoon = service.comingSoon === true;
                        return (
                          <TableRow
                            key={`${category.label}-${index}`}
                            className="hover:bg-blue-50/40 transition-colors"
                          >
                            <TableCell className="align-top py-4">
                              <div className="flex items-start gap-3">
                                <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                                  <Icon className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                  <div className="font-semibold text-slate-900 leading-snug">
                                    {service.title}
                                  </div>
                                </div>
                              </div>
                            </TableCell>

                            <TableCell className="align-top py-4">
                              <p className="text-sm text-slate-600 mb-2 leading-relaxed">
                                {service.description}
                              </p>
                              <ul className="space-y-1">
                                {service.features.map((feature, idx) => (
                                  <li
                                    key={idx}
                                    className="flex items-start text-xs md:text-sm text-slate-500"
                                  >
                                    <CheckCircle2 className="w-3.5 h-3.5 text-slate-400 mr-1.5 mt-0.5 flex-shrink-0" />
                                    <span>{feature}</span>
                                  </li>
                                ))}
                              </ul>
                            </TableCell>

                            <TableCell className="align-top py-4">
                              {isComingSoon ? (
                                <Badge
                                  variant="secondary"
                                  className="bg-amber-50 text-amber-700 border border-amber-200 font-medium whitespace-nowrap"
                                >
                                  Sắp ra mắt
                                </Badge>
                              ) : (
                                <Badge
                                  variant="secondary"
                                  className="bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium whitespace-nowrap"
                                >
                                  Đang cung cấp
                                </Badge>
                              )}
                            </TableCell>

                            <TableCell className="align-top py-4 text-right">
                              <div className="inline-flex flex-col gap-2 items-stretch min-w-[160px]">
                                <ContactDialog
                                  source={`services-page/${service.slug ?? "coming-soon"}`}
                                  service={service.title}
                                  trigger={
                                    <Button size="sm" className="w-full font-semibold">
                                      Đặt lịch tư vấn
                                    </Button>
                                  }
                                />
                                {service.slug && (
                                  <Link
                                    href={`/dich-vu/${service.slug}`}
                                    className={buttonVariants({
                                      variant: "ghost",
                                      size: "sm",
                                      className:
                                        "text-blue-600 hover:text-blue-800 hover:bg-blue-50 font-medium",
                                    })}
                                  >
                                    Chi tiết
                                    <ArrowRight className="ml-1 w-3.5 h-3.5" />
                                  </Link>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog cross-link */}
      <section className="py-8 md:py-10 bg-slate-50 border-t border-slate-100">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <p className="text-slate-600 text-sm md:text-base">
            Bạn cần tìm hiểu sâu hơn về thuế, kế toán và pháp lý?{" "}
            <Link
              href="/tin-tuc"
              className="text-blue-600 hover:text-blue-800 font-semibold underline-offset-2 hover:underline"
            >
              Đọc các bài viết mới nhất →
            </Link>
          </p>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-12 md:py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-bold font-display mb-3">
            Sẵn sàng bắt đầu với NTH Consulting?
          </h2>
          <p className="text-blue-100 text-base md:text-lg mb-6">
            Để lại thông tin, chuyên viên sẽ liên hệ tư vấn miễn phí trong vòng 15 phút.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <ContactDialog
              source="services-page/bottom-cta"
              trigger={
                <Button
                  size="lg"
                  className="bg-white text-primary hover:bg-blue-50 font-semibold h-11 px-6"
                >
                  Đăng ký tư vấn miễn phí
                </Button>
              }
            />
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/40 text-white hover:bg-white/10 hover:border-white h-11 px-6 font-semibold bg-transparent"
            >
              <a href="tel:0344130989">
                <Phone className="w-4 h-4 mr-2" /> Gọi 0344 130 989
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingContact />
    </div>
  );
}
