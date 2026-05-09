import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "wouter";
import DOMPurify from "dompurify";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Calendar, ArrowLeft, Home } from "lucide-react";
import type { BlogPost as BlogPostType } from "@shared/schema";
import blogFallback from "@/assets/images/blog-1.jpg";

function formatDate(d: Date | string) {
  const dt = typeof d === "string" ? new Date(d) : d;
  return dt.toLocaleDateString("vi-VN", { day: "2-digit", month: "long", year: "numeric" });
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();

  const { data: post, isLoading, error } = useQuery<BlogPostType>({
    queryKey: [`/api/blog/${slug}`],
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <div className="bg-blue-900">
          <Navbar />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <p className="text-slate-500">Đang tải bài viết...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <div className="bg-blue-900">
          <Navbar />
        </div>
        <div className="flex-1 flex items-center justify-center text-center px-4 pt-32 pb-16">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Không tìm thấy bài viết</h1>
            <p className="text-slate-500 mb-4">Bài viết có thể đã bị gỡ hoặc URL không đúng.</p>
            <Link href="/tin-tuc" className="text-blue-600 font-semibold hover:underline">
              ← Về trang tin tức
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const sanitizedHtml = DOMPurify.sanitize(post.contentHtml);

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
            <Link href="/tin-tuc" className="hover:text-blue-600 transition-colors flex-shrink-0">
              Tin tức
            </Link>
            <span className="mx-2 text-slate-300">/</span>
            <span className="text-blue-600 font-medium truncate">{post.title}</span>
          </div>
        </div>
      </div>

      <main className="flex-1 container mx-auto px-4 py-8 md:py-12 max-w-3xl">
        <Link href="/tin-tuc" className="text-sm text-slate-500 hover:text-slate-900 inline-flex items-center gap-1 mb-6">
          <ArrowLeft className="w-4 h-4" /> Tất cả bài viết
        </Link>

        <article className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          {post.coverImageUrl && (
            <div className="aspect-[16/9] bg-slate-100">
              <img src={post.coverImageUrl} alt={post.title} className="w-full h-full object-cover" />
            </div>
          )}

          <div className="p-6 md:p-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider rounded-md">
                {post.category}
              </span>
              <span className="flex items-center text-slate-400 text-sm font-medium">
                <Calendar className="w-4 h-4 mr-1" /> {formatDate(post.publishedAt || post.createdAt)}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold font-display text-slate-900 mb-4 leading-tight">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="text-lg text-slate-600 mb-6 leading-relaxed border-l-4 border-blue-200 pl-4 italic">
                {post.excerpt}
              </p>
            )}

            <div className="flex items-center gap-2 mb-8 pb-6 border-b border-slate-100">
              <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-sm font-bold text-slate-600">
                {post.author.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-900">{post.author}</div>
                <div className="text-xs text-slate-500">Tác giả</div>
              </div>
            </div>

            <div
              className="prose prose-slate max-w-none prose-headings:font-display prose-headings:text-slate-900 prose-a:text-blue-600 prose-img:rounded-xl"
              dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
            />
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
