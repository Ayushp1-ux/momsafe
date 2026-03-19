import { PageTransition } from "@/components/ui/page-transition";
import { BookHeart, Smile, Frown, Thermometer, Moon, Save } from "lucide-react";
import { useState } from "react";

export default function DailyLogs() {
  const [mood, setMood] = useState<number | null>(3);
  const moods = [
    { icon: Frown, color: "text-red-500", bg: "bg-red-50 hover:bg-red-100", label: "Awful" },
    { icon: Frown, color: "text-orange-500", bg: "bg-orange-50 hover:bg-orange-100", label: "Bad" },
    { icon: Smile, color: "text-yellow-500", bg: "bg-yellow-50 hover:bg-yellow-100", label: "Okay" },
    { icon: Smile, color: "text-green-500", bg: "bg-green-50 hover:bg-green-100", label: "Good" },
    { icon: Smile, color: "text-emerald-500", bg: "bg-emerald-50 hover:bg-emerald-100", label: "Great" },
  ];

  return (
    <PageTransition>
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-foreground">Daily Check-in</h1>
        <p className="text-muted-foreground mt-1">Help the AI understand how you're feeling today.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl">
        {/* Mood Tracker */}
        <div className="bg-white rounded-3xl p-8 border border-border/50 premium-shadow">
          <h2 className="font-display font-bold text-xl mb-6 flex items-center gap-2">
            <BookHeart className="w-5 h-5 text-accent" /> How are you feeling?
          </h2>
          <div className="flex justify-between gap-2">
            {moods.map((m, i) => (
              <button 
                key={i}
                onClick={() => setMood(i)}
                className={`flex flex-col items-center gap-2 p-3 flex-1 rounded-2xl transition-all border ${mood === i ? `border-${m.color.split('-')[1]}-300 ${m.bg} shadow-sm scale-105` : 'border-transparent hover:bg-gray-50'}`}
              >
                <m.icon className={`w-8 h-8 ${mood === i ? m.color : 'text-gray-400'}`} />
                <span className={`text-xs font-semibold ${mood === i ? m.color : 'text-gray-500'}`}>{m.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Sleep Tracker */}
        <div className="bg-white rounded-3xl p-8 border border-border/50 premium-shadow">
          <h2 className="font-display font-bold text-xl mb-6 flex items-center gap-2">
            <Moon className="w-5 h-5 text-indigo-500" /> Sleep Last Night
          </h2>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm font-medium mb-3">
                <span>Duration</span>
                <span className="text-indigo-600 font-bold">7.5 hours</span>
              </div>
              <input type="range" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" min="0" max="12" step="0.5" defaultValue="7.5" />
            </div>
            <div>
              <div className="flex justify-between text-sm font-medium mb-3">
                <span>Quality</span>
                <span className="text-indigo-600 font-bold">Good</span>
              </div>
              <input type="range" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" min="1" max="5" defaultValue="4" />
            </div>
          </div>
        </div>

        {/* Symptoms */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-8 border border-border/50 premium-shadow">
          <h2 className="font-display font-bold text-xl mb-6 flex items-center gap-2">
            <Thermometer className="w-5 h-5 text-orange-500" /> Symptoms Log
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {['Nausea', 'Headache', 'Swelling (Edema)', 'Fatigue', 'Back Pain', 'Contractions/Cramps'].map((sym, i) => (
              <label key={i} className="flex items-center gap-4 p-4 rounded-2xl border border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors">
                <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary" />
                <span className="font-medium text-foreground">{sym}</span>
              </label>
            ))}
          </div>
          
          <div className="mt-6">
            <label className="block text-sm font-medium text-foreground mb-2">Additional Notes for AI</label>
            <textarea 
              className="w-full bg-gray-50 border border-border rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none h-24"
              placeholder="Describe any other feelings or symptoms..."
            />
          </div>
          
          <div className="mt-8 flex justify-end">
            <button className="bg-primary text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 hover:-translate-y-0.5 transition-all flex items-center gap-2">
              <Save className="w-5 h-5" /> Save Daily Log
            </button>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
