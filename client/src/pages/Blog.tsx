import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Calendar, ChevronRight, ArrowRight } from "lucide-react";
import { Link } from "wouter";

// Import images
import blog1 from "@/assets/images/blog-1.jpg";
import blog2 from "@/assets/images/blog-2.jpg";
import blog3 from "@/assets/images/blog-3.jpg";
import blog4 from "@/assets/images/blog-4.jpg";

const categories = [
  "Tất cả",
  "Kế toán thuế",
  "Luật doanh nghiệp",
  "Bảo hiểm xã hội",
  "Quản trị tài chính",
  "Tin tức nội bộ"
];

const featuredPost = {
  id: 1,
  title: "Hướng dẫn quyết toán thuế thu nhập cá nhân năm 2024 mới nhất",
  description: "Cập nhật các quy định mới nhất về quyết toán thuế TNCN, hồ sơ cần chuẩn bị và thời hạn nộp để tránh bị phạt.",
  image: blog1,
  category: "Kế toán thuế",
  date: "12/02/2024",
  author: "Nguyễn Văn A"
};

const latestPosts = [
  {
    id: 2,
    title: "Những lưu ý quan trọng khi thành lập doanh nghiệp năm 2024",
    description: "Tổng hợp các thủ tục pháp lý, hồ sơ cần thiết và những điều cần tránh khi bắt đầu khởi nghiệp kinh doanh.",
    image: blog2,
    category: "Luật doanh nghiệp",
    date: "10/02/2024"
  },
  {
    id: 3,
    title: "Cách tối ưu chi phí thuế hợp pháp cho doanh nghiệp vừa và nhỏ",
    description: "Chia sẻ kinh nghiệm quản lý chi phí và tận dụng các ưu đãi thuế để tối đa hóa lợi nhuận doanh nghiệp.",
    image: blog3,
    category: "Quản trị tài chính",
    date: "08/02/2024"
  },
  {
    id: 4,
    title: "Quy định mới về hóa đơn điện tử áp dụng từ tháng 7/2024",
    description: "Những thay đổi quan trọng trong việc sử dụng và quản lý hóa đơn điện tử mà kế toán cần nắm rõ.",
    image: blog4,
    category: "Tin tức nội bộ",
    date: "05/02/2024"
  },
  {
    id: 5,
    title: "Lịch nộp các loại báo cáo thuế trong năm 2024",
    description: "Danh sách chi tiết thời hạn nộp tờ khai thuế GTGT, TNCN, TNDN và báo cáo sử dụng hóa đơn.",
    image: blog1,
    category: "Kế toán thuế",
    date: "01/02/2024"
  },
  {
    id: 6,
    title: "Bảo hiểm xã hội bắt buộc: Mức đóng và quyền lợi mới nhất",
    description: "Cập nhật mức đóng BHXH, BHYT, BHTN cho người lao động và người sử dụng lao động.",
    image: blog2,
    category: "Bảo hiểm xã hội",
    date: "28/01/2024"
  }
];

