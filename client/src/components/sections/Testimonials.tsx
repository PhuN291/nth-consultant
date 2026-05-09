import { Star, Quote } from "lucide-react";
import img1 from "@/assets/images/testimonial-1.jpg";
import img2 from "@/assets/images/testimonial-2.jpg";
import img3 from "@/assets/images/testimonial-3.jpg";

const testimonials = [
  {
    id: 1,
    name: "Trần Văn Hùng",
    role: "CEO, Công ty TechSolutions",
    content: "Dịch vụ của NTH Consulting giúp chúng tôi tiết kiệm được 40% chi phí vận hành bộ phận kế toán. Đội ngũ hỗ trợ cực kỳ nhiệt tình và chuyên nghiệp, luôn giải đáp thắc mắc ngay lập tức.",
    image: img1,
    rating: 5
  },
  {
    id: 2,
    name: "Nguyễn Thị Mai",
    role: "Founder, Chuỗi Café Mai",
    content: "Tôi rất yên tâm khi giao phó sổ sách thuế cho NTH Consulting. Từ ngày hợp tác, tôi không còn lo lắng về các kỳ quyết toán thuế nữa, mọi thứ đều minh bạch và rõ ràng.",
    image: img2,
    rating: 5
  },
  {
    id: 3,
    name: "Lê Quốc Bảo",
    role: "Giám đốc, Xây Dựng Bảo An",
    content: "Sự chuyên nghiệp và tận tâm là điều tôi đánh giá cao nhất. Các bạn không chỉ làm báo cáo mà còn tư vấn cho tôi cách tối ưu dòng tiền và chi phí rất hiệu quả.",
    image: img3,
    rating: 5
  }
];

export function Testimonials() {
  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-100/50 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-100/50 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-blue-600 font-bold tracking-wider text-sm uppercase mb-2 block">Khách hàng nói gì về chúng tôi</span>
          <h2 className="text-3xl md:text-4xl font-bold font-display text-slate-900 mb-4">
            Sự Hài Lòng Của Khách Hàng Là Niềm Tự Hào
          </h2>
          <p className="text-slate-600 text-lg">
            Hơn 500+ doanh nghiệp đã tin tưởng lựa chọn NTH Consulting làm đối tác kế toán chiến lược.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <div key={item.id} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 group flex flex-col">
              <div className="mb-6 flex items-center justify-between">
                <div className="flex gap-1">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-blue-100 group-hover:text-blue-200 transition-colors" />
              </div>

              <p className="text-slate-600 italic mb-8 leading-relaxed flex-grow">
                "{item.content}"
              </p>

              <div className="flex items-center gap-4 mt-auto">
                <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-slate-100 group-hover:ring-blue-200 transition-all">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">{item.name}</h4>
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
