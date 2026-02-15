import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ComparisonTable() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-display text-slate-900 mb-4">
            Lựa Chọn Gói Dịch Vụ Phù Hợp
          </h2>
          <p className="text-slate-600 text-lg">
            So sánh chi tiết giữa dịch vụ kế toán trọn gói và dịch vụ lập báo cáo tài chính riêng lẻ
          </p>
        </div>

        <div className="relative">
          {/* Scroll hint for mobile */}
          <div className="md:hidden absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
          
          <div className="overflow-x-auto pb-4">
            <div className="min-w-[800px] bg-white rounded-2xl border border-slate-100 shadow-xl shadow-slate-100/50">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="py-6 px-8 text-left text-slate-500 font-medium w-1/3">Nội dung công việc</th>
                  <th className="py-6 px-8 text-center w-1/3 bg-blue-50/50">
                    <div className="text-blue-900 font-bold text-xl">Dịch vụ trọn gói</div>
                    <div className="text-blue-600 text-sm font-medium mt-1">Khuyên dùng</div>
                  </th>
                  <th className="py-6 px-8 text-center w-1/3 text-slate-900 font-bold text-xl">
                    Lập BCTC riêng
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  { label: "Hạch toán chứng từ hàng tháng", pkg: true, single: false },
                  { label: "Báo cáo thuế GTGT – TNCN – TNDN định kỳ", pkg: true, single: false },
                  { label: "Lập sổ sách kế toán", pkg: true, single: true, note: "nếu yêu cầu" },
                  { label: "Soát xét chi phí hợp lý, hợp lệ", pkg: true, single: true },
                  { label: "Điều chỉnh bút toán cuối năm", pkg: true, single: true },
                  { label: "Lập Báo cáo tài chính cuối năm", pkg: true, single: true },
                  { label: "Lập tờ khai quyết toán thuế", pkg: true, single: true },
                  { label: "Hỗ trợ làm việc với cơ quan thuế", pkg: true, single: false, note: "tùy chọn" },
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-8 text-slate-700 font-medium">{row.label}</td>
                    <td className="py-4 px-8 text-center bg-blue-50/30">
                      {row.pkg ? (
                        <Check className="w-6 h-6 text-green-500 mx-auto" />
                      ) : (
                        <X className="w-6 h-6 text-slate-300 mx-auto" />
                      )}
                    </td>
                    <td className="py-4 px-8 text-center">
                      {row.single ? (
                        <div className="flex flex-col items-center">
                          <Check className="w-6 h-6 text-green-500" />
                          {row.note && <span className="text-xs text-slate-400 mt-1">({row.note})</span>}
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                          <X className="w-6 h-6 text-slate-300" />
                          {row.note && <span className="text-xs text-slate-400 mt-1">({row.note})</span>}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
                
                <tr className="bg-slate-50">
                  <td className="py-6 px-8 font-bold text-slate-900">Chi phí</td>
                  <td className="py-6 px-8 text-center bg-blue-100/30 font-bold text-blue-700">Theo tháng</td>
                  <td className="py-6 px-8 text-center font-bold text-slate-700">Theo gói cuối năm</td>
                </tr>
                
                <tr>
                  <td className="py-6 px-8 font-bold text-slate-900 border-none">Phù hợp với</td>
                  <td className="py-6 px-8 text-center bg-blue-50/30 border-none px-12">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">Đăng ký ngay</Button>
                    <p className="text-xs text-slate-500 mt-3">DN chưa có kế toán</p>
                  </td>
                  <td className="py-6 px-8 text-center border-none px-12">
                    <Button variant="outline" className="w-full">Liên hệ báo giá</Button>
                    <p className="text-xs text-slate-500 mt-3">DN đã có kế toán nội bộ</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
