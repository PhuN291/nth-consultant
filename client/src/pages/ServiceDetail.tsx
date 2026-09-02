import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  CheckCircle2,
  Phone,
  ShieldCheck,
  Home,
  AlertTriangle,
  Users,
  Award,
  FileCheck,
  Sparkles,
  HelpCircle,
} from "lucide-react";
import { Link, useParams } from "wouter";
import { useEffect } from "react";
import { getServiceBySlug } from "@/data/services";
import { ContactDialog } from "@/components/ContactDialog";
import { FloatingContact } from "@/components/FloatingContact";
import { ProcessTimeline } from "@/components/service/ProcessTimeline";
import { RelatedServices } from "@/components/service/RelatedServices";
import { ComparisonTable } from "@/components/sections/ComparisonTable";
import ServiceDetailKeToanTronGoi from "@/pages/ServiceDetailKeToanTronGoi";

import heroImg from "@/assets/images/service-detail-1.jpg";

// Trang "Kế toán trọn gói" dùng layout thiết kế riêng (theo wireframe duyệt riêng),
// khác với template chung áp dụng cho các dịch vụ còn lại.
const CUSTOM_LAYOUT_SLUGS = new Set(["ke-toan-tron-goi"]);

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const service = getServiceBySlug(slug || "");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (slug && CUSTOM_LAYOUT_SLUGS.has(slug)) {
    return <ServiceDetailKeToanTronGoi />;
  }

  if (!service) {
    return (
      <div className="min-h-screen font-sans bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Dịch vụ không tồn tại</h1>
          <Link href="/">
            <Button>Về trang chủ</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-sans bg-white selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden">
      <div className="bg-blue-900 sticky top-0 z-50">
        <Navbar />
      </div>

      {/* Breadcrumbs */}
      <div className="bg-white border-b border-slate-200 pt-20">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center text-sm text-slate-500 overflow-x-auto whitespace-nowrap scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
            <Link href="/" className="hover:text-primary transition-colors flex-shrink-0">
              <Home className="w-4 h-4" />
            </Link>
            <span className="mx-2 text-slate-300 flex-shrink-0">/</span>
            <Link href="/dich-vu" className="hover:text-primary transition-colors flex-shrink-0">
              Dịch vụ
            </Link>
            <span className="mx-2 text-slate-300 flex-shrink-0">/</span>
            <span className="text-slate-900 font-medium truncate">{service.title}</span>
          </div>
        </div>
      </div>

      {/* HERO ============================================================ */}
      <section className="bg-white border-b border-slate-100 pt-8 pb-10 md:pt-12 md:pb-14">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left: image */}
            <div className="rounded-lg overflow-hidden border border-slate-200 order-1 lg:order-1">
              <img src={service.image || heroImg} alt={service.title} className="w-full aspect-[4/3] object-cover" />
            </div>

            {/* Right: title + highlights + price + CTAs */}
            <div className="order-2 lg:order-2">
              <span className="inline-block text-primary font-semibold tracking-wider text-xs uppercase mb-3 bg-blue-50 px-2.5 py-1 rounded-sm">
                Dịch vụ • {service.sku}
              </span>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold font-display text-slate-900 mb-3 leading-tight">
                {service.title}
              </h1>
              <p className="text-base md:text-lg text-slate-600 mb-5 leading-relaxed">
                {service.subtitle}
              </p>

              {/* Highlights */}
              <ul className="space-y-2 mb-6">
                {service.highlights.slice(0, 4).map((h, i) => (
                  <li key={i} className="flex items-start gap-2 text-slate-700 text-sm md:text-base">
                    <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-emerald-600 flex-shrink-0 mt-0.5 md:mt-1" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              {/* Pricing — inline minimal */}
              <div className="flex items-baseline gap-3 mb-5 pb-5 border-b border-slate-200">
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-medium mb-0.5">
                    Giá dịch vụ
                  </p>
                  {service.price === "Liên hệ" ? (
                    <span className="text-2xl font-bold text-primary">Liên hệ báo giá</span>
                  ) : (
                    <span className="text-2xl font-bold text-primary">
                      {service.price}
                      {service.unit && <span className="text-slate-500 text-base font-normal ml-1">{service.unit}</span>}
                    </span>
                  )}
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-2">
                <ContactDialog
                  source={`service-detail/${service.slug}`}
                  service={service.title}
                  trigger={
                    <Button
                      size="lg"
                      className="flex-1 h-11 font-semibold"
                    >
                      Đăng ký tư vấn
                    </Button>
                  }
                />
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="flex-1 h-11 font-semibold border-slate-300"
                >
                  <a href="tel:0344130989">
                    <Phone className="w-4 h-4 mr-2" /> 0344 130 989
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STATS — thin row with dividers ===================== */}
      <section className="bg-slate-50 border-b border-slate-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-200">
            {[
              { value: "10+", label: "Năm kinh nghiệm" },
              { value: "500+", label: "Khách hàng" },
              { value: "100%", label: "Bảo mật dữ liệu" },
              { value: "24/7", label: "Hỗ trợ tư vấn" },
            ].map((s, i) => (
              <div key={i} className="text-center py-5 md:py-6 px-4">
                <div className="text-xl md:text-3xl font-bold text-primary mb-0.5">
                  {s.value}
                </div>
                <div className="text-xs md:text-sm text-slate-600">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DESCRIPTION =================================================== */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="mb-6">
            <span className="text-primary font-semibold tracking-wider text-xs uppercase mb-2 block">
              Giới thiệu
            </span>
            <h2 className="text-2xl md:text-3xl font-bold font-display text-slate-900">
              Dịch vụ này là gì?
            </h2>
          </div>
          <div className="prose prose-slate max-w-none prose-p:text-base md:prose-p:text-lg prose-p:leading-relaxed prose-p:text-slate-700">
            {service.description.split("\n\n").map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* ACCORDION CONTENT =============================================== */}
      <section className="py-12 md:py-16 bg-slate-50 border-y border-slate-100">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="mb-8">
            <span className="text-primary font-semibold tracking-wider text-xs uppercase mb-2 block">
              Chi tiết dịch vụ
            </span>
            <h2 className="text-2xl md:text-3xl font-bold font-display text-slate-900">
              Tìm hiểu sâu hơn
            </h2>
          </div>

          <Accordion type="multiple" defaultValue={["service-includes"]} className="space-y-2">
            {/* Problems */}
            <AccordionItem
              value="problems"
              className="bg-blue-50/60 rounded-lg border border-blue-100 px-4 !border-b"
            >
              <AccordionTrigger className="hover:no-underline py-4 text-base font-semibold text-slate-900">
                <span className="flex items-center gap-3 text-left">
                  <AlertTriangle className="w-4 h-4 text-slate-500 flex-shrink-0" />
                  Khi nào doanh nghiệp cần dịch vụ này?
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-4">
                <ul className="space-y-1.5 mb-3">
                  {service.problems.map((p, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-700 text-sm">
                      <span className="text-slate-400 mt-1">•</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
                {service.problemNote && (
                  <p className="text-sm text-slate-700 bg-slate-50 border border-slate-200 rounded-md p-3">
                    {service.problemNote}
                  </p>
                )}
              </AccordionContent>
            </AccordionItem>

            {/* Service Includes */}
            <AccordionItem
              value="service-includes"
              className="bg-blue-50/60 rounded-lg border border-blue-100 px-4 !border-b"
            >
              <AccordionTrigger className="hover:no-underline py-4 text-base font-semibold text-slate-900">
                <span className="flex items-center gap-3 text-left">
                  <FileCheck className="w-4 h-4 text-slate-500 flex-shrink-0" />
                  Dịch vụ bao gồm những gì?
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-4">
                <div className="space-y-4">
                  {service.serviceIncludes.map((g, i) => (
                    <div key={i}>
                      <h4 className="font-semibold text-slate-900 mb-2 text-sm">{g.title}</h4>
                      <ul className="space-y-1 pl-1">
                        {g.items.map((it, j) => (
                          <li key={j} className="flex items-start gap-2 text-sm text-slate-600">
                            <CheckCircle2 className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 mt-1" />
                            <span>{it}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                {service.serviceNote && (
                  <p className="mt-4 text-sm text-slate-700 bg-slate-50 border border-slate-200 rounded-md p-3 flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" />
                    <span>{service.serviceNote}</span>
                  </p>
                )}
              </AccordionContent>
            </AccordionItem>

            {/* Benefits */}
            <AccordionItem
              value="benefits"
              className="bg-blue-50/60 rounded-lg border border-blue-100 px-4 !border-b"
            >
              <AccordionTrigger className="hover:no-underline py-4 text-base font-semibold text-slate-900">
                <span className="flex items-center gap-3 text-left">
                  <Sparkles className="w-4 h-4 text-slate-500 flex-shrink-0" />
                  Lợi ích khi sử dụng dịch vụ
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-4">
                <div className="grid md:grid-cols-2 gap-2">
                  {service.benefits.map((b, i) => (
                    <div key={i} className="bg-slate-50 p-3 rounded-md border border-slate-100">
                      <h4 className="font-semibold text-slate-900 mb-1 flex items-start gap-2 text-sm">
                        <CheckCircle2 className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 mt-1" />
                        <span>{b.title}</span>
                      </h4>
                      <p className="text-xs text-slate-600 pl-5 leading-relaxed">{b.description}</p>
                    </div>
                  ))}
                </div>
                {service.benefitNote && (
                  <p className="mt-3 text-sm text-slate-700 bg-slate-50 border border-slate-200 rounded-md p-3">
                    {service.benefitNote}
                  </p>
                )}
              </AccordionContent>
            </AccordionItem>

            {/* Commitments */}
            {service.commitments && service.commitments.length > 0 && (
              <AccordionItem
                value="commitments"
                className="bg-blue-50/60 rounded-lg border border-blue-100 px-4 !border-b"
              >
                <AccordionTrigger className="hover:no-underline py-4 text-base font-semibold text-slate-900">
                  <span className="flex items-center gap-3 text-left">
                    <Award className="w-4 h-4 text-slate-500 flex-shrink-0" />
                    Cam kết của chúng tôi
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-4">
                  <div className="grid md:grid-cols-2 gap-2">
                    {service.commitments.map((c, i) => (
                      <div key={i} className="bg-slate-50 p-3 rounded-md border border-slate-100">
                        <h4 className="font-semibold text-slate-900 mb-1 flex items-start gap-2 text-sm">
                          <ShieldCheck className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 mt-1" />
                          <span>{c.title}</span>
                        </h4>
                        <p className="text-xs text-slate-600 pl-5 leading-relaxed">{c.description}</p>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            )}

            {/* Target Audience */}
            <AccordionItem
              value="audience"
              className="bg-blue-50/60 rounded-lg border border-blue-100 px-4 !border-b"
            >
              <AccordionTrigger className="hover:no-underline py-4 text-base font-semibold text-slate-900">
                <span className="flex items-center gap-3 text-left">
                  <Users className="w-4 h-4 text-slate-500 flex-shrink-0" />
                  Đối tượng phù hợp
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-4">
                <div className="flex flex-wrap gap-2">
                  {service.targetAudience.map((t, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-700 text-sm font-medium px-3 py-1 rounded-md border border-slate-200"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-slate-400" />
                      {t}
                    </span>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* FAQ */}
            <AccordionItem
              value="faq"
              className="bg-blue-50/60 rounded-lg border border-blue-100 px-4 !border-b"
            >
              <AccordionTrigger className="hover:no-underline py-4 text-base font-semibold text-slate-900">
                <span className="flex items-center gap-3 text-left">
                  <HelpCircle className="w-4 h-4 text-slate-500 flex-shrink-0" />
                  Câu hỏi thường gặp
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-4">
                <Accordion type="single" collapsible className="space-y-1.5">
                  {service.faq.map((q, i) => (
                    <AccordionItem
                      key={i}
                      value={`faq-${i}`}
                      className="bg-slate-50 rounded-md border border-slate-100 px-3 !border-b"
                    >
                      <AccordionTrigger className="text-sm font-medium text-slate-900 hover:no-underline py-3 text-left">
                        {q.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm text-slate-600 pb-3 leading-relaxed">
                        {q.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* PROCESS TIMELINE ============================================== */}
      <ProcessTimeline
        steps={service.process}
        processTime={service.processTime}
        processNote={service.processNote}
      />

      {/* COMPARISON TABLE ============================================ */}
      {service.comparison && <ComparisonTable />}

      {/* CTA BANNER — solid color ====================================== */}
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
              source={`service-detail-bottom-cta/${service.slug}`}
              service={service.title}
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

      {/* RELATED ======================================================== */}
      <RelatedServices currentSlug={service.slug} />

      <Footer />

      {/* Floating phone button */}
      <FloatingContact />

      {/* Sticky Mobile CTA ============================================ */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-3 md:hidden z-50">
        <div className="flex gap-2">
          <Button asChild variant="outline" className="flex-1 border-slate-300 font-semibold h-11">
            <a href="tel:0344130989">
              <Phone className="w-4 h-4 mr-1" /> Gọi
            </a>
          </Button>
          <ContactDialog
            source={`service-detail-mobile/${service.slug}`}
            service={service.title}
            trigger={
              <Button className="flex-[2] font-semibold h-11">
                Đăng ký tư vấn
              </Button>
            }
          />
        </div>
      </div>
    </div>
  );
}
