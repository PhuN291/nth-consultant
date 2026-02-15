import { Briefcase, Building2, Globe2, Landmark, Shield, Wallet, Award, Database, BarChart3, PieChart, TrendingUp, Users } from "lucide-react";

const row1 = [
  { name: "VietCom Corp", icon: Building2 },
  { name: "TechGlobal", icon: Globe2 },
  { name: "Asia Finance", icon: Landmark },
  { name: "SafeInvest", icon: Shield },
  { name: "FutureWallet", icon: Wallet },
  { name: "PrimeGroup", icon: Briefcase },
];

const row2 = [
  { name: "BestChoice", icon: Award },
  { name: "DataFlow", icon: Database },
  { name: "GrowthChart", icon: TrendingUp },
  { name: "SmartPie", icon: PieChart },
  { name: "MetricSystem", icon: BarChart3 },
  { name: "PeopleFirst", icon: Users },
];

export function PartnerLogos() {
  return (
    <section className="py-16 bg-white border-t border-slate-100 overflow-hidden">
      <div className="container mx-auto px-4 mb-10 text-center">
        <p className="text-slate-500 font-medium">Được tin cậy bởi các doanh nghiệp hàng đầu</p>
      </div>

      <div className="relative">
        {/* Blur Effects */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-white to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-white to-transparent z-10"></div>

        {/* Row 1: Left to Right (Normal scroll) */}
        <div className="flex mb-8 overflow-hidden group">
          <div className="flex gap-8 md:gap-24 animate-marquee whitespace-nowrap group-hover:[animation-play-state:paused]">
            {[...row1, ...row1, ...row1, ...row1].map((logo, idx) => (
              <div key={idx} className="flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 cursor-pointer">
                <logo.icon className="w-6 h-6 md:w-10 md:h-10 text-blue-600" />
                <span className="text-lg md:text-2xl font-bold font-display text-slate-800">{logo.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Right to Left (Reverse scroll) */}
        <div className="flex overflow-hidden group">
          <div className="flex gap-8 md:gap-24 animate-marquee-reverse whitespace-nowrap group-hover:[animation-play-state:paused]">
            {[...row2, ...row2, ...row2, ...row2].map((logo, idx) => (
              <div key={idx} className="flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 cursor-pointer">
                <logo.icon className="w-6 h-6 md:w-10 md:h-10 text-blue-600" />
                <span className="text-lg md:text-2xl font-bold font-display text-slate-800">{logo.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
