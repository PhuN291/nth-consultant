import { Clock } from "lucide-react";

interface ProcessStep {
  title: string;
  desc: string;
}

interface ProcessTimelineProps {
  steps: ProcessStep[];
  processTime?: string;
  processNote?: string;
}

export function ProcessTimeline({ steps, processTime, processNote }: ProcessTimelineProps) {
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-primary font-semibold tracking-wider text-xs uppercase mb-2 block">
            Quy trình làm việc
          </span>
          <h2 className="text-2xl md:text-3xl font-bold font-display text-slate-900 mb-2">
            {steps.length} bước đơn giản
          </h2>
          {processNote && (
            <p className="text-slate-600">{processNote}</p>
          )}
        </div>

        {/* Desktop: horizontal */}
        <div className="hidden md:block">
          <div
            className="grid gap-4"
            style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}
          >
            {steps.map((step, i) => (
              <div key={i} className="relative">
                {/* Connector line — subtle */}
                {i < steps.length - 1 && (
                  <div className="absolute top-5 left-[calc(50%+1.5rem)] right-[-0.5rem] h-px bg-slate-200" />
                )}
                <div className="relative z-10 flex flex-col items-center text-center px-2">
                  <div className="w-10 h-10 rounded-full bg-primary text-white font-bold text-sm flex items-center justify-center mb-3">
                    {i + 1}
                  </div>
                  <h3 className="font-semibold text-slate-900 text-sm mb-1">{step.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: vertical */}
        <div className="md:hidden relative">
          <div className="absolute left-5 top-2 bottom-2 w-px bg-slate-200" />
          <div className="space-y-5">
            {steps.map((step, i) => (
              <div key={i} className="relative flex gap-4">
                <div className="w-10 h-10 rounded-full bg-primary text-white font-bold text-sm flex items-center justify-center flex-shrink-0 z-10">
                  {i + 1}
                </div>
                <div className="pt-1.5 flex-1">
                  <h3 className="font-semibold text-slate-900 mb-0.5">{step.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {processTime && (
          <div className="mt-8 max-w-md mx-auto bg-slate-50 rounded-md p-3 flex items-center gap-3 border border-slate-200">
            <Clock className="w-4 h-4 text-primary flex-shrink-0" />
            <div className="text-sm">
              <span className="text-slate-500">Thời gian thực hiện: </span>
              <span className="font-semibold text-slate-900">{processTime}</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
