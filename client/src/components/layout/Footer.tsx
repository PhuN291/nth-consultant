import { Link } from "wouter";
import { Facebook, Linkedin, Twitter, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <Link href="/">
              <a className="text-2xl font-bold font-display text-white mb-6 inline-block flex items-center gap-2">
                 <span className="bg-blue-600 text-white w-8 h-8 flex items-center justify-center rounded text-sm">DL</span>
                 ĐĂNG LÂM
              </a>
            </Link>
            <p className="text-slate-400 leading-relaxed mb-6">
              Đối tác tin cậy của doanh nghiệp trong lĩnh vực kế toán, thuế và tư vấn tài chính. Chúng tôi cam kết mang lại giá trị bền vững.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Dịch vụ chính</h3>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Kế toán trọn gói</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Báo cáo tài chính</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Quyết toán thuế</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Thành lập doanh nghiệp</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Giải thể doanh nghiệp</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Hỗ trợ</h3>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Câu hỏi thường gặp</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Điều khoản sử dụng</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Chính sách bảo mật</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Tuyển dụng</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Liên hệ</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Liên hệ</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-blue-500 font-medium">A:</span>
                Tầng 12, Tòa nhà Bitexco, Q.1, TP.HCM
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-500 font-medium">P:</span>
                +84 90 123 4567
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-500 font-medium">E:</span>
                contact@danglam.vn
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-500 font-medium">H:</span>
                Thứ 2 - Thứ 6: 8:00 - 17:30
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
          <p>© 2024 Đăng Lâm Accounting. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
