import { useState } from "react";
import { AreaChart, Area, LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend, ReferenceLine } from "recharts";
import { Brain, TrendingUp, AlertTriangle } from "lucide-react";
import { trendData, analyticsData } from "@/lib/mock-data";

const periods = ["24H", "7D", "30D"] as const;

export default function Analytics() {
  const [period, setPeriod] = useState<"24H" | "7D" | "30D">("7D");
  const chartData = trendData["7d"];

  const summaryCards = [
    { label: "Avg Risk Score", value: "27", unit: "/100", color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100" },
    { label: "Critical Events", value: "1", unit: "this week", color: "text-red-600", bg: "bg-red-50", border: "border-red-100" },
    { label: "Avg Heart Rate", value: "82", unit: "bpm", color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100" },
    { label: "Anomalies", value: "2", unit: "detected", color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-100" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="page-title">Analytics & Intelligence</h1>
          <p className="page-subtitle">Multi-dimensional health trend analysis and AI insights.</p>
        </div>
        <div className="flex gap-1 card p-1">
          {periods.map(p => (
            <button key={p} onClick={() => setPeriod(p)} className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${period === p ? "bg-blue-600 text-white" : "text-gray-500 hover:bg-gray-100"}`}>{p}</button>
          ))}
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-4 gap-3">
        {summaryCards.map(c => (
          <div key={c.label} className={`card p-4 border ${c.border} ${c.bg} card-hover`}>
            <p className="text-xs text-gray-500 mb-1">{c.label}</p>
            <div className="flex items-baseline gap-1">
              <span className={`text-2xl font-bold tabular-nums ${c.color}`}>{c.value}</span>
              <span className="text-xs text-gray-400">{c.unit}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main trend chart */}
      <div className="card p-5 card-hover">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-gray-700">Multi-Vital Trend Overlay</h2>
          <div className="flex gap-3">
            {[{ label: "Heart Rate", color: "#3b82f6" }, { label: "Blood Pressure", color: "#8b5cf6" }, { label: "SpO2", color: "#10b981" }].map(l => (
              <div key={l.label} className="flex items-center gap-1.5">
                <div className="w-3 h-0.5 rounded" style={{ backgroundColor: l.color }} />
                <span className="text-xs text-gray-400">{l.label}</span>
              </div>
            ))}
          </div>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={chartData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="hrG" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
            <XAxis dataKey="time" tick={{ fontSize: 10, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12, border: "1px solid #E5E7EB" }} />
            <Area type="monotone" dataKey="hr" stroke="#3b82f6" fill="url(#hrG)" strokeWidth={2} dot={false} name="Heart Rate" />
            <Line type="monotone" dataKey="bp" stroke="#8b5cf6" strokeWidth={2} dot={false} name="Blood Pressure" />
            <Line type="monotone" dataKey="spo2" stroke="#10b981" strokeWidth={1.5} dot={false} strokeDasharray="4 2" name="SpO2" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Risk trajectory */}
        <div className="card p-5 card-hover">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">Weekly Risk Trajectory</h2>
          <ResponsiveContainer width="100%" height={160}>
            <LineChart data={analyticsData.weeklyRisk} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
              <XAxis dataKey="week" tick={{ fontSize: 10, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#9CA3AF" }} axisLine={false} tickLine={false} domain={[0, 50]} />
              <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12, border: "1px solid #E5E7EB" }} />
              <ReferenceLine y={30} stroke="#fbbf24" strokeDasharray="4 2" label={{ value: "Threshold", fontSize: 10, fill: "#fbbf24" }} />
              <Line type="monotone" dataKey="risk" stroke="#3b82f6" strokeWidth={2.5} dot={{ fill: "#3b82f6", r: 3 }} name="Risk Score" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Correlation panel */}
        <div className="card p-5 card-hover">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">Risk Factor Correlations</h2>
          <div className="space-y-3">
            {analyticsData.correlations.map(c => (
              <div key={c.factor}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-600 font-medium">{c.factor}</span>
                  <span className={`font-semibold ${c.direction === "positive" ? "text-red-500" : "text-emerald-600"}`}>
                    {c.direction === "positive" ? "↑" : "↓"} {Math.round(c.correlation * 100)}%
                  </span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full transition-all ${c.direction === "positive" ? "bg-red-400" : "bg-emerald-400"}`} style={{ width: `${c.correlation * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Insights + Anomalies */}
      <div className="grid grid-cols-2 gap-4">
        <div className="card p-5">
          <div className="flex items-center gap-2 mb-4">
            <Brain className="w-4 h-4 text-blue-500" />
            <h2 className="text-sm font-semibold text-gray-700">AI Insights</h2>
          </div>
          <div className="space-y-3">
            {[
              { insight: "Blood pressure trending up over last 3 days. Continue monitoring, reduce sodium.", priority: "medium" },
              { insight: "Sleep quality correlates strongly with next-day HR elevation. Prioritize 7+ hours.", priority: "high" },
              { insight: "Hydration consistently below goal. Increase daily intake by ~600ml.", priority: "medium" },
            ].map((i, idx) => (
              <div key={idx} className="flex gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                <TrendingUp className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-700 leading-relaxed">{i.insight}</p>
                  <span className={`text-[10px] font-medium mt-1 inline-block ${i.priority === "high" ? "text-amber-600" : "text-gray-400"}`}>{i.priority} priority</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-5">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            <h2 className="text-sm font-semibold text-gray-700">Anomaly Detection</h2>
          </div>
          <div className="space-y-3 mb-4">
            {analyticsData.anomalies.map((a, i) => (
              <div key={i} className="p-3 rounded-xl bg-amber-50 border border-amber-100">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-amber-800">{a.vital}</span>
                  <span className="text-xs text-gray-400">{a.date}</span>
                </div>
                <p className="text-xs text-amber-700">Recorded: <strong>{a.value}</strong></p>
                <p className="text-xs text-gray-500">Expected: {a.expected}</p>
              </div>
            ))}
          </div>
          <div className="p-3 rounded-xl bg-blue-50 border border-blue-100">
            <p className="text-xs font-semibold text-blue-700 mb-1">Monthly Summary</p>
            <p className="text-xs text-blue-600 leading-relaxed">Overall health trajectory is stable. 2 minor anomalies detected and resolved. Risk score decreased by 4 points vs last month.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
