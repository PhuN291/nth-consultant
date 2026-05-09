import { useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { ComparisonTable } from "@/components/sections/ComparisonTable";
import { ContactSection } from "@/components/sections/ContactSection";
import { Testimonials } from "@/components/sections/Testimonials";
// import { PartnerLogos } from "@/components/sections/PartnerLogos"; // TẠM ẨN
import { CheckCircle2 } from "lucide-react";

import aboutTeam from "@/assets/images/about-team.jpg";

export default function Home() {
  // Khi navigate từ trang khác sang Home với pending hash → scroll tới section
  useEffect(() => {
    const pending = sessionStorage.getItem("__pendingScrollHash");
    if (pending) {
      sessionStorage.removeItem("__pendingScrollHash");
      // Đợi DOM render xong rồi scroll
      setTimeout(() => {
        const el = document.getElementById(pending);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          try {
            history.replaceState(null, "", `#${pending}`);
          } catch {}
        }
      }, 100);
    } else if (window.location.hash) {
      // Khi load trực tiếp URL có hash
      const id = window.location.hash.slice(1);
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, []);

  return (
    <div className="min-h-screen font-sans bg-white selection:bg-blue-100 selection:text-blue-900">
      <Navbar />
      
      <main>
        <Hero />

        {/* <PartnerLogos /> — TẠM ẨN: bỏ qua section logo đối tác (data đang fake). Bỏ comment khi có logo thật. */}

        <ServicesGrid />
        
        {/* Why Choose Us Section - Added manually here as it's simple enough */}
        <section id="ve-chung-toi" className="py-24 bg-white overflow-hidden scroll-mt-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="relative">
                <div className="absolute -top-10 -left-10 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
                <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-cyan-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
                
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img src={aboutTeam} alt="Our Team" className="w-full h-auto object-cover" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/90 to-transparent p-8">
                    <p className="text-white text-lg font-medium">"Sự hài lòng của khách hàng là thước đo thành công duy nhất của chúng tôi."</p>
                  </div>
                </div>
              </div>
              
              <div>
                <span className="text-blue-600 font-bold tracking-wider text-sm uppercase mb-2 block">Về Chúng Tôi</span>
                <h2 className="text-3xl md:text-4xl font-bold font-display text-slate-900 mb-6">
                  Tại Sao Hơn 500+ Doanh Nghiệp Chọn NTH Consulting?
                </h2>
                <p className="text-slate-600 text-lg mb-8">
                  Chúng tôi không chỉ làm dịch vụ kế toán, chúng tôi là đối tác chiến lược giúp bạn tối ưu hóa tài chính và an tâm phát triển kinh doanh.
                </p>
                
                <div className="space-y-6">
                  {[
                    { title: "Chuyên môn sâu rộng", desc: "Đội ngũ chuyên gia thuế và kế toán trưởng trên 10 năm kinh nghiệm." },
                    { title: "Quy trình minh bạch", desc: "Báo cáo rõ ràng, cập nhật thường xuyên, không phát sinh chi phí ẩn." },
                    { title: "Công nghệ hiện đại", desc: "Ứng dụng phần mềm kế toán đám mây giúp bạn theo dõi số liệu 24/7." },
                    { title: "Cam kết trách nhiệm", desc: "Chịu trách nhiệm 100% về số liệu và hồ sơ đã thực hiện." }
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="mt-1">
                        <CheckCircle2 className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-lg">{item.title}</h4>
                        <p className="text-slate-600">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <Testimonials />

        <ComparisonTable />
        
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
