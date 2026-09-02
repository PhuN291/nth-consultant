import { Clock } from "lucide-react";

interface ProcessStep {
  title: string;
  desc: string;
}

interface ProcessTimelineProps {
  steps: ProcessStep[];
  processTime?: string;
  processNote?: string;
  label?: string;
  heading?: string;
  labelClassName?: string;
  dashedConnector?: boolean;
}

const dashedLineStyle = {
  backgroundImage: "repeating-linear-gradient(90deg, #DADCE0 0 8px, transparent 8px 14px)",
};

const dashedLineStyleVertical = {
  backgroundImage: "repeating-linear-gradient(180deg, #DADCE0 0 8px, transparent 8px 14px)",
};

export function ProcessTimeline({ steps, processTime, processNote, label, heading, labelClassName, dashedConnector }: ProcessTimelineProps) {
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className={`font-semibold tracking-wider text-xs uppercase mb-2 block ${labelClassName || "text-primary"}`}>
            {label || "Quy trình làm việc"}
          </span>
          <h2 className="text-2xl md:text-3xl font-bold font-display text-slate-900 mb-2">
            {heading || `${steps.length} bước đơn giản`}
          </h2>
          {processNote && (
            <p className="text-slate-600">{processNote}</p>
          )}
        </div>

        {/* Desktop: horizontal */}
        <div className="hidden md:block">
          <div
            className="relative grid gap-4"
            style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}
          >
            {/* Connector line — one continuous line from first circle's center to last
                circle's center, sitting behind the circles (z-0). Each circle (z-10,
                opaque bg) then visually "cuts" it into per-step segments. */}
            {steps.length > 1 && (
              <div
                className={`absolute top-5 h-0.5 z-0 ${dashedConnector ? "" : "bg-slate-200"}`}
                style={{
                  left: `calc(50% / ${steps.length})`,
                  right: `calc(50% / ${steps.length})`,
                  ...(dashedConnector ? dashedLineStyle : {}),
                }}
              />
            )}
            {steps.map((step, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center text-center px-2">
                <div className="w-10 h-10 rounded-full bg-primary text-white font-bold text-sm flex items-center justify-center mb-3">
                  {i + 1}
                </div>
                <h3 className="font-semibold text-slate-900 text-sm mb-1">{step.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: vertical */}
        <div className="md:hidden relative">
          <div
            className={`absolute left-5 top-2 bottom-2 w-0.5 ${dashedConnector ? "" : "bg-slate-200"}`}
            style={dashedConnector ? dashedLineStyleVertical : undefined}
          />
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
