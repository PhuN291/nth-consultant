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
  Phone,
  Home,
  Users,
  FileCheck,
  HelpCircle,
  Clock,
  Wallet,
  LineChart,
  ClipboardCheck,
  ShieldCheck,
  Lock,
  Landmark,
  MessageCircle,
  Quote,
  CheckCircle2,
} from "lucide-react";
import { Link } from "wouter";
import { useEffect, useState } from "react";
import { getServiceBySlug } from "@/data/services";
import { ContactDialog } from "@/components/ContactDialog";
import { FloatingContact } from "@/components/FloatingContact";
import { ProcessTimeline } from "@/components/service/ProcessTimeline";

const SLUG = "ke-toan-tron-goi";

function Check() {
  return (
    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[11px] font-bold flex-shrink-0 mt-0.5">
      ✓
    </span>
  );
}

const heroChecks = [
  "Tiết kiệm chi phí vận hành kế toán hàng tháng",
  "Đảm bảo đúng hạn, đúng quy định pháp luật thuế",
  "Có kế toán phụ trách riêng, phản hồi nhanh khi cần",
  "Chịu trách nhiệm rõ ràng bằng hợp đồng",
];

const painPoints = [
  {
    title: "Không có kế toán hoặc kế toán thiếu kinh nghiệm",
    desc: "Doanh nghiệp nhỏ thường chưa có kế toán, hoặc kế toán còn non kinh nghiệm, dễ hạch toán sai, thiếu chứng từ hợp lệ và không nắm kịp các quy định thuế mới nhất.",
  },
  {
    title: "Lo sợ sai sót, chậm nộp báo cáo thuế",
    desc: "Trễ hạn kê khai, sai số liệu, thiếu chứng từ hợp lệ đều dẫn đến rủi ro bị xử phạt hành chính hoặc truy thu thuế ngoài dự kiến.",
  },
  {
    title: "Kế toán nghỉ việc đột ngột, mất kiểm soát sổ sách",
    desc: "Bàn giao không đầy đủ khiến doanh nghiệp mất thời gian dài để rà soát lại toàn bộ dữ liệu kế toán trước đó.",
  },
  {
    title: "Không có báo cáo để ra quyết định kịp thời",
    desc: "Số liệu chỉ được tổng hợp vào cuối năm khiến chủ doanh nghiệp không nắm được tình hình dòng tiền và lợi nhuận theo thời gian thực.",
  },
];

const scopeGroups = [
  {
    num: "01",
    title: "Kê khai và báo cáo thuế định kỳ",
    items: [
      "Kê khai thuế GTGT, TNCN hàng tháng, hàng quý",
      "Báo cáo tình hình sử dụng hóa đơn",
      "Tạm tính và nộp thuế TNDN theo quý",
      "Rà soát rủi ro thuế trước khi nộp",
    ],
  },
  {
    num: "02",
    title: "Sổ sách và chứng từ kế toán",
    items: [
      "Hạch toán chứng từ, lên sổ sách theo tháng",
      "Kiểm tra tính hợp lệ của hóa đơn đầu vào, đầu ra",
      "Quản lý và lưu trữ chứng từ theo quy định",
      "Đối chiếu công nợ, tồn kho định kỳ",
    ],
  },
  {
    num: "03",
    title: "Báo cáo tài chính cuối năm",
    items: [
      "Lập báo cáo tài chính, quyết toán thuế năm",
      "Báo cáo TNCN cho người lao động",
      "Rà soát và tối ưu chi phí hợp lý, hợp lệ",
      "Chuẩn bị hồ sơ sẵn sàng cho thanh tra, kiểm tra",
    ],
  },
  {
    num: "04",
    title: "Tư vấn thuế và pháp lý đi kèm",
    items: [
      "Tư vấn phương án tối ưu thuế hợp pháp",
      "Cập nhật kịp thời chính sách thuế mới",
      "Hỗ trợ giải trình khi cơ quan thuế yêu cầu",
      "Tư vấn khi có thay đổi giấy phép kinh doanh",
    ],
  },
  {
    num: "05",
    title: "Lương, bảo hiểm và nhân sự kế toán",
    items: [
      "Tính lương, thuế TNCN cho nhân viên",
      "Thủ tục đăng ký, tăng giảm BHXH",
      "Lập hợp đồng lao động theo mẫu chuẩn",
      "Tư vấn cơ cấu lương phù hợp quy định thuế",
    ],
  },
  {
    num: "06",
    title: "Báo cáo quản trị cho chủ doanh nghiệp",
    items: [
      "Báo cáo doanh thu, chi phí, lợi nhuận theo tháng",
      "Cập nhật số liệu qua phần mềm hoặc dashboard riêng",
      "Trao đổi định kỳ với kế toán phụ trách",
      "Cảnh báo sớm rủi ro tài chính, dòng tiền",
    ],
  },
];

