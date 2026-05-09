import { useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Link } from "wouter";
import { Home } from "lucide-react";

interface LegalPageProps {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

function LegalPageLayout({ title, lastUpdated, children }: LegalPageProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <div className="bg-blue-900 sticky top-0 z-50">
        <Navbar />
      </div>

      {/* Breadcrumb */}
      <div className="bg-slate-50 border-b border-slate-200 pt-20">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center text-sm text-slate-500 overflow-x-auto whitespace-nowrap">
            <Link href="/" className="hover:text-blue-600 transition-colors flex-shrink-0">
              <Home className="w-4 h-4" />
            </Link>
            <span className="mx-2 text-slate-300">/</span>
            <span className="text-blue-600 font-medium truncate">{title}</span>
          </div>
        </div>
      </div>

      <main className="flex-1 container mx-auto px-4 py-8 md:py-12 max-w-3xl">
        <article className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 md:p-10">
            <h1 className="text-3xl md:text-4xl font-bold font-display text-slate-900 mb-2 leading-tight">
              {title}
            </h1>
            <p className="text-sm text-slate-500 mb-8">Cập nhật lần cuối: {lastUpdated}</p>

            <div className="prose prose-slate max-w-none prose-headings:font-display prose-headings:text-slate-900 prose-a:text-blue-600">
              {children}
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}

export function PrivacyPolicy() {
  return (
    <LegalPageLayout title="Chính sách bảo mật" lastUpdated="27/04/2026">
      <p>
        NTH Consulting cam kết bảo vệ thông tin cá nhân của khách hàng khi sử dụng website và dịch vụ
        của chúng tôi. Chính sách này giải thích thông tin nào được thu thập, sử dụng ra sao và
        quyền của bạn đối với dữ liệu của mình.
      </p>

      <h2>1. Thông tin chúng tôi thu thập</h2>
      <ul>
        <li>
          <strong>Thông tin liên hệ</strong> bạn cung cấp khi điền form yêu cầu tư vấn: họ tên,
          số điện thoại, email, chức danh, tên công ty, nội dung quan tâm.
        </li>
        <li>
          <strong>Thông tin kỹ thuật</strong> tự động thu thập khi truy cập website: địa chỉ IP,
          loại trình duyệt, thời gian truy cập (chỉ dùng cho mục đích phân tích, cải thiện trải
          nghiệm).
        </li>
      </ul>

      <h2>2. Mục đích sử dụng</h2>
      <ul>
        <li>Liên hệ phản hồi yêu cầu tư vấn của bạn.</li>
        <li>Cung cấp dịch vụ kế toán, thuế đã thoả thuận.</li>
        <li>Gửi thông tin cập nhật về quy định thuế, sản phẩm dịch vụ (nếu bạn đăng ký nhận tin).</li>
        <li>Tuân thủ nghĩa vụ pháp lý liên quan.</li>
      </ul>

      <h2>3. Chia sẻ thông tin</h2>
      <p>
        Chúng tôi <strong>không bán</strong>, không cho thuê hoặc chia sẻ thông tin cá nhân của
        bạn cho bên thứ ba với mục đích quảng cáo. Thông tin chỉ được chia sẻ trong các trường
        hợp:
      </p>
      <ul>
        <li>Có sự đồng ý rõ ràng của bạn.</li>
        <li>Khi cần thiết để cung cấp dịch vụ (ví dụ nộp hồ sơ thuế tới cơ quan nhà nước theo uỷ quyền).</li>
        <li>Theo yêu cầu của cơ quan có thẩm quyền theo quy định pháp luật.</li>
      </ul>

      <h2>4. Bảo mật dữ liệu</h2>
      <p>
        Chúng tôi áp dụng các biện pháp kỹ thuật và tổ chức hợp lý để bảo vệ dữ liệu khỏi truy
        cập trái phép, sửa đổi hoặc tiết lộ. Tuy nhiên, không có phương thức truyền tải qua
        Internet nào an toàn 100%, chúng tôi không thể đảm bảo bảo mật tuyệt đối.
      </p>

      <h2>5. Quyền của bạn</h2>
      <ul>
        <li>Yêu cầu xem, sửa hoặc xoá thông tin cá nhân chúng tôi đang lưu.</li>
        <li>Rút lại sự đồng ý nhận tin tại bất kỳ thời điểm nào.</li>
        <li>Khiếu nại nếu cho rằng quyền của bạn bị vi phạm.</li>
      </ul>

      <h2>6. Liên hệ</h2>
      <p>
        Mọi yêu cầu liên quan đến chính sách bảo mật, vui lòng liên hệ:
      </p>
      <ul>
        <li>Email: <a href="mailto:nth.consulting.ltd@gmail.com">nth.consulting.ltd@gmail.com</a></li>
        <li>Điện thoại: <a href="tel:0344130989">0344 130 989</a></li>
        <li>Địa chỉ: 39C Ngõ 353 Bát Khối, Phường Long Biên, Hà Nội</li>
      </ul>

      <p className="text-sm text-slate-500 italic">
        NTH Consulting có quyền cập nhật chính sách này theo thời gian. Mọi thay đổi sẽ được thông báo
        trên trang này kèm ngày cập nhật mới.
      </p>
    </LegalPageLayout>
  );
}

export function TermsOfService() {
  return (
    <LegalPageLayout title="Điều khoản sử dụng" lastUpdated="27/04/2026">
      <p>
        Bằng việc truy cập website NTH Consulting và sử dụng các dịch vụ của chúng tôi, bạn đồng ý
        tuân thủ các điều khoản dưới đây. Vui lòng đọc kỹ trước khi sử dụng.
      </p>

      <h2>1. Phạm vi áp dụng</h2>
      <p>
        Điều khoản này áp dụng cho mọi truy cập, sử dụng website của NTH Consulting cũng như các dịch
        vụ kế toán – thuế – tư vấn tài chính do chúng tôi cung cấp.
      </p>

      <h2>2. Quyền sở hữu trí tuệ</h2>
      <p>
        Toàn bộ nội dung trên website (văn bản, hình ảnh, logo, thiết kế giao diện, bài viết)
        thuộc sở hữu của NTH Consulting hoặc đối tác cấp phép. Bạn không được sao chép, phân phối hoặc
        sử dụng vào mục đích thương mại nếu không có sự đồng ý bằng văn bản.
      </p>

      <h2>3. Trách nhiệm khi sử dụng dịch vụ</h2>
      <ul>
        <li>Cung cấp thông tin trung thực, chính xác, đầy đủ khi yêu cầu dịch vụ.</li>
        <li>Cung cấp đầy đủ chứng từ, hồ sơ cần thiết theo yêu cầu của NTH Consulting.</li>
        <li>Thanh toán phí dịch vụ theo thoả thuận.</li>
        <li>Tuân thủ pháp luật trong các giao dịch liên quan đến dịch vụ.</li>
      </ul>

      <h2>4. Cam kết của NTH Consulting</h2>
      <ul>
        <li>Thực hiện dịch vụ với sự cẩn trọng và chuyên môn cao nhất.</li>
        <li>Bảo mật thông tin tài chính – kế toán của khách hàng.</li>
        <li>Tuân thủ quy định pháp luật hiện hành về kế toán, thuế.</li>
        <li>Thông báo kịp thời cho khách hàng các thay đổi quy định ảnh hưởng đến dịch vụ.</li>
      </ul>

      <h2>5. Giới hạn trách nhiệm</h2>
      <p>
        NTH Consulting chịu trách nhiệm về số liệu và hồ sơ trong phạm vi chứng từ và thông tin do
        khách hàng cung cấp. NTH Consulting không chịu trách nhiệm về:
      </p>
      <ul>
        <li>Thiệt hại phát sinh từ thông tin sai lệch do khách hàng cung cấp.</li>
        <li>Các vấn đề ngoài phạm vi dịch vụ đã thoả thuận.</li>
        <li>Các trường hợp bất khả kháng theo quy định pháp luật.</li>
      </ul>

      <h2>6. Chấm dứt dịch vụ</h2>
      <p>
        Mỗi bên có quyền chấm dứt hợp đồng dịch vụ bằng văn bản trước ít nhất 30 ngày, trừ trường
        hợp có thoả thuận khác. Khi chấm dứt, NTH Consulting sẽ bàn giao đầy đủ hồ sơ, chứng từ liên
        quan cho khách hàng.
      </p>

      <h2>7. Giải quyết tranh chấp</h2>
      <p>
        Mọi tranh chấp phát sinh sẽ được giải quyết trên cơ sở thương lượng. Nếu không đạt thoả
        thuận, vụ việc sẽ được giải quyết tại Toà án nhân dân có thẩm quyền tại TP. Hà Nội theo
        quy định của pháp luật Việt Nam.
      </p>

      <h2>8. Liên hệ</h2>
      <ul>
        <li>Email: <a href="mailto:nth.consulting.ltd@gmail.com">nth.consulting.ltd@gmail.com</a></li>
        <li>Điện thoại: <a href="tel:0344130989">0344 130 989</a></li>
        <li>Địa chỉ: 39C Ngõ 353 Bát Khối, Phường Long Biên, Hà Nội</li>
      </ul>

      <p className="text-sm text-slate-500 italic">
        NTH Consulting có quyền cập nhật điều khoản này theo thời gian. Việc tiếp tục sử dụng dịch vụ
        sau khi cập nhật được xem là bạn đồng ý với điều khoản mới.
      </p>
    </LegalPageLayout>
  );
}
