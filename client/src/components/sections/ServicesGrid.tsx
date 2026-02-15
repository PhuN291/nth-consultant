import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { Calculator, FileText, PieChart, ShieldCheck, Scale, FileSearch, ArrowRight } from "lucide-react";
import { Link } from "wouter";

const services = [
  {
    title: "Kế toán trọn gói",
    description: "Giúp doanh nghiệp tiết kiệm thời gian, tối ưu chi phí và hạn chế tối đa rủi ro về thuế.",
    icon: Calculator,
    features: ["Hạch toán chứng từ", "Báo cáo thuế GTGT, TNCN, TNDN", "Sổ sách kế toán", "Tư vấn thuế thường xuyên"]
  },
  {
    title: "Lập BCTC Cuối Năm",
    description: "Kiểm tra, chuẩn hóa và lập Báo cáo tài chính một cách nhanh chóng và chính xác.",
    icon: PieChart,
    features: ["Rà soát sổ sách", "Điều chỉnh bút toán", "Lập BCTC chuẩn chỉnh", "Thuyết minh BCTC"]
  },
  {
    title: "Kê khai thuế",
    description: "Dịch vụ kê khai thuế nhanh, chuẩn, đúng luật giúp bạn yên tâm mỗi kỳ báo cáo.",
    icon: FileText,
    features: ["Kê khai thuế GTGT", "Kê khai thuế TNCN", "Thuế TNDN tạm tính", "Tối ưu chi phí hợp lệ"]
  },
  {
    title: "Quyết toán thuế",
    description: "Đồng hành cùng bạn từ A đến Z khi có thanh tra thuế, giúp mọi thứ minh bạch.",
    icon: ShieldCheck,
    features: ["Chuẩn bị hồ sơ", "Giải trình số liệu", "Tư vấn xử lý rủi ro", "Làm việc với cơ quan thuế"]
  },
  {
    title: "Rà soát sổ sách",
    description: "Kiểm tra, chỉnh sửa và tối ưu hóa toàn bộ sổ sách để hoạt động minh bạch.",
    icon: FileSearch,
    features: ["Kiểm tra chứng từ", "Phát hiện sai sót", "Điều chỉnh bút toán", "Báo cáo kết quả"]
  },
  {
    title: "Giải thể doanh nghiệp",
    description: "Thực hiện thủ tục pháp lý, kế toán, thuế nhanh gọn và đúng quy định.",
    icon: Scale,
    features: ["Tư vấn hồ sơ", "Quyết toán thuế giải thể", "Thủ tục pháp lý", "Trả con dấu"]
  }
];

export function ServicesGrid() {
  return (
    <section id="services" className="py-16 md:py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-display text-slate-900 mb-4">
            Giải Pháp Kế Toán Toàn Diện
          </h2>
          <p className="text-slate-600 text-lg">
            Chúng tôi cung cấp đầy đủ các dịch vụ kế toán chuyên nghiệp, giúp doanh nghiệp của bạn vận hành trơn tru và tuân thủ pháp luật.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="border-none shadow-sm hover:shadow-xl transition-all duration-300 group bg-white overflow-hidden">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors duration-300">
                  <service.icon className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <CardTitle className="text-xl font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                  {service.title}
                </CardTitle>
                <CardDescription className="text-base mt-2">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-slate-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="pt-0">
                <Link href="/services/detail" className={buttonVariants({ variant: "ghost", className: "p-0 text-blue-600 hover:text-blue-800 hover:bg-transparent font-medium group/btn" })}>
                    Xem chi tiết <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