const audience = [
  {
    title: "Doanh nghiệp mới thành lập",
    desc: "Chưa có bộ phận kế toán, cần thiết lập hệ thống sổ sách và tuân thủ thuế ngay từ đầu, tránh sai sót ban đầu gây rủi ro về sau.",
  },
  {
    title: "Doanh nghiệp vừa và nhỏ",
    desc: "Muốn tối ưu chi phí vận hành, không cần duy trì kế toán nội bộ toàn thời gian nhưng vẫn cần đảm bảo tuân thủ đầy đủ.",
  },
  {
    title: "Doanh nghiệp đang mở rộng quy mô",
    desc: "Cần báo cáo tài chính chính xác, kịp thời để ra quyết định kinh doanh, gọi vốn hoặc làm việc với ngân hàng.",
  },
];

const processSteps = [
  { title: "Tiếp nhận và khảo sát", desc: "NTH tìm hiểu quy mô, ngành nghề và hiện trạng sổ sách của doanh nghiệp." },
  { title: "Tư vấn và báo giá", desc: "Đề xuất gói dịch vụ phù hợp, báo giá minh bạch, không phát sinh ẩn." },
  { title: "Ký hợp đồng", desc: "Thống nhất phạm vi công việc, cam kết chất lượng và trách nhiệm pháp lý." },
  { title: "Bàn giao dữ liệu", desc: "Tiếp nhận chứng từ, rà soát và chuẩn hóa lại sổ sách cũ nếu có." },
  { title: "Vận hành định kỳ", desc: "Kế toán phụ trách xử lý công việc hàng tháng và báo cáo kết quả cho bạn." },
];

const pricingTiers = [
  {
    name: "Gói Cơ Bản",
    desc: "Phù hợp doanh nghiệp mới thành lập, ít phát sinh chứng từ",
    price: "700.000đ",
    unit: "/ tháng",
    note: "Dưới 20 chứng từ mỗi tháng",
    features: [
      "Kê khai thuế GTGT, TNCN hàng tháng, hàng quý",
      "Hạch toán sổ sách cơ bản",
      "Một kế toán phụ trách qua Zalo, Email",
      "Báo cáo tài chính cuối năm",
    ],
    featured: false,
    cta: "Chọn gói này",
  },
  {
    name: "Gói Tiêu Chuẩn",
    desc: "Phù hợp doanh nghiệp thương mại, dịch vụ đang hoạt động ổn định",
    price: "1.500.000đ",
    unit: "/ tháng",
    note: "Từ 20 đến 60 chứng từ mỗi tháng",
    features: [
      "Toàn bộ hạng mục của gói Cơ Bản",
      "Kế toán phụ trách riêng, họp định kỳ hàng tháng",
      "Báo cáo quản trị doanh thu, chi phí, lợi nhuận",
      "Tư vấn tối ưu thuế theo quý",
      "Hỗ trợ giải trình khi có yêu cầu từ cơ quan thuế",
    ],
    featured: true,
    badge: "Được chọn nhiều nhất",
    cta: "Chọn gói này",
  },
  {
    name: "Gói Nâng Cao",
    desc: "Phù hợp doanh nghiệp sản xuất, nhiều chi nhánh hoặc chứng từ phức tạp",
    price: "Liên hệ",
    unit: "báo giá",
    note: "Trên 60 chứng từ mỗi tháng",
    features: [
      "Toàn bộ hạng mục của gói Tiêu Chuẩn",
      "Kế toán trưởng phụ trách theo dõi riêng",
      "Dashboard báo cáo tài chính theo thời gian thực",
      "Tư vấn cơ cấu thuế, dòng tiền chuyên sâu",
      "Ưu tiên hỗ trợ khi có thanh tra, kiểm tra thuế",
    ],
    featured: false,
    cta: "Nhận tư vấn riêng",
  },
];

