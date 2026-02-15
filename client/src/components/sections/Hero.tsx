import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import heroBg from "@/assets/images/hero-bg.jpg";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-28 pb-16 md:pt-20 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt="Modern Corporate Office"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/95 via-blue-900/80 to-blue-800/40" />
      </div>

      <div className="container mx-auto px-4 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        <div className="max-w-2xl text-white">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-800/50 border border-blue-400/30 text-blue-100 text-sm font-medium mb-6 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Đối tác tin cậy của 500+ doanh nghiệp
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display leading-[1.15] mb-6">
            Đồng Hành Cùng Doanh Nghiệp <span className="text-blue-200">Phát Triển Bền Vững</span>
          </h1>
          
          <p className="text-lg text-blue-100 mb-8 leading-relaxed max-w-xl">
            Chúng tôi cung cấp giải pháp kế toán trọn gói, giúp doanh nghiệp tiết kiệm thời gian, 
            tối ưu chi phí và hạn chế tối đa rủi ro về thuế.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50 font-semibold h-12 px-8">
              Nhận tư vấn miễn phí
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 hover:border-white h-12 px-8">
              Xem dịch vụ <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="mt-12 flex flex-col sm:flex-row gap-8 text-sm font-medium text-blue-200">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="text-blue-400" /> Tiết kiệm chi phí nhân sự
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="text-blue-400" /> Chính xác tuyệt đối
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="text-blue-400" /> Hỗ trợ 24/7
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
