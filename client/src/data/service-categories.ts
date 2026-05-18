import {
  Calculator,
  FileText,
  PieChart,
  ShieldCheck,
  Scale,
  FileSearch,
  Briefcase,
  Building2,
  IdCard,
  Wallet,
  FileEdit,
  PauseCircle,
  Network,
} from "lucide-react";
import type { ComponentType } from "react";

export interface ServiceCard {
  title: string;
  slug?: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
  features: string[];
  comingSoon?: boolean;
}

export interface ServiceCategory {
  label: string;
  intro?: string;
  services: ServiceCard[];
}

export const categories: ServiceCategory[] = [
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
      {
        title: "Dịch vụ hoàn thuế (TNCN/GTGT)",
        description: "Hỗ trợ doanh nghiệp và cá nhân hoàn thuế nhanh chóng, đúng quy định, tối ưu số thuế được hoàn.",
        icon: Wallet,
        features: ["Rà soát hồ sơ hoàn thuế", "Lập tờ khai và đề nghị hoàn", "Làm việc với cơ quan thuế", "Theo dõi đến khi nhận tiền"],
        comingSoon: true,
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
        title: "Dịch vụ thay đổi thông tin đăng ký doanh nghiệp",
        description: "Cập nhật thông tin đăng ký kinh doanh nhanh chóng, đúng quy định pháp luật.",
        icon: FileEdit,
        features: ["Đổi tên, địa chỉ, ngành nghề", "Thay đổi vốn điều lệ", "Thay đổi người đại diện", "Cập nhật thông tin thuế"],
        comingSoon: true,
      },
      {
        title: "Dịch vụ tạm ngừng kinh doanh",
        description: "Hỗ trợ thủ tục tạm ngừng hoạt động đúng quy định, tránh phát sinh nghĩa vụ thuế không cần thiết.",
        icon: PauseCircle,
        features: ["Tư vấn điều kiện tạm ngừng", "Soạn và nộp hồ sơ", "Thông báo cơ quan thuế", "Hỗ trợ khôi phục hoạt động"],
        comingSoon: true,
      },
      {
        title: "Dịch vụ thành lập chi nhánh/Văn phòng đại diện",
        description: "Mở rộng quy mô doanh nghiệp với chi nhánh, văn phòng đại diện được đăng ký đúng quy định.",
        icon: Network,
        features: ["Tư vấn lựa chọn mô hình", "Chuẩn bị hồ sơ đăng ký", "Đăng ký mã số thuế", "Hỗ trợ vận hành ban đầu"],
        comingSoon: true,
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