const commitmentIcons = [ShieldCheck, Lock, Landmark, MessageCircle];
const benefitIcons = [ClipboardCheck, LineChart, Clock, Wallet, Users, FileCheck];

const testimonials = [
  {
    name: "Chị Minh Anh",
    role: "Giám đốc, Công ty TNHH Thương mại Hoàng Phát",
    quote: "Từ khi chuyển sang dùng dịch vụ của NTH, mình không còn phải lo lắng mỗi kỳ nộp thuế nữa. Báo cáo hàng tháng rất rõ ràng, dễ hiểu.",
  },
  {
    name: "Anh Quốc Bảo",
    role: "Chủ doanh nghiệp, Bảo Bảo Coffee House",
    quote: "Điều mình đánh giá cao nhất là có một kế toán phụ trách riêng, hỏi gì cũng được trả lời nhanh thay vì chờ đợi tổng đài.",
  },
  {
    name: "Chị Thu Hằng",
    role: "Giám đốc tài chính, Công ty CP Nội thất An Gia",
    quote: "NTH đã hỗ trợ mình dọn dẹp lại toàn bộ sổ sách cũ bị rối trước đó, sau hai tháng mọi thứ đã đâu vào đấy và rất minh bạch.",
  },
  {
    name: "Anh Đức Thịnh",
    role: "Founder, Xưởng may Thịnh Phát",
    quote: "Team NTH cập nhật chính sách thuế mới rất nhanh, mình luôn được thông báo trước khi có gì thay đổi ảnh hưởng đến công ty.",
  },
];

const faqs = [
  {
    q: "Doanh nghiệp mới thành lập, chưa có sổ sách thì bắt đầu như thế nào?",
    a: "NTH sẽ khảo sát hiện trạng, thiết lập hệ thống sổ sách từ đầu và hướng dẫn quy trình xuất hóa đơn, lưu trữ chứng từ phù hợp với ngành nghề của doanh nghiệp.",
  },
  {
    q: "Nếu sổ sách cũ đang bị sai sót hoặc thiếu chứng từ thì NTH có xử lý được không?",
    a: "Có. NTH nhận rà soát và xử lý lại sổ sách bị tồn đọng, đối chiếu số liệu với cơ quan thuế và đề xuất phương án khắc phục phù hợp trước khi tiếp nhận vận hành mới.",
  },
  {
    q: "Thời gian bàn giao và bắt đầu sử dụng dịch vụ mất bao lâu?",
    a: "Thông thường từ 3 đến 5 ngày làm việc kể từ khi ký hợp đồng và nhận đủ hồ sơ, chứng từ ban đầu từ phía doanh nghiệp.",
  },
  {
    q: "Doanh nghiệp có thể theo dõi số liệu kế toán theo thời gian thực không?",
    a: "Có. Tùy theo gói dịch vụ, doanh nghiệp được cấp quyền truy cập báo cáo định kỳ hoặc dashboard theo thời gian thực để theo dõi doanh thu, chi phí và lợi nhuận.",
  },
  {
    q: "Nếu xảy ra sai sót do lỗi của NTH thì trách nhiệm được xử lý như thế nào?",
    a: "Trách nhiệm và phương án xử lý khi có sai sót phát sinh từ lỗi nghiệp vụ của NTH được quy định rõ trong hợp đồng dịch vụ, đảm bảo quyền lợi cho doanh nghiệp.",
  },
];

