import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { services as ALL_SERVICES, type ServiceData } from "@/data/services";

interface RelatedServicesProps {
  currentSlug: string;
  limit?: number;
}

export function RelatedServices({ currentSlug, limit = 3 }: RelatedServicesProps) {
  const others: ServiceData[] = ALL_SERVICES.filter((s) => s.slug !== currentSlug).slice(0, limit);

  if (others.length === 0) return null;

  return (
    <section className="py-12 md:py-16 bg-slate-50 border-t border-slate-100">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-primary font-semibold tracking-wider text-xs uppercase mb-2 block">
            Dịch vụ liên quan
          </span>
          <h2 className="text-2xl md:text-3xl font-bold font-display text-slate-900">
            Có thể bạn cũng quan tâm
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {others.map((s) => (
            <Link key={s.slug} href={`/dich-vu/${s.slug}`}>
              <article className="group bg-white border border-slate-200 hover:border-primary hover:shadow-md rounded-lg p-5 transition-all duration-200 cursor-pointer h-full flex flex-col">
                <h3 className="text-base font-semibold font-display text-slate-900 mb-1.5 leading-snug group-hover:text-primary transition-colors">
                  {s.title}
                </h3>
                <p className="text-sm text-slate-600 mb-3 line-clamp-2 leading-relaxed">
                  {s.subtitle}
                </p>
                <ul className="space-y-1 mb-4 flex-grow">
                  {s.highlights.slice(0, 3).map((h, i) => (
                    <li key={i} className="flex items-start gap-1.5 text-xs text-slate-500">
                      <span className="text-primary mt-0.5">•</span>
                      <span className="line-clamp-1">{h}</span>
                    </li>
                  ))}
                </ul>
                <span className="text-primary font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                  Xem chi tiết <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
