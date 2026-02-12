import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export function ContactSection() {
  return (
    <section id="contact" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-blue-600 font-bold tracking-wider text-sm uppercase mb-2 block">Liên hệ với chúng tôi</span>
            <h2 className="text-4xl font-bold font-display text-slate-900 mb-6">
              Nhận tư vấn miễn phí ngay hôm nay
            </h2>
            <p className="text-slate-600 text-lg mb-8 leading-relaxed">
              Để lại thông tin, chuyên gia của chúng tôi sẽ liên hệ lại trong vòng 15 phút để tư vấn giải pháp phù hợp nhất cho doanh nghiệp của bạn.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Hotline tư vấn</h3>
                  <p className="text-slate-600">+84 90 123 4567</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Email hỗ trợ</h3>
                  <p className="text-slate-600">contact@danglam.vn</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Văn phòng</h3>
                  <p className="text-slate-600">Tầng 12, Tòa nhà Bitexco, Q.1, TP.HCM</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 shadow-lg">
            <form className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Họ và tên</label>
                  <input type="text" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" placeholder="Nguyễn Văn A" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Số điện thoại</label>
                  <input type="tel" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" placeholder="090 123 4567" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Email doanh nghiệp</label>
                <input type="email" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" placeholder="name@company.com" />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Dịch vụ quan tâm</label>
                <select className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all bg-white">
                  <option>Kế toán trọn gói</option>
                  <option>Lập báo cáo tài chính</option>
                  <option>Quyết toán thuế</option>
                  <option>Thành lập/Giải thể DN</option>
                  <option>Khác</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Nội dung cần tư vấn</label>
                <textarea className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all min-h-[120px]" placeholder="Mô tả nhu cầu của bạn..."></textarea>
              </div>
              
              <Button size="lg" className="w-full h-12 text-base font-semibold bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/20">
                Gửi yêu cầu tư vấn
              </Button>
              <p className="text-xs text-center text-slate-500 mt-4">
                Chúng tôi cam kết bảo mật thông tin của bạn 100%.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