// Section heading dùng chung — giữ đúng copy & thứ tự "nhãn nhỏ + tiêu đề + mô tả" như wireframe
function SectionHeading({ label, heading, sub }: { label: string; heading: string; sub?: string }) {
  return (
    <div className="max-w-2xl mx-auto mb-10 text-center">
      <span className="text-slate-500 font-bold tracking-[0.12em] text-xs uppercase mb-2 block">{label}</span>
      <h2 className="mb-3 text-2xl font-bold md:text-3xl font-display text-slate-900">{heading}</h2>
      {sub && <p className="text-slate-600">{sub}</p>}
    </div>
  );
}

// Form inline ở CTA cuối trang — cùng cách xử lý (POST /api/contact) với ContactDialog,
// chỉ khác là hiển thị ngay tại chỗ thay vì trong modal, đúng như wireframe cta-form-mock.
function CtaInlineForm({ serviceTitle, source }: { serviceTitle: string; source: string }) {
  const [form, setForm] = useState({ name: "", phone: "", company: "" });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const payload = {
        name: form.name.trim(),
        phone: form.phone.trim(),
        title: null,
        company: form.company.trim() || null,
        service: serviceTitle,
        source,
      };
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || "Gửi thất bại");
      }
      setSuccess(true);
    } catch (err: any) {
      setError(err?.message?.replace(/^\d+:\s*/, "") || "Có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="p-6 mx-auto mt-6 text-center bg-white max-w-130 rounded-2xl">
        <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 bg-green-100 rounded-full">
          <CheckCircle2 className="w-6 h-6 text-green-600" />
        </div>
        <h3 className="mb-1 font-bold text-slate-900">Đã gửi thành công!</h3>
        <p className="text-sm text-slate-600">Chuyên viên NTH sẽ liên hệ lại trong vòng 15 phút.</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="max-w-130 mx-auto mt-6 bg-white rounded-2xl p-5 flex flex-wrap gap-2.5 justify-center text-left"
    >
      <input
        value={form.name}
        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
        placeholder="Họ và tên"
        required
        disabled={submitting}
        maxLength={200}
        className="flex-1 min-w-40 border border-slate-200 rounded-lg px-3.5 py-3 text-[13.5px] text-slate-900 placeholder:text-slate-400"
      />
      <input
        type="tel"
        value={form.phone}
        onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
        placeholder="Số điện thoại"
        required
        disabled={submitting}
        maxLength={20}
        className="flex-1 min-w-40 border border-slate-200 rounded-lg px-3.5 py-3 text-[13.5px] text-slate-900 placeholder:text-slate-400"
      />
      <input
        value={form.company}
        onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
        placeholder="Tên doanh nghiệp (nếu có)"
        disabled={submitting}
        maxLength={200}
        className="flex-1 min-w-40 border border-slate-200 rounded-lg px-3.5 py-3 text-[13.5px] text-slate-900 placeholder:text-slate-400"
      />
      {error && (
        <div className="w-full px-3 py-2 text-xs text-center text-red-700 border border-red-200 rounded-lg bg-red-50">
          {error}
        </div>
      )}
      <Button
        type="submit"
        disabled={submitting}
        className="w-full mt-1.5 h-11 font-semibold text-white bg-[#0B8043] hover:bg-[#097038]"
      >
        {submitting ? "Đang gửi..." : "Gửi yêu cầu tư vấn"}
      </Button>
    </form>
  );
}

