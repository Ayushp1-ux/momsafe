import { useState } from "react";
import { Droplets, Moon, Smile, Plus, Minus, BarChart2 } from "lucide-react";
import { dailyLogs } from "@/lib/mock-data";

const moods = ["😟", "😕", "😐", "🙂", "😊"];
const moodLabels = ["Poor", "Low", "Okay", "Good", "Great"];

function Slider({ label, value, max, unit, color, onChange }: { label: string; value: number; max: number; unit: string; color: string; onChange: (v: number) => void }) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-2">
        <span className="font-medium text-gray-700">{label}</span>
        <span className="font-bold text-gray-900">{value}{unit}</span>
      </div>
      <input type="range" min={0} max={max} step={max > 10 ? 0.1 : 1} value={value} onChange={e => onChange(Number(e.target.value))}
        className="w-full h-2 rounded-full appearance-none cursor-pointer" style={{ accentColor: color }} />
      <div className="flex justify-between text-[10px] text-gray-400 mt-1">
        <span>0</span><span>{max}{unit}</span>
      </div>
    </div>
  );
}

export default function DailyLogs() {
  const [water, setWater] = useState(dailyLogs.water.logged);
  const [sleepHrs, setSleepHrs] = useState(dailyLogs.sleep.hours);
  const [mood, setMood] = useState(dailyLogs.mood - 1);
  const [symptoms, setSymptoms] = useState<string[]>(dailyLogs.symptoms.filter(s => s.severity > 0).map(s => s.name));

  const allSymptoms = ["Fatigue", "Back Pain", "Heartburn", "Swelling", "Nausea", "Headache", "Insomnia", "Shortness of Breath"];

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="page-title">Daily Logs</h1>
          <p className="page-subtitle">Track your daily wellness inputs to improve AI prediction accuracy.</p>
        </div>
        <button className="action-btn">Save Today's Log</button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* Water tracker */}
        <div className="card p-5 card-hover">
          <div className="flex items-center gap-2 mb-4">
            <Droplets className="w-4 h-4 text-blue-500" />
            <h2 className="text-sm font-semibold text-gray-700">Water Intake</h2>
          </div>
          <div className="flex items-center justify-center gap-4 mb-4">
            <button onClick={() => setWater(w => Math.max(0, w - 0.25))} className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50"><Minus className="w-4 h-4 text-gray-500" /></button>
            <div className="text-center">
              <span className="text-4xl font-bold text-gray-900 tabular-nums">{water.toFixed(1)}</span>
              <span className="text-sm text-gray-400 ml-1">L</span>
            </div>
            <button onClick={() => setWater(w => Math.min(4, w + 0.25))} className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50"><Plus className="w-4 h-4 text-gray-500" /></button>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-2">
            <div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: `${Math.min((water / dailyLogs.water.goal) * 100, 100)}%` }} />
          </div>
          <p className="text-xs text-center text-gray-400">Goal: {dailyLogs.water.goal}L · {Math.round((water / dailyLogs.water.goal) * 100)}% complete</p>
          <div className="grid grid-cols-4 gap-1 mt-4">
            {[0.25, 0.5, 1, 1.5].map(v => (
              <button key={v} onClick={() => setWater(w => Math.min(4, w + v))} className="text-xs py-1 rounded-lg border border-blue-100 text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors">+{v}L</button>
            ))}
          </div>
        </div>

        {/* Sleep */}
        <div className="card p-5 card-hover">
          <div className="flex items-center gap-2 mb-4">
            <Moon className="w-4 h-4 text-purple-500" />
            <h2 className="text-sm font-semibold text-gray-700">Sleep Log</h2>
          </div>
          <div className="text-center mb-4">
            <span className="text-4xl font-bold text-gray-900 tabular-nums">{sleepHrs.toFixed(1)}</span>
            <span className="text-sm text-gray-400 ml-1">hours</span>
          </div>
          <Slider label="Duration" value={sleepHrs} max={12} unit="h" color="#8b5cf6" onChange={setSleepHrs} />
          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="p-3 rounded-xl bg-purple-50 border border-purple-100 text-center">
              <p className="text-[10px] text-purple-400">Bedtime</p>
              <p className="text-sm font-bold text-purple-700">{dailyLogs.sleep.bedtime}</p>
            </div>
            <div className="p-3 rounded-xl bg-purple-50 border border-purple-100 text-center">
              <p className="text-[10px] text-purple-400">Wake Up</p>
              <p className="text-sm font-bold text-purple-700">{dailyLogs.sleep.wakeup}</p>
            </div>
          </div>
          <div className="mt-3">
            <p className="text-xs text-gray-400 mb-2">Sleep Quality</p>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map(star => (
                <div key={star} className={`flex-1 h-2 rounded-full ${star <= dailyLogs.sleep.quality ? "bg-purple-400" : "bg-gray-100"}`} />
              ))}
            </div>
          </div>
        </div>

        {/* Mood */}
        <div className="card p-5 card-hover">
          <div className="flex items-center gap-2 mb-4">
            <Smile className="w-4 h-4 text-amber-500" />
            <h2 className="text-sm font-semibold text-gray-700">Mood Log</h2>
          </div>
          <div className="text-center mb-4">
            <span className="text-5xl">{moods[mood]}</span>
            <p className="text-sm font-semibold text-gray-700 mt-2">{moodLabels[mood]}</p>
          </div>
          <div className="flex justify-center gap-3 mb-4">
            {moods.map((m, i) => (
              <button key={i} onClick={() => setMood(i)} className={`text-2xl p-1.5 rounded-xl transition-colors ${mood === i ? "bg-amber-100 ring-2 ring-amber-400" : "hover:bg-gray-100"}`}>{m}</button>
            ))}
          </div>
          <div className="p-3 rounded-xl bg-amber-50 border border-amber-100">
            <p className="text-xs text-amber-700">Mood data is used to detect correlation with hormonal and sleep patterns.</p>
          </div>
        </div>
      </div>

      {/* Symptoms */}
      <div className="card p-5">
        <h2 className="text-sm font-semibold text-gray-700 mb-4">Symptom Tracker</h2>
        <div className="flex flex-wrap gap-2">
          {allSymptoms.map(s => {
            const active = symptoms.includes(s);
            return (
              <button key={s} onClick={() => setSymptoms(prev => active ? prev.filter(x => x !== s) : [...prev, s])}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${active ? "bg-red-100 border-red-300 text-red-700" : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100"}`}>
                {active && "✓ "}{s}
              </button>
            );
          })}
        </div>
        {symptoms.length > 0 && (
          <div className="mt-4 p-3 rounded-xl bg-amber-50 border border-amber-100">
            <p className="text-xs font-semibold text-amber-700 mb-1">AI Note on Reported Symptoms</p>
            <p className="text-xs text-amber-600 leading-relaxed">
              {symptoms.join(", ")} have been logged. These will be included in your next risk assessment. Consult your OB if symptoms worsen.
            </p>
          </div>
        )}
      </div>

      {/* History */}
      <div className="card p-5">
        <div className="flex items-center gap-2 mb-4">
          <BarChart2 className="w-4 h-4 text-blue-500" />
          <h2 className="text-sm font-semibold text-gray-700">Log History</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 text-xs font-semibold text-gray-400 pr-6">Date</th>
                <th className="text-left py-2 text-xs font-semibold text-gray-400 pr-6">Water</th>
                <th className="text-left py-2 text-xs font-semibold text-gray-400 pr-6">Sleep</th>
                <th className="text-left py-2 text-xs font-semibold text-gray-400">Mood</th>
              </tr>
            </thead>
            <tbody>
              {dailyLogs.history.map(row => (
                <tr key={row.date} className="border-b border-gray-50">
                  <td className="py-2.5 text-xs font-medium text-gray-700 pr-6">{row.date}</td>
                  <td className="py-2.5 pr-6">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-16 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-400 rounded-full" style={{ width: `${(row.water / 2.5) * 100}%` }} />
                      </div>
                      <span className="text-xs text-gray-600">{row.water}L</span>
                    </div>
                  </td>
                  <td className="py-2.5 pr-6">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-16 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-purple-400 rounded-full" style={{ width: `${(row.sleep / 9) * 100}%` }} />
                      </div>
                      <span className="text-xs text-gray-600">{row.sleep}h</span>
                    </div>
                  </td>
                  <td className="py-2.5">
                    <span className="text-lg">{moods[row.mood - 1]}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
