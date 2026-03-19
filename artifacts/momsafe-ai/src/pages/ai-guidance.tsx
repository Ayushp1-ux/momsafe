import { Brain, CheckCircle, ArrowRight, Sun, Sunset, Moon, Sparkles, Shield, Star } from "lucide-react";
import { aiRecommendations, dailyPlan } from "@/lib/mock-data";
import { useState } from "react";

const timeIcons: Record<string, any> = { Morning: Sun, Afternoon: Sunset, Evening: Moon };

export default function AIGuidance() {
  const [checked, setChecked] = useState<string[]>([]);
  const toggle = (key: string) => setChecked(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]);

  const preventive = [
    { title: "Increase Iron Intake", desc: "Based on W32 milestones and your recent bloodwork trends.", icon: "🌿" },
    { title: "Prepare Hospital Bag", desc: "Week 32 is a good time to prepare. AI checklist available.", icon: "🏥" },
    { title: "Pelvic Floor Exercises", desc: "Daily Kegel exercises recommended to prepare for delivery.", icon: "💪" },
    { title: "Reduce Screen Time", desc: "Blue light exposure linked to sleep disruption in your data.", icon: "📱" },
  ];

  const insights = [
    { title: "Sleep + HR Correlation", desc: "On days with <7 hrs sleep, your morning HR is 8% higher. Prioritize rest.", badge: "Detected", color: "blue" },
    { title: "Hydration Impact", desc: "Days with 2+ liters water show 12% lower risk score on average.", badge: "Positive", color: "green" },
    { title: "Evening BP Trend", desc: "Blood pressure peaks between 6–8 PM. Avoid strenuous activity then.", badge: "Monitor", color: "yellow" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="page-title">AI Guidance</h1>
          <p className="page-subtitle">Personalized action plan generated in real-time based on your data.</p>
        </div>
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-blue-500" />
          <span className="text-xs text-blue-600 font-medium">AI Updated Just Now</span>
        </div>
      </div>

      {/* Top priority card */}
      <div className="card p-6 bg-gradient-to-r from-blue-600 to-blue-700 border-0">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <Star className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1">
            <span className="text-xs font-semibold text-blue-200 uppercase tracking-wide">AI Top Priority</span>
            <h2 className="text-lg font-bold text-white mt-1">Adjust your sleep schedule</h2>
            <p className="text-sm text-blue-100 mt-2 leading-relaxed">Your recent vitals show increased resting heart rate during the day. AI analysis correlates this with less than 6 hours of sleep over the past 3 nights.</p>
            <div className="flex gap-2 mt-4">
              <button className="text-sm font-medium px-4 py-2 bg-white text-blue-700 rounded-lg hover:bg-blue-50 transition-colors">View Sleep Plan</button>
              <button className="text-sm font-medium px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors">Dismiss</button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* Do This Now */}
        <div className="col-span-2 card p-5">
          <div className="flex items-center gap-2 mb-4">
            <Brain className="w-4 h-4 text-blue-500" />
            <h2 className="text-sm font-semibold text-gray-700">Immediate Actions</h2>
          </div>
          <div className="space-y-3">
            {aiRecommendations.map(r => (
              <div key={r.id} className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50 hover:bg-white hover:border-blue-100 transition-all">
                <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${r.priority === "high" ? "bg-red-400" : r.priority === "medium" ? "bg-amber-400" : "bg-emerald-400"}`} />
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-gray-800">{r.title}</p>
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${r.priority === "high" ? "bg-red-100 text-red-600" : r.priority === "medium" ? "bg-amber-100 text-amber-600" : "bg-gray-100 text-gray-500"}`}>
                      {r.priority}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">{r.description}</p>
                  <button className="mt-2 text-xs font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1">{r.action} <ArrowRight className="w-3 h-3" /></button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Daily plan */}
        <div className="card p-5">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-4 h-4 text-blue-500" />
            <h2 className="text-sm font-semibold text-gray-700">Today's Smart Plan</h2>
          </div>
          <div className="space-y-4">
            {dailyPlan.map(section => {
              const Icon = timeIcons[section.time];
              return (
                <div key={section.time}>
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="w-3.5 h-3.5 text-gray-400" />
                    <span className="text-xs font-semibold text-gray-500">{section.time}</span>
                  </div>
                  <div className="space-y-1.5 pl-5">
                    {section.tasks.map(task => {
                      const key = `${section.time}-${task}`;
                      const done = checked.includes(key);
                      return (
                        <button key={task} onClick={() => toggle(key)} className="w-full flex items-center gap-2 text-left">
                          <div className={`w-4 h-4 rounded flex-shrink-0 border flex items-center justify-center transition-colors ${done ? "bg-blue-600 border-blue-600" : "border-gray-300"}`}>
                            {done && <CheckCircle className="w-3 h-3 text-white" />}
                          </div>
                          <span className={`text-xs leading-relaxed ${done ? "text-gray-400 line-through" : "text-gray-700"}`}>{task}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Preventive suggestions */}
      <div>
        <h2 className="text-sm font-semibold text-gray-700 mb-3">Preventive Suggestions</h2>
        <div className="grid grid-cols-4 gap-3">
          {preventive.map(p => (
            <div key={p.title} className="card p-4 card-hover">
              <span className="text-2xl mb-2 block">{p.icon}</span>
              <p className="text-sm font-semibold text-gray-800">{p.title}</p>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">{p.desc}</p>
              <button className="mt-3 text-xs font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1">Learn more <ArrowRight className="w-3 h-3" /></button>
            </div>
          ))}
        </div>
      </div>

      {/* Context insights */}
      <div>
        <h2 className="text-sm font-semibold text-gray-700 mb-3">Context-Aware Insights</h2>
        <div className="grid grid-cols-3 gap-3">
          {insights.map(i => (
            <div key={i.title} className="card p-4 card-hover">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-gray-700">{i.title}</span>
                <span className={i.color === "blue" ? "badge-blue" : i.color === "green" ? "badge-green" : "badge-yellow"}>{i.badge}</span>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">{i.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
