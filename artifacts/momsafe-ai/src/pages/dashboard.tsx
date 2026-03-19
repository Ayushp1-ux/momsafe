import { useState } from "react";
import { AreaChart, Area, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { ArrowUpRight, ArrowDownRight, Minus, TrendingUp, TrendingDown, ShieldCheck, Brain, Activity, BellRing, Droplets, Moon, Pill, ChevronRight, Clock } from "lucide-react";
import { riskScore, vitals, alerts, aiRecommendations, activityFeed, trendData, secondaryMetrics } from "@/lib/mock-data";
import { Link } from "wouter";

const statusColor: Record<string, string> = {
  normal: "badge-green",
  warning: "badge-yellow",
  critical: "badge-red",
};
const alertColor: Record<string, string> = {
  critical: "border-l-red-500 bg-red-50",
  warning: "border-l-amber-400 bg-amber-50",
  info: "border-l-blue-400 bg-blue-50",
};
const alertBadge: Record<string, string> = {
  critical: "badge-red",
  warning: "badge-yellow",
  info: "badge-blue",
};

function Sparkline({ data }: { data: number[] }) {
  const pts = data.map((v, i) => ({ v, i }));
  return (
    <ResponsiveContainer width="100%" height={28}>
      <LineChart data={pts}>
        <Line type="monotone" dataKey="v" stroke="#3b82f6" strokeWidth={1.5} dot={false} isAnimationActive />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default function Dashboard() {
  const [period, setPeriod] = useState<"24h" | "7d">("24h");
  const chartData = trendData[period];

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="page-title">Command Center</h1>
          <p className="page-subtitle">AI actively monitoring your vitals and health status.</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            Monitoring Active
          </span>
          <span className="text-gray-300">·</span>
          <span>Last sync: Just now</span>
        </div>
      </div>

      {/* Hero + Do This Now */}
      <div className="grid grid-cols-3 gap-4">
        {/* Risk MRI card */}
        <div className="col-span-2 card p-6 card-hover">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-semibold text-gray-700">AI Risk Score</span>
            </div>
            <div className={riskScore.level === "Low" ? "badge-green" : riskScore.level === "Moderate" ? "badge-yellow" : "badge-red"}>
              {riskScore.level} Risk
            </div>
          </div>
          <div className="flex items-end gap-4 mb-4">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-6xl font-bold text-gray-900 tabular-nums">{riskScore.value}</span>
                <span className="text-2xl text-gray-400 font-light">/ 100</span>
              </div>
              <div className="flex items-center gap-3 mt-2">
                <span className={`flex items-center gap-1 text-sm font-medium ${riskScore.change < 0 ? "text-emerald-600" : "text-red-500"}`}>
                  {riskScore.change < 0 ? <TrendingDown className="w-4 h-4" /> : <TrendingUp className="w-4 h-4" />}
                  {riskScore.change > 0 ? "+" : ""}{riskScore.change} from yesterday
                </span>
                <span className="text-xs text-gray-400">Confidence: {riskScore.confidence}%</span>
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-500 leading-relaxed border-t border-gray-100 pt-4">{riskScore.explanation}</p>
          <div className="flex items-center justify-between mt-3">
            <span className="text-xs text-gray-400">Updated {riskScore.lastUpdated}</span>
            <Link href="/analytics" className="ghost-btn text-xs">Full Analysis <ChevronRight className="w-3 h-3" /></Link>
          </div>
        </div>

        {/* AI Insight — Do This Now */}
        <div className="card p-5 card-hover flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <Brain className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold text-gray-700">Do This Now</span>
          </div>
          <div className="flex-1 space-y-3">
            {aiRecommendations.map((r) => (
              <div key={r.id} className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-xs font-semibold text-gray-800">{r.title}</p>
                  <span className={r.priority === "high" ? "badge-red" : r.priority === "medium" ? "badge-yellow" : "badge-gray"} style={{ fontSize: 10 }}>
                    {r.priority}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">{r.description}</p>
                <button className="mt-2 text-xs font-medium text-blue-600 hover:text-blue-700">{r.action} →</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Vitals grid */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-gray-700">Vital Signs</h2>
          <Link href="/vitals" className="text-xs text-blue-600 hover:text-blue-700 font-medium">View all →</Link>
        </div>
        <div className="grid grid-cols-5 gap-3">
          {vitals.map((v) => (
            <div key={v.id} className="card p-4 card-hover">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-400 font-medium">{v.label}</span>
                <span className={statusColor[v.status] || "badge-gray"}>{v.status}</span>
              </div>
              <div className="stat-value text-lg mb-1">{v.value}<span className="text-xs text-gray-400 font-normal ml-1">{v.unit}</span></div>
              <div className="mb-2">
                <Sparkline data={v.history} />
              </div>
              <div className={`text-xs font-medium flex items-center gap-1 ${v.trend === "up" ? "text-red-500" : v.trend === "down" ? "text-emerald-600" : "text-gray-400"}`}>
                {v.trend === "up" ? <ArrowUpRight className="w-3 h-3" /> : v.trend === "down" ? <ArrowDownRight className="w-3 h-3" /> : <Minus className="w-3 h-3" />}
                {v.change}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trend graph + Alert preview */}
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 card p-5 card-hover">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-700">Vital Trends</h2>
            <div className="flex gap-1">
              {(["24h", "7d"] as const).map((p) => (
                <button key={p} onClick={() => setPeriod(p)} className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-colors ${period === p ? "bg-blue-600 text-white" : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"}`}>{p}</button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={chartData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="hrGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.12} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
              <XAxis dataKey="time" tick={{ fontSize: 10, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12, border: "1px solid #E5E7EB" }} />
              <Area type="monotone" dataKey="hr" stroke="#3b82f6" fill="url(#hrGrad)" strokeWidth={2} dot={false} name="Heart Rate" />
              <Area type="monotone" dataKey="bp" stroke="#8b5cf6" fill="none" strokeWidth={1.5} dot={false} strokeDasharray="4 2" name="Blood Pressure" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Alert preview */}
        <div className="card p-5 card-hover flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <BellRing className="w-4 h-4 text-red-500" />
              <span className="text-sm font-semibold text-gray-700">Active Alerts</span>
              <span className="badge-red ml-1">{alerts.filter(a => !a.acknowledged && !a.resolved).length}</span>
            </div>
            <Link href="/alerts" className="text-xs text-blue-600 font-medium">All →</Link>
          </div>
          <div className="flex-1 space-y-2">
            {alerts.filter(a => !a.resolved).slice(0, 3).map(a => (
              <div key={a.id} className={`flex gap-3 p-3 rounded-xl border-l-2 ${alertColor[a.severity]}`}>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className={alertBadge[a.severity]}>{a.severity}</span>
                    <span className="text-[10px] text-gray-400">{a.time}</span>
                  </div>
                  <p className="text-xs font-semibold text-gray-800">{a.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5 truncate">{a.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick summary + Activity feed + Secondary metrics */}
      <div className="grid grid-cols-3 gap-4">
        {/* Quick summary */}
        <div className="card p-5">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">Quick Summary</h2>
          <div className="space-y-2.5">
            <div className="flex justify-between items-center py-2 border-b border-gray-50">
              <span className="text-xs text-gray-500">Current Condition</span>
              <span className="badge-green">Stable</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-50">
              <span className="text-xs text-gray-500">Pregnancy Week</span>
              <span className="text-xs font-semibold text-gray-800">Week 32 / 40</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-50">
              <span className="text-xs text-gray-500">System Status</span>
              <span className="badge-green flex items-center gap-1"><span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />Active</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-50">
              <span className="text-xs text-gray-500">OB Provider</span>
              <span className="text-xs font-semibold text-gray-800">Dr. Priya Sharma</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-xs text-gray-500">Next Appointment</span>
              <span className="text-xs font-semibold text-gray-800">Mar 26</span>
            </div>
          </div>
        </div>

        {/* Activity feed */}
        <div className="card p-5">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">Activity Feed</h2>
          <div className="space-y-3">
            {activityFeed.map((item, i) => (
              <div key={item.id} className="flex gap-3 items-start">
                <div className="flex flex-col items-center">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-1.5 flex-shrink-0" />
                  {i < activityFeed.length - 1 && <div className="w-px h-6 bg-gray-100 mt-1" />}
                </div>
                <div className="flex-1 min-w-0 pb-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="text-xs font-semibold text-gray-800">{item.event}</p>
                    <span className="text-[10px] text-gray-400 flex-shrink-0">{item.time}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Secondary metrics */}
        <div className="card p-5">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">Daily Metrics</h2>
          <div className="space-y-3">
            <div className="p-3 rounded-xl bg-blue-50 border border-blue-100">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-1.5">
                  <Droplets className="w-3.5 h-3.5 text-blue-500" />
                  <span className="text-xs font-medium text-gray-700">Hydration</span>
                </div>
                <span className="text-xs font-bold text-blue-600">{secondaryMetrics.hydration.value}L / {secondaryMetrics.hydration.goal}L</span>
              </div>
              <div className="h-1.5 bg-blue-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: `${secondaryMetrics.hydration.pct}%` }} />
              </div>
              <p className="text-[10px] text-blue-500 mt-1">{secondaryMetrics.hydration.pct}% of daily goal</p>
            </div>

            <div className="p-3 rounded-xl bg-purple-50 border border-purple-100">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-1.5">
                  <Moon className="w-3.5 h-3.5 text-purple-500" />
                  <span className="text-xs font-medium text-gray-700">Sleep</span>
                </div>
                <span className="text-xs font-bold text-purple-600">{secondaryMetrics.sleep.value} hrs</span>
              </div>
              <div className="h-1.5 bg-purple-100 rounded-full overflow-hidden">
                <div className="h-full bg-purple-500 rounded-full transition-all" style={{ width: `${secondaryMetrics.sleep.pct}%` }} />
              </div>
              <p className="text-[10px] text-purple-500 mt-1">Quality: {secondaryMetrics.sleep.quality}</p>
            </div>

            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-1.5">
                  <Pill className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-xs font-medium text-gray-700">Medication</span>
                </div>
                <span className="text-xs font-bold text-emerald-600">{secondaryMetrics.medication.taken}/{secondaryMetrics.medication.total}</span>
              </div>
              <div className="h-1.5 bg-emerald-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full transition-all" style={{ width: `${secondaryMetrics.medication.pct}%` }} />
              </div>
              <p className="text-[10px] text-emerald-500 mt-1">{secondaryMetrics.medication.pct}% adherence today</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
