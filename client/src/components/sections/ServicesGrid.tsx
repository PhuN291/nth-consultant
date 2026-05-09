import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import {
  Calculator,
  FileText,
  PieChart,
  ShieldCheck,
  Scale,
  FileSearch,
  ArrowRight,
  Briefcase,
  Building2,
  IdCard,
} from "lucide-react";
import { Link } from "wouter";

interface ServiceCard {
  title: string;
  slug: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  features: string[];
}

interface ServiceCategory {
  label: string;
  intro?: string;
  services: ServiceCard[];
}

const categories: ServiceCategory[] = [
  {
    label: "Dịch vụ kế toán và thuế",
    intro: "Vận hành kế toán – thuế chuẩn chỉnh, đúng hạn, sẵn sàng cho mọi kỳ báo cáo và thanh tra.",
    services: [
      {
        title: "Dịch vụ kế toán trọn gói",
        slug: "ke-toan-tron-goi",
        description: "Vận hành toàn bộ hệ thống kế toán cho doanh nghiệp, tiết kiệm chi phí và rủi ro về thuế.",
        icon: Calculator,
        features: ["Hạch toán chứng từ", "Báo cáo thuế GTGT, TNCN, TNDN", "Sổ sách kế toán đầy đủ", "Tư vấn thuế thường xuyên"],
      },
      {
        title: "Dịch vụ rà soát sổ sách kế toán",
        slug: "ra-soat-so-sach",
        description: "Phát hiện sai sót, giảm rủi ro thuế và chuẩn bị sẵn sàng trước thanh kiểm tra.",
        icon: FileSearch,
        features: ["Kiểm tra chứng từ – bút toán", "Phát hiện sai sót sớm", "Đề xuất điều chỉnh tối ưu", "Báo cáo kết quả rõ ràng"],
      },
      {
        title: "Dịch vụ lập BCTC cuối năm",
        slug: "lap-bctc-cuoi-nam",
        description: "Chuẩn số liệu, đúng quy định, sẵn sàng cho quyết toán thuế cuối năm.",
        icon: PieChart,
        features: ["Rà soát sổ sách", "Điều chỉnh bút toán", "Lập BCTC chuẩn chỉnh", "Tờ khai quyết toán"],
      },
      {
        title: "Dịch vụ báo cáo thuế",
        slug: "ke-khai-thue",
        description: "Báo cáo thuế nhanh, chuẩn, đúng luật giúp bạn yên tâm mỗi kỳ kê khai.",
        icon: FileText,
        features: ["Thuế GTGT hàng tháng/quý", "Thuế TNCN", "Thuế TNDN tạm tính", "Tối ưu chi phí hợp lệ"],
      },
      {
        title: "Dịch vụ hỗ trợ thanh tra/quyết toán thuế",
        slug: "quyet-toan-thue",
        description: "Đồng hành A–Z khi có thanh tra/quyết toán thuế, giảm rủi ro bị truy thu.",
        icon: ShieldCheck,
        features: ["Chuẩn bị hồ sơ", "Giải trình số liệu", "Đại diện làm việc với cơ quan thuế", "Tư vấn xử lý rủi ro"],
      },
    ],
  },
  {
    label: "Dịch vụ pháp lý doanh nghiệp",
    intro: "Hỗ trợ doanh nghiệp khởi đầu vững chắc và kết thúc đúng quy định pháp luật.",
    services: [
      {
        title: "Dịch vụ thành lập doanh nghiệp",
        slug: "thanh-lap-doanh-nghiep",
        description: "Thành lập công ty trọn gói từ A–Z, sẵn sàng vận hành ngay sau khi nhận giấy phép.",
        icon: Building2,
        features: ["Tư vấn loại hình DN", "Soạn hồ sơ đăng ký", "Thủ tục thuế ban đầu", "Hỗ trợ sau thành lập"],
      },
      {
        title: "Dịch vụ giải thể doanh nghiệp",
        slug: "giai-the-doanh-nghiep",
        description: "Hoàn tất thủ tục pháp lý – kế toán – thuế nhanh gọn, đúng quy định, không phát sinh rủi ro.",
        icon: Scale,
        features: ["Tư vấn hồ sơ giải thể", "Quyết toán thuế giải thể", "Đóng mã số thuế", "Bàn giao giấy chứng nhận"],
      },
    ],
  },
  {
    label: "Giấy phép lao động và thẻ tạm trú",
    intro: "Hỗ trợ người nước ngoài làm việc hợp pháp tại Việt Nam – nhanh chóng, đúng quy định.",
    services: [
      {
        title: "Dịch vụ xin cấp/xin miễn/gia hạn giấy phép lao động cho người nước ngoài",
        slug: "giay-phep-lao-dong",
        description: "Tư vấn điều kiện, chuẩn bị hồ sơ và làm việc với cơ quan chức năng để cấp Work Permit hợp pháp.",
        icon: Briefcase,
        features: ["Tư vấn điều kiện pháp lý", "Chuẩn bị hồ sơ đầy đủ", "Theo dõi tiến trình cấp phép", "Hỗ trợ gia hạn / xin miễn"],
      },
      {
        title: "Dịch vụ xin cấp/xin miễn/gia hạn thẻ tạm trú cho người nước ngoài",
        slug: "giay-phep-lao-dong",
        description: "Tư vấn các loại thẻ tạm trú phù hợp, chuẩn bị hồ sơ và nộp tại cơ quan xuất nhập cảnh.",
        icon: IdCard,
        features: ["Tư vấn loại TRC phù hợp", "Hồ sơ đầy đủ – đúng quy định", "Hướng dẫn và nộp hồ sơ", "Theo dõi và nhận TRC"],
      },
    ],
  },
];

export function ServicesGrid() {
  return (
    <section id="dich-vu" className="py-16 md:py-24 bg-slate-50 scroll-mt-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-display text-slate-900 mb-4">
            Giải Pháp Toàn Diện Cho Doanh Nghiệp
          </h2>
          <p className="text-slate-600 text-lg">
            Đồng hành cùng doanh nghiệp trong các nghiệp vụ kế toán – thuế, pháp lý và lao động nước ngoài.
          </p>
        </div>

        <div className="space-y-12 md:space-y-16">
          {categories.map((category) => (
            <div key={category.label}>
              <div className="mb-6 md:mb-8">
                <h3 className="text-2xl md:text-3xl font-bold font-display text-slate-900">
                  {category.label}
                </h3>
                {category.intro && (
                  <p className="text-slate-600 mt-2 max-w-3xl">{category.intro}</p>
                )}
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {category.services.map((service, index) => (
                  <Card
                    key={`${category.label}-${index}`}
                    className="border-none shadow-sm hover:shadow-xl transition-all duration-300 group bg-white overflow-hidden flex flex-col"
                  >
                    <CardHeader>
                      <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors duration-300">
                        <service.icon className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors duration-300" />
                      </div>
                      <CardTitle className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors leading-snug">
                        {service.title}
                      </CardTitle>
                      <CardDescription className="text-sm md:text-base mt-2">
                        {service.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <ul className="space-y-2">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start text-sm text-slate-600">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mr-2 mt-1.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <Link
                        href={`/dich-vu/${service.slug}`}
                        className={buttonVariants({
                          variant: "ghost",
                          className:
                            "p-0 text-blue-600 hover:text-blue-800 hover:bg-transparent font-medium group/btn",
                        })}
                      >
                        Xem chi tiết
                        <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
