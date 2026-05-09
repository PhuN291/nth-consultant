import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, CheckCircle2 } from "lucide-react";

const SERVICES = [
  "Kế toán trọn gói",
  "Rà soát sổ sách kế toán",
  "Lập BCTC cuối năm",
  "Báo cáo thuế",
  "Hỗ trợ thanh tra/quyết toán thuế",
  "Thành lập doanh nghiệp",
  "Giải thể doanh nghiệp",
  "Giấy phép lao động & Thẻ tạm trú",
  "Khác",
];

export function ContactSection() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState(SERVICES[0]);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim() || null,
          service,
          message: message.trim() || null,
          source: "contact-section-home",
        }),
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || "Gửi thất bại");
      }
      setSuccess(true);
      setName("");
      setPhone("");
      setEmail("");
      setMessage("");
    } catch (err: any) {
      setError(err?.message?.replace(/^\d+:\s*/, "") || "Có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="lien-he" className="py-24 bg-white scroll-mt-20">
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
              <a href="tel:0344130989" className="flex items-start gap-4 hover:opacity-80 transition-opacity">
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Hotline tư vấn</h3>
                  <p className="text-slate-600">0344 130 989</p>
                </div>
              </a>

              <a href="mailto:nth.consulting.ltd@gmail.com" className="flex items-start gap-4 hover:opacity-80 transition-opacity">
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Email hỗ trợ</h3>
                  <p className="text-slate-600">nth.consulting.ltd@gmail.com</p>
                </div>
              </a>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Văn phòng</h3>
                  <p className="text-slate-600">39C Ngõ 353 Bát Khối, Phường Long Biên, Hà Nội</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 shadow-lg">
            {success ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold font-display text-slate-900 mb-2">Đã gửi thành công!</h3>
                <p className="text-slate-600 mb-6">
                  Cảm ơn bạn. Chuyên viên NTH Consulting sẽ liên hệ lại trong vòng <strong>15 phút</strong> trong giờ làm việc.
                </p>
                <Button onClick={() => setSuccess(false)} variant="outline">
                  Gửi yêu cầu khác
                </Button>
              </div>
            ) : (
              <form className="space-y-4" onSubmit={onSubmit}>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Họ và tên <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      maxLength={200}
                      disabled={submitting}
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                      placeholder="Nhập tên của bạn..."
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Số điện thoại <span className="text-red-500">*</span></label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      maxLength={20}
                      disabled={submitting}
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                      placeholder="Nhập số điện thoại/Zalo của bạn..."
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Email doanh nghiệp</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={submitting}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                    placeholder="email@congty.com"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Dịch vụ quan tâm</label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    disabled={submitting}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all bg-white"
                  >
                    {SERVICES.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Nội dung cần tư vấn</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    maxLength={2000}
                    disabled={submitting}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all min-h-[120px]"
                    placeholder="Mô tả nhu cầu của bạn..."
                  ></textarea>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-3 py-2">
                    {error}
                  </div>
                )}

                <Button
                  type="submit"
                  size="lg"
                  disabled={submitting}
                  className="w-full h-12 text-base font-semibold bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/20"
                >
                  {submitting ? "Đang gửi..." : "Gửi yêu cầu tư vấn"}
                </Button>
                <p className="text-xs text-center text-slate-500 mt-4">
                  Chúng tôi cam kết bảo mật thông tin của bạn 100%.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
