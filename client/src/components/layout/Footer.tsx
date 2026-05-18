import { Link } from "wouter";
import { Facebook, Linkedin, Twitter } from "lucide-react";
import { AnchorLink } from "@/components/AnchorLink";
import logoHorizontal from "@/assets/images/logo-horizontal.png";

const SOCIAL_LINKS = {
  // Đổi sang URL thật khi user có trang social
  facebook: "#",
  linkedin: "#",
  twitter: "#",
};

const SERVICE_LINKS = [
  { name: "Kế toán trọn gói", slug: "ke-toan-tron-goi" },
  { name: "Lập BCTC cuối năm", slug: "lap-bctc-cuoi-nam" },
  { name: "Quyết toán thuế", slug: "quyet-toan-thue" },
  { name: "Thành lập doanh nghiệp", slug: "thanh-lap-doanh-nghiep" },
  { name: "Giải thể doanh nghiệp", slug: "giai-the-doanh-nghiep" },
];

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <Link
              href="/"
              className="inline-flex rounded-lg overflow-hidden bg-white mb-6"
            >
              <img src={logoHorizontal} alt="NTH Consulting" className="h-11 w-auto block" />
            </Link>
            <p className="text-slate-400 leading-relaxed mb-6">
              Đối tác tin cậy của doanh nghiệp trong lĩnh vực kế toán, thuế và tư vấn tài chính. Chúng tôi cam kết mang lại giá trị bền vững.
            </p>
            <div className="flex gap-4">
              <a
                href={SOCIAL_LINKS.facebook}
                target={SOCIAL_LINKS.facebook === "#" ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href={SOCIAL_LINKS.linkedin}
                target={SOCIAL_LINKS.linkedin === "#" ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href={SOCIAL_LINKS.twitter}
                target={SOCIAL_LINKS.twitter === "#" ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-6">Dịch vụ chính</h3>
            <ul className="space-y-3">
              {SERVICE_LINKS.map((s) => (
                <li key={s.slug}>
                  <Link href={`/dich-vu/${s.slug}`} className="hover:text-blue-400 transition-colors">
                    {s.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/dich-vu"
                  className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
                >
                  Xem tất cả dịch vụ →
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-6">Hỗ trợ</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/tin-tuc" className="hover:text-blue-400 transition-colors">
                  Tin tức & Kiến thức
                </Link>
              </li>
              <li>
                <Link href="/dieu-khoan-su-dung" className="hover:text-blue-400 transition-colors">
                  Điều khoản sử dụng
                </Link>
              </li>
              <li>
                <Link href="/chinh-sach-bao-mat" className="hover:text-blue-400 transition-colors">
                  Chính sách bảo mật
                </Link>
              </li>
              <li>
                <AnchorLink href="/#lien-he" className="hover:text-blue-400 transition-colors">
                  Liên hệ
                </AnchorLink>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-6">Liên hệ</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-blue-500 font-medium">A:</span>
                39C Ngõ 353 Bát Khối, Phường Long Biên, Hà Nội
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-500 font-medium">P:</span>
                <a href="tel:0344130989" className="hover:text-blue-400 transition-colors">
                  0344 130 989
                </a>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-500 font-medium">E:</span>
                <a href="mailto:nth.consulting.ltd@gmail.com" className="hover:text-blue-400 transition-colors break-all">
                  nth.consulting.ltd@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-500 font-medium">H:</span>
                8h30 sáng - 6h30 chiều
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
          <p>© {new Date().getFullYear()} NTH Consulting. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="/chinh-sach-bao-mat" className="hover:text-white transition-colors">
              Chính sách bảo mật
            </Link>
            <Link href="/dieu-khoan-su-dung" className="hover:text-white transition-colors">
              Điều khoản sử dụng
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
