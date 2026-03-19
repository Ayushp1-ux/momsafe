import { PageTransition } from "@/components/ui/page-transition";
import { CheckSquare, Info } from "lucide-react";

export default function AIGuidance() {
  const dailyPlan = [
    { time: "08:00", tasks: ["Prenatal Vitamin", "Log morning vitals"] },
    { time: "14:00", tasks: ["Hydration check: 1.5L target", "Elevate legs for 20m"] },
    { time: "20:00", tasks: ["Calcium supplement", "Log symptoms"] }
  ];

  return (
    <PageTransition>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Clinical Guidance</h1>
        <p className="text-sm text-muted-foreground">Automated care plan generated from real-time telemetry.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* High Priority Panel */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="card-clinical p-0 border-l-4 border-l-primary overflow-hidden">
            <div className="p-4 bg-blue-50/50 border-b border-border flex items-center gap-2">
              <Info className="w-4 h-4 text-primary" />
              <span className="text-xs font-bold uppercase tracking-widest text-primary">Priority Intervention</span>
            </div>
            <div className="p-5">
              <h2 className="text-lg font-bold mb-2 text-foreground">Adjust Sleep Architecture</h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Telemetry indicates elevated diurnal resting heart rate correlating with suboptimal sleep duration (<6h) over 72h.
              </p>
              <div className="flex gap-3">
                <button className="px-4 py-2 bg-primary text-white text-xs font-bold rounded hover:bg-primary/90 transition-colors">
                  Acknowledge & View Plan
                </button>
                <button className="px-4 py-2 bg-white border border-border text-foreground text-xs font-medium rounded hover:bg-gray-50 transition-colors">
                  Dismiss
                </button>
              </div>
            </div>
          </div>

          <div className="card-clinical p-0">
            <div className="p-4 border-b border-border">
              <h3 className="clinical-label">Preventive Actions</h3>
            </div>
            <div className="divide-y divide-border">
              {['Increase Dietary Iron', 'Prepare Birthing Checklist', 'Pelvic Floor Routine'].map((task, i) => (
                <div key={i} className="p-4 flex justify-between items-center hover:bg-gray-50 cursor-pointer">
                  <div>
                    <h4 className="text-sm font-bold text-foreground">{task}</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">Based on W34 protocol.</p>
                  </div>
                  <button className="text-xs text-primary font-medium">Review</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Daily Protocol Sidebar */}
        <div className="lg:col-span-1">
          <div className="card-clinical p-0">
            <div className="p-4 bg-gray-50 border-b border-border">
              <h3 className="clinical-label">Daily Protocol</h3>
            </div>
            <div className="p-4 space-y-6">
              {dailyPlan.map((phase, i) => (
                <div key={i} className="relative">
                  <div className="flex items-baseline gap-3 mb-3">
                    <div className="text-xs font-bold text-muted-foreground tabular-nums w-10">{phase.time}</div>
                    <div className="h-px bg-border flex-1" />
                  </div>
                  <div className="pl-12 space-y-2">
                    {phase.tasks.map((task, j) => (
                      <label key={j} className="flex items-start gap-2 cursor-pointer group">
                        <CheckSquare className="w-4 h-4 text-gray-300 group-hover:text-primary mt-0.5" />
                        <span className="text-xs text-foreground font-medium">{task}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}