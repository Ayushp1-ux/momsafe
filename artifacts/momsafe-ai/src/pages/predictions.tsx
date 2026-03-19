import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, ReferenceLine } from "recharts";
import { TrendingUp, Brain, AlertTriangle, ArrowUp, ArrowDown, Minus } from "lucide-react";
import { predictions } from "@/lib/mock-data";

export default function Predictions() {
  const projected = predictions.riskForecast.filter(d => d.projected);
  const historical = predictions.riskForecast.filter(d => !d.projected);

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="page-title">Predictive Analytics</h1>
          <p className="page-subtitle">AI-powered 7-day risk forecast and early warning indicators.</p>
        </div>
        <div className="flex items-center gap-2">
          <Brain className="w-4 h-4 text-blue-500" />
          <span className="text-xs font-medium text-gray-600">Model Confidence: <strong className="text-gray-900">{predictions.confidence}%</strong></span>
        </div>
      </div>

      {/* AI Explanation */}
      <div className="card p-5 border border-blue-100 bg-blue-50/50">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <Brain className="w-4 h-4 text-blue-600" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-semibold text-blue-900">AI Forecast Summary</span>
              <span className="badge-blue">Week 32 → Week 34</span>
            </div>
            <p className="text-sm text-blue-800 leading-relaxed">{predictions.aiExplanation}</p>
          </div>
        </div>
      </div>

      {/* Risk forecast chart */}
      <div className="card p-5 card-hover">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-gray-700">14-Day Risk Score + 7-Day Forecast</h2>
          <div className="flex gap-4">
            {[{ label: "Historical", color: "#3b82f6" }, { label: "Projected", color: "#8b5cf6" }].map(l => (
              <div key={l.label} className="flex items-center gap-1.5">
                <div className="w-3 h-0.5 rounded" style={{ backgroundColor: l.color }} />
                <span className="text-xs text-gray-400">{l.label}</span>
              </div>
            ))}
          </div>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={predictions.riskForecast} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="histG" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.12} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="projG" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.12} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
            <XAxis dataKey="day" tick={{ fontSize: 9, fill: "#9CA3AF" }} axisLine={false} tickLine={false} interval={2} />
            <YAxis tick={{ fontSize: 10, fill: "#9CA3AF" }} axisLine={false} tickLine={false} domain={[15, 45]} />
            <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12, border: "1px solid #E5E7EB" }} formatter={(v, n, p) => [v, p.payload.projected ? "Projected Risk" : "Historical Risk"]} />
            <ReferenceLine y={30} stroke="#fbbf24" strokeDasharray="4 2" label={{ value: "Low/Moderate", fontSize: 9, fill: "#fbbf24" }} />
            <ReferenceLine x="Mar 20" stroke="#9CA3AF" strokeDasharray="4 2" label={{ value: "Today", fontSize: 9, fill: "#9CA3AF" }} />
            <Area type="monotone" dataKey="risk" stroke="#3b82f6" fill="url(#histG)" strokeWidth={2} dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Vital forecasts + scenarios */}
      <div className="grid grid-cols-2 gap-4">
        <div className="card p-5">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">Vital Sign Forecasts</h2>
          <div className="space-y-3">
            {predictions.vitalsForecasts.map(f => (
              <div key={f.vital} className="p-4 rounded-xl border border-gray-100 bg-gray-50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-800">{f.vital}</span>
                  <div className="flex items-center gap-2">
                    <span className={f.risk === "Normal" ? "badge-green" : f.risk === "Watch" ? "badge-blue" : "badge-yellow"}>{f.risk}</span>
                    <span className="text-xs text-gray-400">{f.confidence}% conf.</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-center">
                    <p className="text-[10px] text-gray-400">Current</p>
                    <p className="text-xs font-bold text-gray-700">{f.current}</p>
                  </div>
                  <div className={`flex-1 flex items-center justify-center ${f.trend === "up" ? "text-amber-400" : f.trend === "stable" ? "text-gray-300" : "text-emerald-400"}`}>
                    {f.trend === "up" ? <ArrowUp className="w-4 h-4" /> : f.trend === "stable" ? <Minus className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] text-gray-400">Forecast</p>
                    <p className="text-xs font-bold text-gray-700">{f.forecast}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-5">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            <h2 className="text-sm font-semibold text-gray-700">Risk Scenario Analysis</h2>
          </div>
          <p className="text-xs text-gray-500 mb-4 leading-relaxed">AI simulates how lifestyle changes would impact your risk score over the next 7 days.</p>
          <div className="space-y-3">
            {predictions.scenarios.map(s => {
              const isPositive = s.impact.startsWith("-");
              return (
                <div key={s.label} className={`p-3 rounded-xl border ${isPositive ? "border-emerald-100 bg-emerald-50" : "border-red-100 bg-red-50"}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-gray-700">{s.label}</p>
                    </div>
                    <span className={`text-sm font-bold ml-3 ${isPositive ? "text-emerald-600" : "text-red-500"}`}>{s.impact}</span>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-4 p-3 rounded-xl bg-blue-50 border border-blue-100">
            <p className="text-xs font-semibold text-blue-700 mb-1">Recommended Path</p>
            <p className="text-xs text-blue-600 leading-relaxed">Maintaining hydration at 2.5L daily and sleeping 7+ hours could reduce your 7-day risk score by 22%.</p>
          </div>

          <div className="mt-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
            <p className="text-xs font-semibold text-gray-600 mb-1">Warning Indicators</p>
            <div className="space-y-1.5 mt-2">
              {[
                { label: "BP ≥ 140/90", status: "Not Detected", ok: true },
                { label: "Severe headaches", status: "Not Reported", ok: true },
                { label: "Visual disturbances", status: "Not Reported", ok: true },
                { label: "Rapid weight gain", status: "Monitor", ok: false },
              ].map(w => (
                <div key={w.label} className="flex justify-between">
                  <span className="text-xs text-gray-600">{w.label}</span>
                  <span className={`text-xs font-medium ${w.ok ? "text-emerald-600" : "text-amber-500"}`}>{w.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
