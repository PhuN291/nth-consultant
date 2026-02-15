import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { 
  Star, 
  CheckCircle2, 
  Phone, 
  MessageSquare, 
  ShieldCheck, 
  Clock, 
  FileCheck,
  ChevronRight,
  Share2,
  ThumbsUp,
  Home
} from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";

// Import images (mocking with same images for now, will be replaced by tool output)
import img1 from "@/assets/images/service-detail-1.jpg";
import img2 from "@/assets/images/service-detail-2.jpg";
import img3 from "@/assets/images/service-detail-3.jpg";

export default function ServiceDetail() {
  const [activeTab, setActiveTab] = useState("description");
  const [selectedImage, setSelectedImage] = useState(0);

  const service = {
    title: "Dịch vụ Kế toán Trọn gói cho Doanh nghiệp SME",
    price: "Từ 2.000.000đ",
    unit: "/ tháng",
    rating: 4.9,
    reviews: 128,
    status: "Đang nhận hồ sơ",
    sku: "KT-TG-01",
    images: [img1, img2, img3],
    highlights: [
      "Tiết kiệm 60% chi phí so với thuê nhân sự",
      "Chịu trách nhiệm 100% về số liệu báo cáo",
      "Tư vấn thuế tối ưu, đúng luật định",
      "Bảo mật thông tin doanh nghiệp tuyệt đối"
    ]
  };

  return (
    <div className="min-h-screen font-sans bg-slate-50 selection:bg-blue-100 selection:text-blue-900">
      <div className="bg-blue-900 sticky top-0 z-50">
        <Navbar />
      </div>

      {/* Breadcrumbs - Add margin-top to separate from fixed header if needed, but Navbar inside the blue container is sticky already */}
      <div className="bg-slate-50 border-b border-slate-200 pt-20">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center text-sm text-slate-500 overflow-x-auto whitespace-nowrap">
            <Link href="/" className="hover:text-blue-600 transition-colors"><Home className="w-4 h-4" /></Link>
            <span className="mx-2 text-slate-300">/</span>
            <Link href="/#services" className="hover:text-blue-600 transition-colors">Dịch vụ</Link>
            <span className="mx-2 text-slate-300">/</span>
            <span className="text-blue-600 font-medium truncate">Dịch vụ Kế toán Trọn gói</span>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Main Content (Images + Info) */}
          <div className="lg:col-span-9 space-y-8">
            {/* Product Overview Section */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 grid md:grid-cols-2 gap-8">
              {/* Image Gallery */}
              <div className="space-y-4">
                <div className="aspect-[4/3] rounded-xl overflow-hidden border border-slate-100 bg-slate-50 relative group">
                  <img 
                    src={service.images[selectedImage]} 
                    alt={service.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded shadow-sm">
                    Phổ biến nhất
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {service.images.map((img, idx) => (
                    <button 
                      key={idx} 
                      className={`aspect-square rounded-lg overflow-hidden border transition-all ${
                        selectedImage === idx 
                          ? "border-blue-600 ring-2 ring-blue-200" 
                          : "border-slate-100 hover:border-blue-400"
                      }`}
                      onClick={() => setSelectedImage(idx)}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Info Column */}
              <div>
                <div className="mb-4">
                  <h1 className="text-2xl md:text-3xl font-bold font-display text-slate-900 mb-2 leading-tight">
                    {service.title}
                  </h1>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                      <span className="text-slate-700 font-medium ml-2">{service.rating} ({service.reviews} đánh giá)</span>
                    </div>
                    <span className="text-slate-300">|</span>
                    <span className="text-slate-500">Mã: {service.sku}</span>
                  </div>
                </div>

                <div className="bg-blue-50/50 rounded-xl p-4 mb-6 border border-blue-100">
                  <p className="text-sm text-slate-500 mb-1">Giá tham khảo</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-blue-600">{service.price}</span>
                    <span className="text-slate-500 font-medium">{service.unit}</span>
                  </div>
                  <p className="text-xs text-blue-600 mt-2 font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Đã bao gồm phí tư vấn ban đầu
                  </p>
                </div>

                <div className="mb-8">
                  <h3 className="font-bold text-slate-900 mb-3">Lợi ích nổi bật:</h3>
                  <ul className="space-y-3">
                    {service.highlights.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-slate-600 text-sm">
                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button size="lg" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold h-12 shadow-lg shadow-blue-600/20">
                    Đăng Ký Tư Vấn
                  </Button>
                  <Button size="lg" variant="outline" className="flex-1 border-blue-200 text-blue-700 hover:bg-blue-50 h-12 font-semibold">
                    <Phone className="w-4 h-4 mr-2" /> 090 123 4567
                  </Button>
                </div>
              </div>
            </div>

            {/* Detailed Content Tabs */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="flex border-b border-slate-100 overflow-x-auto scrollbar-hide">
                <button 
                  className={`px-6 py-4 font-semibold text-sm whitespace-nowrap transition-colors border-b-2 ${activeTab === 'description' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-blue-600'}`}
                  onClick={() => setActiveTab('description')}
                >
                  Chi tiết dịch vụ
                </button>
                <button 
                  className={`px-6 py-4 font-semibold text-sm whitespace-nowrap transition-colors border-b-2 ${activeTab === 'process' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-blue-600'}`}
                  onClick={() => setActiveTab('process')}
                >
                  Quy trình làm việc
                </button>
                <button 
                  className={`px-6 py-4 font-semibold text-sm whitespace-nowrap transition-colors border-b-2 ${activeTab === 'faq' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-blue-600'}`}
                  onClick={() => setActiveTab('faq')}
                >
                  Câu hỏi thường gặp
                </button>
              </div>

              <div className="p-6 md:p-8">
                {activeTab === 'description' && (
                  <div className="prose prose-slate max-w-none prose-headings:font-display prose-headings:font-bold prose-headings:text-slate-900 prose-p:text-slate-600 prose-li:text-slate-600">
                    <h3>Tại sao nên chọn dịch vụ kế toán trọn gói?</h3>
                    <p>
                      Đối với các doanh nghiệp vừa và nhỏ (SME), việc duy trì một bộ máy kế toán cồng kềnh thường gây tốn kém chi phí và khó kiểm soát chất lượng. 
                      Dịch vụ kế toán trọn gói của Đăng Lâm mang đến giải pháp tối ưu, giúp chủ doanh nghiệp an tâm tập trung vào hoạt động kinh doanh cốt lõi.
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-6 my-8 not-prose">
                      <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                        <ShieldCheck className="w-8 h-8 text-blue-600 mb-4" />
                        <h4 className="font-bold text-slate-900 mb-2">An toàn pháp lý</h4>
                        <p className="text-sm text-slate-600">Đảm bảo tuân thủ tuyệt đối các quy định mới nhất về thuế và kế toán.</p>
                      </div>
                      <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                        <Clock className="w-8 h-8 text-blue-600 mb-4" />
                        <h4 className="font-bold text-slate-900 mb-2">Đúng hạn 100%</h4>
                        <p className="text-sm text-slate-600">Cam kết nộp báo cáo đúng hạn, chịu trách nhiệm nộp phạt nếu chậm trễ.</p>
                      </div>
                    </div>

                    <h3>Nội dung công việc hàng tháng</h3>
                    <ul>
                      <li>Tiếp nhận, phân loại và kiểm tra tính hợp lệ của chứng từ gốc.</li>
                      <li>Hạch toán các nghiệp vụ kinh tế phát sinh vào phần mềm kế toán.</li>
                      <li>Lập và nộp các loại báo cáo thuế theo quy định (GTGT, TNCN, TNDN).</li>
                      <li>In ấn và lưu trữ sổ sách kế toán theo quy định của Luật Kế toán.</li>
                      <li>Tư vấn cân đối chi phí, tối ưu số thuế phải nộp hợp pháp.</li>
                    </ul>
                  </div>
                )}
                
                {activeTab === 'process' && (
                   <div className="space-y-8">
                      <div className="relative">
                        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-100"></div>
                        {[
                          { title: "Tiếp nhận thông tin", desc: "Thu thập chứng từ, hóa đơn và thông tin doanh nghiệp định kỳ." },
                          { title: "Xử lý số liệu", desc: "Chuyên viên kế toán kiểm tra, hạch toán và cân đối số liệu trên phần mềm." },
                          { title: "Gửi báo cáo sơ bộ", desc: "Gửi kết quả tính toán và tư vấn các vấn đề tồn đọng cho chủ doanh nghiệp." },
                          { title: "Nộp báo cáo thuế", desc: "Hoàn thiện và nộp báo cáo lên cơ quan thuế sau khi được phê duyệt." },
                          { title: "Lưu trữ hồ sơ", desc: "In ấn sổ sách, sắp xếp chứng từ và bàn giao hoặc lưu trữ an toàn." }
                        ].map((step, i) => (
                          <div key={i} className="relative flex gap-6 mb-8 last:mb-0">
                            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center shrink-0 border-4 border-white shadow-sm z-10">
                              {i + 1}
                            </div>
                            <div>
                              <h4 className="font-bold text-slate-900 text-lg mb-1">{step.title}</h4>
                              <p className="text-slate-600 leading-relaxed">{step.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                   </div>
                )}

                {activeTab === 'faq' && (
                  <div className="space-y-4">
                    {[
                      { q: "Tôi có cần thuê thêm kế toán nội bộ không?", a: "Tùy thuộc vào quy mô. Với doanh nghiệp nhỏ, dịch vụ trọn gói của chúng tôi đã bao gồm hầu hết nghiệp vụ. Bạn có thể chỉ cần 1 nhân sự phụ trách thu/chi đơn giản." },
                      { q: "Chi phí có phát sinh thêm không?", a: "Giá dịch vụ được ký kết trong hợp đồng là trọn gói cho khối lượng công việc đã thỏa thuận. Nếu khối lượng chứng từ tăng đột biến, chúng tôi sẽ thông báo trước để điều chỉnh phù hợp." },
                      { q: "Trách nhiệm pháp lý thuộc về ai?", a: "Đăng Lâm chịu trách nhiệm hoàn toàn về tính chính xác của số liệu kế toán dựa trên chứng từ khách hàng cung cấp." }
                    ].map((faq, i) => (
                      <div key={i} className="border border-slate-100 rounded-xl p-5 hover:border-blue-200 transition-colors bg-slate-50/50">
                        <h4 className="font-bold text-slate-900 mb-2 flex gap-3">
                          <span className="text-blue-600">Q:</span> {faq.q}
                        </h4>
                        <p className="text-slate-600 pl-6">{faq.a}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-3 space-y-6">
            {/* Trusted By Box */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <ShieldCheck className="text-green-500 w-5 h-5" />
                Đảm bảo uy tín
              </h4>
              <ul className="space-y-4">
                <li className="flex gap-3 text-sm text-slate-600">
                  <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                    10+
                  </div>
                  <span>Năm kinh nghiệm trong ngành</span>
                </li>
                 <li className="flex gap-3 text-sm text-slate-600">
                  <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                    500
                  </div>
                  <span>Khách hàng hài lòng</span>
                </li>
                 <li className="flex gap-3 text-sm text-slate-600">
                  <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                    100%
                  </div>
                  <span>Cam kết bảo mật dữ liệu</span>
                </li>
              </ul>
            </div>

            {/* Support Box */}
            <div className="bg-gradient-to-br from-blue-900 to-slate-900 rounded-2xl p-6 text-white shadow-lg">
              <h4 className="font-bold text-lg mb-2">Cần tư vấn gấp?</h4>
              <p className="text-blue-200 text-sm mb-4">Để lại SĐT, chúng tôi sẽ gọi lại miễn phí trong 5 phút.</p>
              
              <div className="space-y-3">
                <input 
                  type="text" 
                  placeholder="Số điện thoại của bạn"
                  className="w-full h-10 px-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-blue-200/50 text-sm focus:outline-none focus:border-white"
                />
                <Button className="w-full bg-white text-blue-900 hover:bg-blue-50 font-bold">
                  Yêu cầu gọi lại
                </Button>
              </div>
            </div>

            {/* Related Services */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <h4 className="font-bold text-slate-900 mb-4">Dịch vụ liên quan</h4>
              <div className="space-y-4">
                {[
                  { title: "Quyết toán thuế TNCN", price: "Từ 500k" },
                  { title: "Thành lập doanh nghiệp", price: "Từ 1.500k" },
                  { title: "Chữ ký số & HĐĐT", price: "Liên hệ" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 group cursor-pointer">
                    <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                      <FileCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{item.title}</h5>
                      <p className="text-xs text-slate-500">{item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 md:hidden z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <div className="flex gap-3">
          <Button variant="outline" className="flex-1 border-blue-600 text-blue-600 font-bold">
            <Phone className="w-4 h-4 mr-2" /> Tư vấn
          </Button>
          <Button className="flex-[2] bg-blue-600 text-white font-bold shadow-lg shadow-blue-600/20">
            Đăng ký ngay
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
