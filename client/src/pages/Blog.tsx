import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Calendar, ChevronRight, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import type { BlogPost } from "@shared/schema";
import blogFallback from "@/assets/images/blog-1.jpg";

const categories = [
  "Tất cả",
  "Kế toán thuế",
  "Luật doanh nghiệp",
  "Bảo hiểm xã hội",
  "Quản trị tài chính",
  "Tin tức nội bộ",
];

interface BlogListResponse {
  posts: BlogPost[];
  total: number;
}

function formatDate(d: Date | string) {
  const dt = typeof d === "string" ? new Date(d) : d;
  return dt.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" });
}

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState<string>("Tất cả");
  const [search, setSearch] = useState("");

  const queryParams = new URLSearchParams();
  if (activeCategory !== "Tất cả") queryParams.set("category", activeCategory);
  if (search.trim()) queryParams.set("search", search.trim());
  queryParams.set("pageSize", "20");
  const queryUrl = `/api/blog?${queryParams.toString()}`;

  const { data, isLoading } = useQuery<BlogListResponse>({
    queryKey: [queryUrl],
  });

  const posts = data?.posts ?? [];
  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <div className="min-h-screen font-sans bg-slate-50 selection:bg-blue-100 selection:text-blue-900">
      <div className="bg-blue-900">
        <Navbar />
      </div>

      <section className="bg-blue-900 pt-32 pb-16 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold font-display mb-6">Kiến Thức & Tin Tức</h1>
            <p className="text-blue-100 text-lg mb-8">
              Cập nhật thông tin mới nhất về kế toán, thuế và luật doanh nghiệp từ các chuyên gia hàng đầu.
            </p>

            <form
              className="relative max-w-xl mx-auto"
              onSubmit={(e) => {
                e.preventDefault();
                // Search là live khi gõ; submit chỉ scroll về danh sách
                document.querySelector("main")?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            >
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Tìm kiếm bài viết, quy định thuế..."
                className="w-full pl-5 pr-12 py-4 rounded-full bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/30 shadow-lg font-medium"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center text-white transition-colors"
                aria-label="Tìm kiếm"
              >
                <Search className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="bg-white border-b border-slate-200 sticky top-[72px] z-40 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto py-4 gap-3 no-scrollbar items-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                  activeCategory === cat
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
        {isLoading ? (
          <div className="text-center py-20 text-slate-500">Đang tải bài viết...</div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-xl font-bold text-slate-900 mb-2">Chưa có bài viết</h2>
            <p className="text-slate-500">
              {search || activeCategory !== "Tất cả"
                ? "Không tìm thấy bài viết phù hợp với bộ lọc."
                : "Hãy quay lại sau — chúng tôi đang chuẩn bị nội dung mới."}
            </p>
          </div>
        ) : (
          <>
            {featured && (
              <section className="mb-16">
                <h2 className="text-2xl font-bold font-display text-slate-900 mb-6 flex items-center gap-2">
                  <span className="w-1 h-6 bg-blue-600 rounded-full block"></span>
                  Bài Viết Nổi Bật
                </h2>

                <Link href={`/tin-tuc/${featured.slug}`}>
                  <div className="grid lg:grid-cols-2 gap-8 bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-slate-100 group cursor-pointer">
                    <div className="aspect-[16/9] lg:aspect-auto overflow-hidden bg-slate-100">
                      <img
                        src={featured.coverImageUrl || blogFallback}
                        alt={featured.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-8 flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider rounded-md">
                          {featured.category}
                        </span>
                        <span className="flex items-center text-slate-400 text-sm font-medium">
                          <Calendar className="w-4 h-4 mr-1" />{" "}
                          {formatDate(featured.publishedAt || featured.createdAt)}
                        </span>
                      </div>

                      <h3 className="text-2xl md:text-3xl font-bold font-display text-slate-900 mb-4 leading-tight group-hover:text-blue-700 transition-colors">
                        {featured.title}
                      </h3>

                      <p className="text-slate-600 mb-6 line-clamp-3 leading-relaxed">{featured.excerpt}</p>

                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
                            {featured.author.slice(0, 2).toUpperCase()}
                          </div>
                          <span className="text-sm font-medium text-slate-700">{featured.author}</span>
                        </div>
                        <span className="flex items-center text-blue-600 font-semibold group-hover:translate-x-1 transition-transform">
                          Đọc tiếp <ArrowRight className="w-4 h-4 ml-1" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </section>
            )}

            {rest.length > 0 && (
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold font-display text-slate-900 flex items-center gap-2">
                    <span className="w-1 h-6 bg-blue-600 rounded-full block"></span>
                    Mới Nhất
                  </h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {rest.map((post) => (
                    <Link key={post.id} href={`/tin-tuc/${post.slug}`}>
                      <article className="bg-white rounded-xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer flex flex-col h-full">
                        <div className="aspect-[4/3] overflow-hidden relative bg-slate-100">
                          <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 text-xs font-bold text-slate-700 rounded shadow-sm z-10">
                            {post.category}
                          </span>
                          <img
                            src={post.coverImageUrl || blogFallback}
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>
                        <div className="p-5 flex flex-col flex-grow">
                          <div className="flex items-center text-slate-400 text-xs font-medium mb-3">
                            <Calendar className="w-3.5 h-3.5 mr-1" />{" "}
                            {formatDate(post.publishedAt || post.createdAt)}
                          </div>
                          <h3 className="text-lg font-bold font-display text-slate-900 mb-3 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
                            {post.title}
                          </h3>
                          <p className="text-slate-500 text-sm line-clamp-3 mb-4 flex-grow leading-relaxed">
                            {post.excerpt}
                          </p>
                          <div className="pt-4 border-t border-slate-50 mt-auto">
                            <span className="text-blue-600 text-sm font-semibold flex items-center group-hover:gap-2 transition-all">
                              Xem chi tiết <ChevronRight className="w-4 h-4 ml-1" />
                            </span>
                          </div>
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </>
        )}

        <NewsletterSection />
      </main>

      <Footer />
    </div>
  );
}

function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email.trim()) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: email.trim(), // dùng email làm name vì newsletter chỉ có email
          phone: "0000000000", // placeholder vì server bắt buộc phone
          email: email.trim(),
          service: "Đăng ký nhận tin",
          source: "blog-newsletter",
          message: "Đăng ký newsletter từ trang Tin tức",
        }),
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || "Gửi thất bại");
      }
      setSuccess(true);
      setEmail("");
    } catch (err: any) {
      setError(err?.message?.replace(/^\d+:\s*/, "") || "Có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="mt-20 bg-gradient-to-br from-blue-900 to-blue-800 rounded-2xl p-8 md:p-12 text-center text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>

      <div className="relative z-10 max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold font-display mb-4">Đăng ký nhận tin</h2>
        <p className="text-blue-100 mb-8 text-lg">
          Nhận thông báo về các quy định thuế mới nhất và mẹo quản trị tài chính doanh nghiệp hàng tuần.
        </p>
        {success ? (
          <p className="text-blue-100 bg-white/10 rounded-lg py-3 px-4 inline-block">
            ✓ Cảm ơn bạn! Chúng tôi sẽ gửi tin tức tới email của bạn.
          </p>
        ) : (
          <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nhập email của bạn..."
              disabled={submitting}
              className="bg-white/10 border-white/20 text-white placeholder:text-blue-200/70 h-12 focus-visible:ring-0 focus-visible:border-white"
            />
            <Button type="submit" disabled={submitting} className="bg-white text-blue-900 hover:bg-blue-50 font-bold h-12 px-8 shadow-lg">
              {submitting ? "Đang gửi..." : "Đăng ký"}
            </Button>
          </form>
        )}
        {error && (
          <p className="text-red-200 text-sm mt-3">{error}</p>
        )}
        <p className="text-xs text-blue-300 mt-4 opacity-80">
          Chúng tôi cam kết không spam. Bạn có thể hủy đăng ký bất cứ lúc nào.
        </p>
      </div>
    </section>
  );
}
