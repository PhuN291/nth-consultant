import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { categories } from "@/data/service-categories";

export function ServicesGrid() {
  return (
    <section id="dich-vu" className="py-16 md:py-24 bg-slate-50 scroll-mt-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-display text-slate-900 mb-4">
            Giải Pháp Toàn Diện Cho Doanh Nghiệp
          </h2>
          <p className="text-slate-600 text-lg">
            Đồng hành cùng doanh nghiệp trong các nghiệp vụ kế toán – thuế, pháp lý và lao động nước ngoài.
          </p>
        </div>

        <div className="space-y-12 md:space-y-16">
          {categories.map((category) => (
            <div key={category.label}>
              <div className="mb-6 md:mb-8">
                <h3 className="text-2xl md:text-3xl font-bold font-display text-slate-900">
                  {category.label}
                </h3>
                {category.intro && (
                  <p className="text-slate-600 mt-2 max-w-3xl">{category.intro}</p>
                )}
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {category.services.map((service, index) => (
                  <Card
                    key={`${category.label}-${index}`}
                    className="border-none shadow-sm hover:shadow-xl transition-all duration-300 group bg-white overflow-hidden flex flex-col"
                  >
                    <CardHeader>
                      <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors duration-300">
                        <service.icon className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors duration-300" />
                      </div>
                      <CardTitle className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors leading-snug">
                        {service.title}
                      </CardTitle>
                      <CardDescription className="text-sm md:text-base mt-2">
                        {service.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <ul className="space-y-2">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start text-sm text-slate-600">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mr-2 mt-1.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter className="pt-0">
                      {service.slug ? (
                        <Link
                          href={`/dich-vu/${service.slug}`}
                          className={buttonVariants({
                            variant: "ghost",
                            className:
                              "p-0 text-blue-600 hover:text-blue-800 hover:bg-transparent font-medium group/btn",
                          })}
                        >
                          Xem chi tiết
                          <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                        </Link>
                      ) : (
                        <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                          Tư vấn liên hệ
                        </span>
                      )}
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA: link to full services-list page */}
        <div className="text-center mt-12 md:mt-16">
          <Link
            href="/dich-vu"
            className={buttonVariants({
              variant: "outline",
              size: "lg",
              className: "border-blue-200 text-blue-700 hover:bg-blue-50 hover:text-blue-800 font-semibold gap-2",
            })}
          >
            Xem tất cả dịch vụ
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
