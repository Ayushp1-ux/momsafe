import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { Apple, Droplets, Plus, TrendingUp, ArrowRight } from "lucide-react";
import { nutrition } from "@/lib/mock-data";

function MacroBar({ label, consumed, goal, unit, color }: { label: string; consumed: number; goal: number; unit: string; color: string }) {
  const pct = Math.round((consumed / goal) * 100);
  return (
    <div>
      <div className="flex justify-between text-xs mb-1.5">
        <span className="font-medium text-gray-700">{label}</span>
        <span className="text-gray-500">{consumed}{unit} / {goal}{unit}</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all" style={{ width: `${Math.min(pct, 100)}%`, backgroundColor: color }} />
      </div>
      <p className="text-[10px] text-gray-400 mt-1">{pct}% of daily goal</p>
    </div>
  );
}

export default function Nutrition() {
  const calPct = Math.round((nutrition.calories.consumed / nutrition.calories.goal) * 100);

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="page-title">Nutrition Tracker</h1>
          <p className="page-subtitle">Personalized nutrition monitoring for optimal fetal and maternal health.</p>
        </div>
        <button className="action-btn"><Plus className="w-4 h-4" /> Log Meal</button>
      </div>

      {/* Calorie overview + macros */}
      <div className="grid grid-cols-3 gap-4">
        {/* Calorie ring */}
        <div className="card p-5 card-hover flex flex-col items-center justify-center">
          <p className="text-xs text-gray-400 mb-3 font-medium">Today's Calories</p>
          <div className="relative w-32 h-32 mb-3">
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
              <circle cx="50" cy="50" r="40" fill="none" stroke="#F3F4F6" strokeWidth="8" />
              <circle cx="50" cy="50" r="40" fill="none" stroke="#3b82f6" strokeWidth="8" strokeLinecap="round"
                strokeDasharray={`${calPct * 2.51} 251`} className="transition-all" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xl font-bold text-gray-900">{nutrition.calories.consumed}</span>
              <span className="text-xs text-gray-400">of {nutrition.calories.goal}</span>
            </div>
          </div>
          <p className="text-xs text-gray-500">{nutrition.calories.goal - nutrition.calories.consumed} kcal remaining</p>
          <div className="mt-2 badge-blue">{calPct}% of goal</div>
        </div>

        {/* Macronutrients */}
        <div className="col-span-2 card p-5 card-hover">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">Macronutrients</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <MacroBar label="Protein" consumed={nutrition.protein.consumed} goal={nutrition.protein.goal} unit="g" color="#3b82f6" />
              <MacroBar label="Carbohydrates" consumed={nutrition.carbs.consumed} goal={nutrition.carbs.goal} unit="g" color="#8b5cf6" />
            </div>
            <div className="space-y-4">
              <MacroBar label="Healthy Fat" consumed={nutrition.fat.consumed} goal={nutrition.fat.goal} unit="g" color="#f59e0b" />
              <MacroBar label="Fiber" consumed={nutrition.fiber.consumed} goal={nutrition.fiber.goal} unit="g" color="#10b981" />
            </div>
          </div>
        </div>
      </div>

      {/* Hydration + weekly chart */}
      <div className="grid grid-cols-3 gap-4">
        {/* Hydration */}
        <div className="card p-5 card-hover">
          <div className="flex items-center gap-2 mb-4">
            <Droplets className="w-4 h-4 text-blue-500" />
            <h2 className="text-sm font-semibold text-gray-700">Hydration</h2>
          </div>
          <div className="flex items-end gap-1.5 mb-3" style={{ height: 80, alignItems: "flex-end" }}>
            {Array.from({ length: 8 }).map((_, i) => {
              const filled = i < Math.round((nutrition.water.consumed / nutrition.water.goal) * 8);
              return (
                <div key={i} className={`flex-1 rounded transition-colors ${filled ? "bg-blue-500" : "bg-gray-100"}`} style={{ height: `${20 + i * 9}px` }} />
              );
            })}
          </div>
          <div className="flex justify-between text-xs mb-2">
            <span className="text-gray-500">Today</span>
            <span className="font-bold text-gray-900">{nutrition.water.consumed}L / {nutrition.water.goal}L</span>
          </div>
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(nutrition.water.consumed / nutrition.water.goal) * 100}%` }} />
          </div>
          <div className="grid grid-cols-4 gap-1.5 mt-4">
            {[0.25, 0.25, 0.25, 0.25].map((v, i) => (
              <button key={i} className="text-xs py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 transition-colors">+{v}L</button>
            ))}
          </div>
        </div>

        {/* Weekly calorie chart */}
        <div className="col-span-2 card p-5 card-hover">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">Weekly Calorie Intake</h2>
          <ResponsiveContainer width="100%" height={140}>
            <BarChart data={nutrition.weeklyData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
              <XAxis dataKey="day" tick={{ fontSize: 10, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#9CA3AF" }} axisLine={false} tickLine={false} domain={[1500, 2400]} />
              <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12, border: "1px solid #E5E7EB" }} />
              <Bar dataKey="calories" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Calories" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Meals log + suggestions */}
      <div className="grid grid-cols-2 gap-4">
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Apple className="w-4 h-4 text-green-500" />
              <h2 className="text-sm font-semibold text-gray-700">Today's Meals</h2>
            </div>
            <button className="ghost-btn text-xs"><Plus className="w-3 h-3" /> Add meal</button>
          </div>
          <div className="space-y-3">
            {nutrition.meals.map(m => (
              <div key={m.name} className={`p-3 rounded-xl border ${m.pending ? "border-dashed border-gray-200 bg-gray-50" : "border-gray-100 bg-white"}`}>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-sm font-semibold text-gray-800">{m.name}</span>
                  <span className="text-xs text-gray-400">{m.time}</span>
                </div>
                {m.pending ? (
                  <p className="text-xs text-gray-400 italic">Not logged yet</p>
                ) : (
                  <>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex flex-wrap gap-1">
                        {m.items.map(item => <span key={item} className="text-xs text-gray-500">{item}</span>)}
                      </div>
                    </div>
                    <span className="badge-blue">{m.calories} kcal</span>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="card p-5">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-4 h-4 text-blue-500" />
            <h2 className="text-sm font-semibold text-gray-700">AI Food Suggestions</h2>
          </div>
          <p className="text-xs text-gray-500 mb-4 leading-relaxed">Based on your current nutritional gaps and W32 pregnancy requirements.</p>
          <div className="grid grid-cols-2 gap-2">
            {nutrition.suggestions.map(s => (
              <div key={s} className="flex items-center gap-2 p-3 rounded-xl bg-emerald-50 border border-emerald-100">
                <span className="text-lg">🥗</span>
                <span className="text-xs font-medium text-emerald-800">{s}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 rounded-xl bg-blue-50 border border-blue-100">
            <p className="text-xs text-blue-700 font-semibold mb-1">Nutritional Gaps Detected</p>
            <p className="text-xs text-blue-600">Iron +15g, Fiber +7g, and Omega-3 intake below recommended W32 levels.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