export default function Blog() {
  return (
    <div className="min-h-screen font-sans bg-slate-50 selection:bg-blue-100 selection:text-blue-900">
      {/* Navbar with always-visible styling since we're not on hero */}
      <div className="bg-blue-900">
        <Navbar />
      </div>
      
      {/* Blog Header / Search */}
      <section className="bg-blue-900 pt-32 pb-16 text-white relative overflow-hidden">
         {/* Abstract BG elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold font-display mb-6">Kiến Thức & Tin Tức</h1>
            <p className="text-blue-100 text-lg mb-8">
              Cập nhật thông tin mới nhất về kế toán, thuế và luật doanh nghiệp từ các chuyên gia hàng đầu.
            </p>
            
            <div className="relative max-w-xl mx-auto">
              <input 
                type="text" 
                placeholder="Tìm kiếm bài viết, quy định thuế..." 
                className="w-full pl-5 pr-12 py-4 rounded-full bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/30 shadow-lg font-medium"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center text-white transition-colors">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Navigation - Pharmacy Style Pills */}
      <section className="bg-white border-b border-slate-200 sticky top-[72px] z-40 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto py-4 gap-3 no-scrollbar items-center">
             {categories.map((cat, idx) => (
               <button 
                key={idx}
                className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                  idx === 0 
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/20" 
                    : "bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-blue-600"
                }`}
               >
                 {cat}
               </button>
             ))}
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12">
        {/* Featured Post - Large Layout */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold font-display text-slate-900 mb-6 flex items-center gap-2">
            <span className="w-1 h-6 bg-blue-600 rounded-full block"></span>
            Bài Viết Nổi Bật
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-8 bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-slate-100 group cursor-pointer">
            <div className="aspect-[16/9] lg:aspect-auto overflow-hidden">
              <img 
                src={featuredPost.image} 
                alt={featuredPost.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-8 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider rounded-md">
                  {featuredPost.category}
                </span>
                <span className="flex items-center text-slate-400 text-sm font-medium">
                  <Calendar className="w-4 h-4 mr-1" /> {featuredPost.date}
                </span>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold font-display text-slate-900 mb-4 leading-tight group-hover:text-blue-700 transition-colors">
                {featuredPost.title}
              </h3>
              
              <p className="text-slate-600 mb-6 line-clamp-3 leading-relaxed">
                {featuredPost.description}
              </p>
              
              <div className="mt-auto flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">NV</div>
                  <span className="text-sm font-medium text-slate-700">{featuredPost.author}</span>
                </div>
                <span className="flex items-center text-blue-600 font-semibold group-hover:translate-x-1 transition-transform">
                  Đọc tiếp <ArrowRight className="w-4 h-4 ml-1" />
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Latest Posts Grid - Pharmacy Card Style */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold font-display text-slate-900 flex items-center gap-2">
              <span className="w-1 h-6 bg-blue-600 rounded-full block"></span>
              Mới Nhất
            </h2>
            <Link href="#">
              <a className="text-blue-600 font-semibold flex items-center hover:text-blue-800 transition-colors">
                Xem tất cả <ChevronRight className="w-4 h-4" />
              </a>
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestPosts.map((post) => (
              <article key={post.id} className="bg-white rounded-xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer flex flex-col h-full">
                <div className="aspect-[4/3] overflow-hidden relative">
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 text-xs font-bold text-slate-700 rounded shadow-sm z-10">
                    {post.category}
                  </span>
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex items-center text-slate-400 text-xs font-medium mb-3">
                    <Calendar className="w-3.5 h-3.5 mr-1" /> {post.date}
                  </div>
                  <h3 className="text-lg font-bold font-display text-slate-900 mb-3 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-slate-500 text-sm line-clamp-3 mb-4 flex-grow leading-relaxed">
                    {post.description}
                  </p>
                  <div className="pt-4 border-t border-slate-50 mt-auto">
                    <span className="text-blue-600 text-sm font-semibold flex items-center group-hover:gap-2 transition-all">
                      Xem chi tiết <ChevronRight className="w-4 h-4 ml-1" />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="mt-20 bg-gradient-to-br from-blue-900 to-blue-800 rounded-2xl p-8 md:p-12 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold font-display mb-4">Đăng ký nhận tin</h2>
            <p className="text-blue-100 mb-8 text-lg">
              Nhận thông báo về các quy định thuế mới nhất và mẹo quản trị tài chính doanh nghiệp hàng tuần.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input 
                type="email" 
                placeholder="Nhập email của bạn..." 
                className="bg-white/10 border-white/20 text-white placeholder:text-blue-200/70 h-12 focus-visible:ring-0 focus-visible:border-white"
              />
              <Button className="bg-white text-blue-900 hover:bg-blue-50 font-bold h-12 px-8 shadow-lg">
                Đăng ký
              </Button>
            </div>
            <p className="text-xs text-blue-300 mt-4 opacity-80">
              Chúng tôi cam kết không spam. Bạn có thể hủy đăng ký bất cứ lúc nào.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
