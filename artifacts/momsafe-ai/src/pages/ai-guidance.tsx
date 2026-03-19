import { PageTransition } from "@/components/ui/page-transition";
import { BrainCircuit, Sparkles, CheckCircle, ArrowRight, Sun, Sunset, Moon } from "lucide-react";
import { motion } from "framer-motion";

export default function AIGuidance() {
  const dailyPlan = [
    { time: "Morning", icon: Sun, tasks: ["Prenatal Vitamin with Breakfast", "15 min light walking", "Log morning vitals"] },
    { time: "Afternoon", icon: Sunset, tasks: ["Hydration check-in (Goal: 1.5L by now)", "Elevate legs for 20 mins"] },
    { time: "Evening", icon: Moon, tasks: ["Calcium supplement", "Wind down routine: no screens", "Log mood & symptoms"] }
  ];

  return (
    <PageTransition>
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-foreground">AI Guidance</h1>
        <p className="text-muted-foreground mt-1">Personalized action plan generated in real-time based on your data.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Do This Now Panel - High Priority */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-gradient-to-br from-primary to-[#5b8cff] rounded-3xl p-8 shadow-xl shadow-primary/20 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-20">
              <Sparkles className="w-32 h-32" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4 bg-white/20 w-max px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm border border-white/20">
                <BrainCircuit className="w-4 h-4" /> AI Top Priority
              </div>
              <h2 className="text-2xl font-display font-bold mb-2">Adjust your sleep schedule</h2>
              <p className="text-blue-50 max-w-lg leading-relaxed mb-8">
                Your recent vitals show increased resting heart rate during the day. AI analysis correlates this with less than 6 hours of sleep over the past 3 nights.
              </p>
              <div className="flex gap-4">
                <button className="bg-white text-primary px-6 py-3 rounded-xl font-bold shadow-lg hover:-translate-y-0.5 transition-all">
                  View Sleep Plan
                </button>
                <button className="bg-primary-foreground/10 border border-white/30 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/20 transition-all">
                  Dismiss
                </button>
              </div>
            </div>
          </div>

          <h3 className="text-xl font-display font-bold mt-8 mb-4">Preventive Suggestions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {['Increase Iron Intake', 'Prepare Hospital Bag', 'Pelvic Floor Exercises'].map((task, i) => (
              <div key={i} className="bg-white p-5 rounded-2xl border border-border/50 premium-shadow group cursor-pointer hover:border-primary/30 transition-all">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-semibold text-foreground">{task}</h4>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <p className="text-sm text-muted-foreground">Based on Week 32 milestones and your recent bloodwork trends.</p>
              </div>
            ))}
          </div>
        </div>

        {/* Daily Plan Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-3xl border border-border/50 premium-shadow overflow-hidden">
            <div className="p-6 bg-gray-50/50 border-b border-border/50">
              <h3 className="font-display font-bold text-lg">Today's Smart Plan</h3>
              <p className="text-xs text-muted-foreground mt-1">Dynamically adjusted for you</p>
            </div>
            
            <div className="p-6 space-y-8">
              {dailyPlan.map((phase, i) => (
                <div key={i} className="relative">
                  {i !== dailyPlan.length - 1 && (
                    <div className="absolute left-4 top-10 bottom-[-30px] w-0.5 bg-gray-100" />
                  )}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-accent/10 text-accent flex items-center justify-center relative z-10">
                      <phase.icon className="w-4 h-4" />
                    </div>
                    <h4 className="font-bold text-foreground">{phase.time}</h4>
                  </div>
                  <div className="pl-11 space-y-3">
                    {phase.tasks.map((task, j) => (
                      <label key={j} className="flex items-start gap-3 group cursor-pointer">
                        <div className="w-5 h-5 rounded border border-gray-300 mt-0.5 group-hover:border-primary transition-colors flex items-center justify-center">
                          {/* Checked state would go here */}
                        </div>
                        <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{task}</span>
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