export default function ServiceDetailKeToanTronGoi() {
  const service = getServiceBySlug(SLUG);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!service) return null;

  return (
    <div className="min-h-screen overflow-x-hidden font-sans bg-white selection:bg-blue-100 selection:text-blue-900">
      <div className="sticky top-0 z-50 bg-blue-900">
        <Navbar />
      </div>

      {/* Breadcrumbs */}
      <div className="pt-20 bg-white border-b border-slate-200">
        <div className="container px-4 py-3 mx-auto">
          <div className="flex items-center px-4 -mx-4 overflow-x-auto text-sm text-slate-500 whitespace-nowrap scrollbar-hide md:mx-0 md:px-0">
            <Link href="/" className="flex-shrink-0 transition-colors hover:text-primary">
              <Home className="w-4 h-4" />
            </Link>
            <span className="flex-shrink-0 mx-2 text-slate-300">/</span>
            <Link href="/dich-vu" className="flex-shrink-0 transition-colors hover:text-primary">
              Dịch vụ
            </Link>
            <span className="flex-shrink-0 mx-2 text-slate-300">/</span>
            <span className="font-medium truncate text-slate-900">{service.title}</span>
          </div>
        </div>
      </div>

      {/* HERO — cột trái 1.1fr rộng hơn cột phải 0.9fr, giống wireframe ==== */}
      <section className="pt-10 border-b bg-gradient-to-br from-blue-50 via-blue-50/60 to-white border-slate-100 pb-14 md:pt-14 md:pb-16">
        <div className="container px-4 mx-auto">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-12 items-center">
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-[42px] font-bold font-display text-slate-900 mb-4 leading-tight max-w-xl">
                {service.title}
              </h1>
              <p className="max-w-lg mb-6 text-base leading-relaxed md:text-lg text-slate-600">
                Giao toàn bộ sổ sách, thuế và báo cáo tài chính cho đội ngũ kế toán chuyên trách của NTH, để bạn tập trung thời gian và nguồn lực vào việc phát triển kinh doanh.
              </p>

              <ul className="space-y-2.5 mb-7">
                {heroChecks.map((h, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-slate-700 text-sm md:text-[14.5px]">
                    <Check />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col gap-3 sm:flex-row">
                <ContactDialog
                  source={`service-detail/${service.slug}`}
                  service={service.title}
                  trigger={
                    <Button size="lg" className="h-12 px-6 font-semibold">
                      Nhận tư vấn trong 30 phút
                    </Button>
                  }
                />
                <Button asChild size="lg" variant="outline" className="h-12 px-6 font-semibold border-slate-300">
                  <a href="#bang-gia">Xem các gói dịch vụ</a>
                </Button>
              </div>
            </div>

            <div className="overflow-hidden shadow-sm rounded-2xl">
              <img
                src={service.image}
                alt={service.title}
                className="w-full aspect-[4/3] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* VẤN ĐỀ THƯỜNG GẶP — section trắng full-width, đúng wireframe ====== */}
      <section className="bg-white py-14 md:py-16">
        <div className="container px-4 mx-auto">
          <SectionHeading
            label="Vấn đề thường gặp"
            heading="Doanh nghiệp bạn có đang gặp những vấn đề này"
            sub="Đây là lý do phổ biến nhất khiến các chủ doanh nghiệp tìm đến dịch vụ kế toán trọn gói thay vì tự vận hành nội bộ."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {painPoints.map((p, i) => (
              <div key={i} className="p-6 bg-white border shadow-sm border-slate-200 rounded-xl">
                <div className="w-11 h-11 rounded-[10px] bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-lg mb-3.5">
                  {i + 1}
                </div>
                <h3 className="mb-2 text-base font-semibold text-slate-900">{p.title}</h3>
                <p className="text-sm leading-relaxed text-slate-600">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PHẠM VI CÔNG VIỆC — card xám bo góc nổi trên nền trắng (scope-wrap) */}
      <section className="py-3 bg-white md:py-4">
        <div className="container px-4 mx-auto">
          <div className="bg-slate-50 rounded-[20px] px-6 py-11 md:px-10 md:py-14">
            <SectionHeading
              label="Phạm vi công việc"
              heading="Dịch vụ kế toán trọn gói của NTH bao gồm những gì"
              sub="Một gói dịch vụ, xử lý toàn bộ nghiệp vụ kế toán, thuế và báo cáo. Áp dụng linh hoạt cho công ty thương mại, dịch vụ, sản xuất và hộ kinh doanh cá thể, phạm vi cụ thể sẽ được điều chỉnh theo đặc thù ngành nghề của từng khách hàng."
            />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {scopeGroups.map((g) => (
                <div key={g.num} className="p-5 bg-white border rounded-lg border-slate-200">
                  <div className="w-[30px] h-[30px] rounded-lg bg-blue-50 text-primary flex items-center justify-center font-bold text-[13px] mb-3">
                    {g.num}
                  </div>
                  <h4 className="font-semibold text-slate-900 text-sm mb-2.5">{g.title}</h4>
                  <ul className="space-y-1.5">
                    {g.items.map((it, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-slate-600">
                        <span className="text-slate-300 mt-1.5">•</span>
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ĐỐI TƯỢNG PHÙ HỢP — card xám bo góc, đúng wireframe ================ */}
      <section className="py-3 bg-white md:py-4">
        <div className="container px-4 mx-auto">
          <div className="bg-slate-50 rounded-[24px] px-6 py-11 md:px-10 md:py-14">
            <SectionHeading
              label="Đối tượng phù hợp"
              heading="Dịch vụ này dành cho ai"
              sub="NTH thiết kế dịch vụ kế toán trọn gói để giải quyết đúng bài toán của từng nhóm doanh nghiệp."
            />
            <div className="grid gap-5 md:grid-cols-3">
              {audience.map((a, i) => (
                <div key={i} className="p-6 rounded-lg bg-blue-50">
                  <h4 className="mb-2 text-base font-semibold text-blue-900">{a.title}</h4>
                  <p className="text-sm leading-relaxed text-slate-600">{a.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* QUY TRÌNH HỢP TÁC — tái dùng ProcessTimeline với copy đúng wireframe */}
      <ProcessTimeline
        steps={processSteps}
        label="Quy trình hợp tác"
        labelClassName="text-slate-500"
        heading="Bắt đầu sử dụng dịch vụ chỉ trong 5 bước"
        processNote="Quy trình được chuẩn hóa để bàn giao nhanh, không gián đoạn hoạt động kế toán hiện tại của doanh nghiệp."
        dashedConnector
      />

      {/* CAM KẾT — section trắng full-width, đúng wireframe ================ */}
      {service.commitments && service.commitments.length > 0 && (
        <section className="bg-white py-14 md:py-16">
          <div className="container px-4 mx-auto">
            <SectionHeading label="Vì sao chọn NTH" heading="Cam kết của chúng tôi" />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {service.commitments.map((c, i) => {
                const Icon = commitmentIcons[i % commitmentIcons.length];
                return (
                  <div key={i} className="p-6 bg-white border rounded-lg border-slate-200">
                    <div className="w-10 h-10 rounded-[10px] bg-blue-50 text-primary flex items-center justify-center mb-3.5">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="font-semibold text-slate-900 text-sm mb-1.5">{c.title}</h4>
                    <p className="text-sm text-slate-600">{c.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* LỢI ÍCH — card xám bo góc, đúng wireframe =========================== */}
      <section className="py-3 bg-white md:py-4">
        <div className="container px-4 mx-auto">
          <div className="bg-slate-50 rounded-[24px] px-6 py-11 md:px-10 md:py-14">
            <SectionHeading label="Giá trị mang lại" heading="Lợi ích khi sử dụng dịch vụ" />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-[18px]">
              {service.benefits.map((b, i) => {
                const Icon = benefitIcons[i % benefitIcons.length];
                return (
                  <div key={i} className="p-5 bg-white border rounded-lg border-slate-200">
                    <div className="w-[38px] h-[38px] rounded-full bg-primary text-white flex items-center justify-center mb-3.5">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h4 className="font-semibold text-slate-900 text-sm mb-1.5 leading-snug">{b.title}</h4>
                    <p className="text-xs leading-relaxed text-slate-600">{b.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* THỐNG KÊ — dải tối bo góc nổi trong section trắng, đúng wireframe === */}
      <section className="py-8 bg-white md:py-10">
        <div className="container px-4 mx-auto">
          <div className="bg-slate-900 rounded-[20px] px-6 py-10 md:px-10">
            <div className="grid grid-cols-2 gap-6 text-center md:grid-cols-4">
              {[
                { value: "10+", label: "Năm kinh nghiệm" },
                { value: "500+", label: "Khách hàng" },
                { value: "100%", label: "Bảo mật dữ liệu" },
                { value: "24/7", label: "Hỗ trợ tư vấn" },
              ].map((s, i) => (
                <div key={i}>
                  <div className="text-2xl md:text-[30px] font-bold text-white mb-0.5">{s.value}</div>
                  <div className="text-xs md:text-sm text-slate-400">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* KHÁCH HÀNG NÓI GÌ — card xám bo góc, đúng wireframe ================= */}
      <section className="py-3 bg-white md:py-4">
        <div className="container px-4 mx-auto">
          <div className="bg-slate-50 rounded-[24px] px-6 py-11 md:px-10 md:py-14">
            <SectionHeading label="Khách hàng nói gì" heading="Doanh nghiệp đã tin tưởng NTH" />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {testimonials.map((t, i) => (
                <div key={i} className="flex flex-col p-6 bg-white border rounded-lg border-slate-200">
                  <Quote className="w-6 h-6 text-blue-100 mb-3.5" />
                  <p className="text-[13.5px] text-slate-800 italic mb-4 flex-1 leading-relaxed">"{t.quote}"</p>
                  <div>
                    <div className="text-[13.5px] font-bold text-slate-900">{t.name}</div>
                    <div className="text-xs text-slate-500">{t.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ — section trắng full-width, đúng wireframe ===================== */}
      <section className="bg-white py-14 md:py-16">
        <div className="container max-w-3xl px-4 mx-auto">
          <SectionHeading label="Câu hỏi thường gặp" heading="Giải đáp thắc mắc trước khi bắt đầu" />
          <Accordion type="single" collapsible className="space-y-2">
            {faqs.map((f, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="bg-slate-50 rounded-lg border border-slate-100 px-4 !border-b"
              >
                <AccordionTrigger className="py-4 text-sm font-semibold text-left hover:no-underline md:text-base text-slate-900">
                  <span className="flex items-center gap-3 text-left">
                    <HelpCircle className="flex-shrink-0 w-4 h-4 text-slate-400" />
                    {f.q}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-4 text-sm leading-relaxed text-slate-600 pl-7">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA CUỐI — card gradient bo góc nổi trong section trắng, đúng wireframe */}
      <section className="py-3 bg-white md:py-4 pb-14 md:pb-16">
        <div className="container px-4 mx-auto">
          <div className="bg-gradient-to-br from-primary to-blue-800 rounded-[24px] px-6 py-12 md:px-10 md:py-14 text-white text-center max-w-3xl mx-auto">
            <h2 className="mb-3 text-2xl font-bold text-white md:text-3xl font-display">
              Sẵn sàng bàn giao kế toán cho NTH
            </h2>
            <p className="mb-2 text-base text-blue-100 md:text-lg">
              Để lại thông tin, NTH sẽ liên hệ tư vấn và gửi báo giá phù hợp với quy mô doanh nghiệp của bạn trong vòng 30 phút làm việc.
            </p>
            <CtaInlineForm serviceTitle={service.title} source={`service-detail-bottom-cta/${service.slug}`} />
          </div>
        </div>
      </section>

      <Footer />

      <FloatingContact />

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-3 bg-white border-t border-slate-200 md:hidden">
        <div className="flex gap-2">
          <Button asChild variant="outline" className="flex-1 font-semibold border-slate-300 h-11">
            <a href="tel:0344130989">
              <Phone className="w-4 h-4 mr-1" /> Gọi
            </a>
          </Button>
          <ContactDialog
            source="service-detail-mobile/ke-toan-tron-goi"
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
