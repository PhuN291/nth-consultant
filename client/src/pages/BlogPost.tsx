import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "wouter";
import DOMPurify from "dompurify";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ContactDialog } from "@/components/ContactDialog";
import { useToast } from "@/hooks/use-toast";
import {
  Calendar,
  Clock,
  ArrowLeft,
  ArrowRight,
  Home,
  ChevronRight,
  Facebook,
  Link2,
  List,
} from "lucide-react";
import type { BlogPost as BlogPostType } from "@shared/schema";
import blogFallback from "@/assets/images/blog-1.jpg";

interface BlogListResponse {
  posts: BlogPostType[];
  total: number;
}

interface TocItem {
  id: string;
  text: string;
  level: number;
}

// Design tokens — giữ nhất quán toàn trang
const CARD = "bg-white rounded-2xl border border-slate-200";

function formatDate(d: Date | string) {
  const dt = typeof d === "string" ? new Date(d) : d;
  return dt.toLocaleDateString("vi-VN", { day: "2-digit", month: "long", year: "numeric" });
}

function readingTime(html: string): number {
  const text = html.replace(/<[^>]+>/g, " ");
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

// Sanitize + thêm id cho h2/h3 để build mục lục (TOC)
function processContent(html: string): { html: string; toc: TocItem[] } {
  const clean = DOMPurify.sanitize(html);
  if (typeof window === "undefined") return { html: clean, toc: [] };
  const doc = new DOMParser().parseFromString(clean, "text/html");
  const headings = Array.from(doc.querySelectorAll("h2, h3"));
  const toc: TocItem[] = [];
  headings.forEach((h, i) => {
    const id = `section-${i}`;
    h.id = id;
    h.setAttribute("data-toc-heading", "");
    h.classList.add("scroll-mt-24");
    toc.push({
      id,
      text: h.textContent?.trim() || `Mục ${i + 1}`,
      level: h.tagName === "H3" ? 3 : 2,
    });
  });
  return { html: doc.body.innerHTML, toc };
}

// ---------------------------------------------------------------------------

// Mục lục — box inline ở đầu bài, hiện trên mọi kích thước màn hình
function TableOfContents({ toc, activeId }: { toc: TocItem[]; activeId: string }) {
  if (toc.length === 0) return null;
  return (
    <nav
      aria-label="Mục lục bài viết"
      className="mb-8 rounded-xl border border-slate-200 bg-slate-50 p-5"
    >
      <p className="flex items-center gap-2 text-sm font-bold text-slate-900 mb-3">
        <List className="w-4 h-4 text-slate-500" aria-hidden="true" /> Nội dung bài viết
      </p>
      <ul className="space-y-1.5">
        {toc.map((item) => (
          <li key={item.id} className={item.level === 3 ? "pl-4" : ""}>
            <a
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                history.replaceState(null, "", `#${item.id}`);
              }}
              className={`text-sm leading-snug transition-colors ${
                activeId === item.id
                  ? "text-blue-600 font-semibold"
                  : "text-slate-600 hover:text-blue-600"
              }`}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function RelatedPosts({ category, currentSlug }: { category: string; currentSlug: string }) {
  const { data } = useQuery<BlogListResponse>({
    queryKey: [`/api/blog?category=${encodeURIComponent(category)}&pageSize=4`],
  });

  const related = (data?.posts ?? []).filter((p) => p.slug !== currentSlug).slice(0, 3);
  if (related.length === 0) return null;

  return (
    <section className="mt-12 md:mt-16">
      <h2 className="text-2xl font-bold font-display text-slate-900 mb-6 flex items-center gap-2">
        <span className="w-1 h-6 bg-blue-600 rounded-full block" />
        Bài viết liên quan
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {related.map((post) => (
          <Link key={post.id} href={`/tin-tuc/${post.slug}`}>
            <article
              className={`${CARD} overflow-hidden hover:border-blue-300 hover:shadow-sm transition-all duration-200 group cursor-pointer flex flex-col h-full`}
            >
              <div className="aspect-[16/9] overflow-hidden relative bg-slate-100">
                <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 text-xs font-semibold text-slate-700 rounded-full shadow-sm z-10">
                  {post.category}
                </span>
                <img
                  src={post.coverImageUrl || blogFallback}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <div className="flex items-center text-slate-500 text-xs font-medium mb-2.5">
                  <Calendar className="w-3.5 h-3.5 mr-1" aria-hidden="true" />
                  {formatDate(post.publishedAt || post.createdAt)}
                </div>
                <h3 className="text-base font-bold font-display text-slate-900 mb-2 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-slate-500 text-sm line-clamp-2 mb-4 flex-grow leading-relaxed">
                  {post.excerpt}
                </p>
                <span className="text-blue-600 text-sm font-semibold flex items-center mt-auto">
                  Đọc tiếp <ChevronRight className="w-4 h-4 ml-0.5" aria-hidden="true" />
                </span>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}

function ArticleCta() {
  return (
    <section className="mt-12 md:mt-16 bg-blue-700 rounded-2xl p-8 md:p-10 text-center text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
      <div className="relative z-10 max-w-xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold font-display mb-3">
          Cần tư vấn kế toán &ndash; thuế cho doanh nghiệp?
        </h2>
        <p className="text-blue-100 mb-6">
          Đội ngũ NTH Consulting sẵn sàng đồng hành cùng bạn. Nhận tư vấn miễn phí ngay hôm nay.
        </p>
        <ContactDialog
          source="blog-post-cta"
          trigger={
            <Button className="bg-white text-blue-700 hover:bg-blue-50 font-bold h-12 px-8">
              Liên hệ tư vấn miễn phí
              <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
            </Button>
          }
        />
      </div>
    </section>
  );
}

function ShareRow() {
  const { toast } = useToast();
  const url = typeof window !== "undefined" ? window.location.href : "";
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast({ title: "Đã sao chép liên kết" });
    } catch {
      toast({ title: "Không sao chép được", variant: "destructive" });
    }
  };
  const btnCls =
    "w-10 h-10 rounded-full bg-slate-100 hover:bg-blue-100 hover:text-blue-600 flex items-center justify-center text-slate-600 transition-colors";
  return (
    <div className="flex items-center gap-3 mt-10 pt-6 border-t border-slate-200">
      <span className="text-sm font-semibold text-slate-700">Chia sẻ:</span>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chia sẻ Facebook"
        className={btnCls}
      >
        <Facebook className="w-4 h-4" aria-hidden="true" />
      </a>
      <button type="button" onClick={copyLink} aria-label="Sao chép liên kết" className={btnCls}>
        <Link2 className="w-4 h-4" aria-hidden="true" />
      </button>
    </div>
  );
}

function BlogPostSkeleton() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <div className="bg-blue-900 sticky top-0 z-50">
        <Navbar />
      </div>
      <div className="bg-white border-b border-slate-200 pt-20">
        <div className="container mx-auto px-4 py-3">
          <div className="h-4 w-48 bg-slate-200 rounded animate-pulse" />
        </div>
      </div>
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12 max-w-5xl">
        <div className="max-w-3xl mx-auto">
          <div className="h-4 w-32 bg-slate-200 rounded animate-pulse mb-6" />
          <div className="h-6 w-40 bg-slate-200 rounded-full animate-pulse mb-4" />
          <div className="h-10 w-3/4 bg-slate-200 rounded-lg animate-pulse mb-4" />
          <div className="h-9 w-48 bg-slate-100 rounded-lg animate-pulse mb-8" />
          <div className="space-y-2.5">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="h-4 bg-slate-100 rounded animate-pulse"
                style={{ width: `${70 + ((i * 7) % 30)}%` }}
              />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

// ---------------------------------------------------------------------------

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [activeId, setActiveId] = useState("");

  const { data: post, isLoading, error } = useQuery<BlogPostType>({
    queryKey: [`/api/blog/${slug}`],
  });

  const { html: contentHtml, toc } = useMemo(
    () => processContent(post?.contentHtml ?? ""),
    [post?.contentHtml],
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Scrollspy: highlight mục lục theo vị trí đọc
  useEffect(() => {
    if (toc.length === 0) return;
    const headings = Array.from(document.querySelectorAll<HTMLElement>("[data-toc-heading]"));
    if (headings.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-96px 0px -70% 0px" },
    );
    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [toc, contentHtml]);

  if (isLoading) {
    return <BlogPostSkeleton />;
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <div className="bg-blue-900 sticky top-0 z-50">
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

  const publishedDate = formatDate(post.publishedAt || post.createdAt);
  const minutes = readingTime(post.contentHtml);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <div className="bg-blue-900 sticky top-0 z-50">
        <Navbar />
      </div>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-200 pt-20">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center text-sm text-slate-500 overflow-x-auto whitespace-nowrap">
            <Link href="/" className="hover:text-blue-600 transition-colors flex-shrink-0">
              <Home className="w-4 h-4" aria-hidden="true" />
            </Link>
            <span className="mx-2 text-slate-300">/</span>
            <Link href="/tin-tuc" className="hover:text-blue-600 transition-colors flex-shrink-0">
              Tin tức
            </Link>
            <span className="mx-2 text-slate-300">/</span>
            <span className="text-slate-900 font-medium truncate">{post.title}</span>
          </div>
        </div>
      </div>

      <main className="flex-1 container mx-auto px-4 py-8 md:py-12 max-w-5xl">
        {/* Bài viết — không đóng khung, flow trực tiếp cho cảm giác nghiêm túc */}
        <div className="max-w-3xl mx-auto">
          <Link
            href="/tin-tuc"
            className="text-sm text-slate-600 hover:text-blue-600 inline-flex items-center gap-1.5 mb-6 font-medium"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" /> Tất cả bài viết
          </Link>

          <article>
            {/* Meta row */}
            <div className="flex items-center gap-x-4 gap-y-2 mb-4 flex-wrap text-sm">
              <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold uppercase tracking-wide rounded-full">
                {post.category}
              </span>
              <span className="flex items-center text-slate-500 font-medium">
                <Calendar className="w-4 h-4 mr-1.5" aria-hidden="true" /> {publishedDate}
              </span>
              <span className="flex items-center text-slate-500 font-medium">
                <Clock className="w-4 h-4 mr-1.5" aria-hidden="true" /> {minutes} phút đọc
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold font-display text-slate-900 mb-4 leading-tight">
              {post.title}
            </h1>

            {/* Byline — gọn 1 dòng */}
            <div className="flex items-center gap-2.5 pb-6 mb-8 border-b border-slate-200">
              <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-700 flex-shrink-0">
                {post.author.slice(0, 2).toUpperCase()}
              </div>
              <span className="text-sm font-semibold text-slate-900">{post.author}</span>
            </div>

            {/* Mục lục */}
            <TableOfContents toc={toc} activeId={activeId} />

            {/* Nội dung */}
            <div
              className="prose prose-slate prose-lg max-w-none prose-headings:font-display prose-headings:text-slate-900 prose-a:text-blue-600 prose-img:rounded-xl"
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />

            <ShareRow />
          </article>
        </div>

        <RelatedPosts category={post.category} currentSlug={post.slug} />
        <ArticleCta />
      </main>

      <Footer />
    </div>
  );
}
