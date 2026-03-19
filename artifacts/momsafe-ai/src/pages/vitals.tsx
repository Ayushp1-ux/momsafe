import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, ReferenceArea } from "recharts";
import { Activity, Download, ChevronDown } from "lucide-react";
import { vitals, trendData } from "@/lib/mock-data";

const periods = ["24H", "7D", "30D"] as const;

const vitalDetails = [
  { id: "hr", normal: "60–100 bpm", interpretation: "Stable pattern within normal maternal range. No anomalies in the last 7 days.", color: "#3b82f6", normalMin: 60, normalMax: 100 },
  { id: "bp", normal: "90–120 / 60–80 mmHg", interpretation: "Slight elevation noted 2 days ago, normalized after rest. Continue monitoring.", color: "#8b5cf6", normalMin: 110, normalMax: 130 },
  { id: "spo2", normal: "95–100%", interpretation: "Consistently healthy oxygen saturation. No interventions required.", color: "#10b981", normalMin: 95, normalMax: 100 },
  { id: "temp", normal: "36.1–37.2°C", interpretation: "Temperature within expected range for pregnancy. No fever detected.", color: "#f59e0b", normalMin: 36.1, normalMax: 37.2 },
  { id: "weight", normal: "Expected +0.3–0.5 kg/week", interpretation: "Weight gain on higher end of normal. Monitor for edema signs.", color: "#ef4444", normalMin: 66, normalMax: 70 },
];

export default function Vitals() {
  const [period, setPeriod] = useState<"24H" | "7D" | "30D">("7D");

  const chartData = trendData["7d"].map((d) => ({
    time: d.time, hr: d.hr, bp: d.bp, spo2: d.spo2,
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="page-title">Vitals Intelligence</h1>
          <p className="page-subtitle">Historical physiological markers and threshold analysis.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex gap-1 card p-1">
            {periods.map((p) => (
              <button key={p} onClick={() => setPeriod(p)} className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${period === p ? "bg-blue-600 text-white" : "text-gray-500 hover:bg-gray-100"}`}>{p}</button>
            ))}
          </div>
          <button className="ghost-btn"><Download className="w-4 h-4" /> Export CSV</button>
        </div>
      </div>

      {/* Vitals cards with detailed charts */}
      <div className="space-y-4">
        {vitals.map((v) => {
          const detail = vitalDetails.find(d => d.id === v.id);
          const data = Array.from({ length: 14 }, (_, i) => ({
            day: i + 1,
            value: Number(v.history[i % v.history.length]) + Math.round(Math.random() * 2 - 1),
          }));
          const deviation = Math.round((Math.random() - 0.5) * 8 * 10) / 10;
          return (
            <div key={v.id} className="card p-5 card-hover">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-blue-500" />
                    <h3 className="text-sm font-semibold text-gray-800">{v.label}</h3>
                    <span className={v.status === "normal" ? "badge-green" : v.status === "warning" ? "badge-yellow" : "badge-red"}>{v.status}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{detail?.interpretation}</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-gray-900 tabular-nums">{v.value}</div>
                  <div className="text-xs text-gray-400">{v.unit}</div>
                  <div className={`text-xs font-medium mt-1 ${deviation >= 0 ? "text-amber-500" : "text-emerald-600"}`}>
                    {deviation > 0 ? "+" : ""}{deviation}% from baseline
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4 mb-4">
                <div className="col-span-3">
                  <ResponsiveContainer width="100%" height={120}>
                    <LineChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                      <XAxis dataKey="day" tick={{ fontSize: 10, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 10, fill: "#9CA3AF" }} axisLine={false} tickLine={false} domain={["auto", "auto"]} />
                      <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12, border: "1px solid #E5E7EB" }} />
                      {detail && <ReferenceArea y1={detail.normalMin} y2={detail.normalMax} fill={detail.color} fillOpacity={0.06} />}
                      <Line type="monotone" dataKey="value" stroke={detail?.color || "#3b82f6"} strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-2">
                  <div className="p-2 rounded-lg bg-gray-50">
                    <p className="text-[10px] text-gray-400">Normal Range</p>
                    <p className="text-xs font-medium text-gray-700 mt-0.5">{detail?.normal}</p>
                  </div>
                  <div className="p-2 rounded-lg bg-gray-50">
                    <p className="text-[10px] text-gray-400">Current</p>
                    <p className="text-xs font-bold text-gray-900">{v.value} {v.unit}</p>
                  </div>
                  <div className="p-2 rounded-lg bg-gray-50">
                    <p className="text-[10px] text-gray-400">24h Change</p>
                    <p className={`text-xs font-bold ${v.trend === "up" ? "text-amber-500" : "text-emerald-600"}`}>{v.change}</p>
                  </div>
                </div>
              </div>

              {/* History log */}
              <div className="border-t border-gray-100 pt-3">
                <p className="text-xs font-semibold text-gray-500 mb-2">Recent Readings</p>
                <div className="flex gap-2 overflow-x-auto">
                  {v.history.map((val, i) => (
                    <div key={i} className="flex-shrink-0 text-center px-2 py-1 rounded-lg bg-gray-50">
                      <p className="text-xs font-bold text-gray-800 tabular-nums">{val}</p>
                      <p className="text-[10px] text-gray-400">{8 - i}d ago</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Comparison view */}
      <div className="card p-5">
        <h2 className="text-sm font-semibold text-gray-700 mb-4">Vitals Comparison (7-Day Trend)</h2>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={chartData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
            <XAxis dataKey="time" tick={{ fontSize: 10, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12, border: "1px solid #E5E7EB" }} />
            <Line type="monotone" dataKey="hr" stroke="#3b82f6" strokeWidth={2} dot={false} name="Heart Rate" />
            <Line type="monotone" dataKey="bp" stroke="#8b5cf6" strokeWidth={2} dot={false} name="Blood Pressure" />
            <Line type="monotone" dataKey="spo2" stroke="#10b981" strokeWidth={2} dot={false} name="SpO2" />
          </LineChart>
        </ResponsiveContainer>
        <div className="flex gap-4 mt-3 justify-center">
          {[{ label: "Heart Rate", color: "#3b82f6" }, { label: "Blood Pressure", color: "#8b5cf6" }, { label: "SpO2", color: "#10b981" }].map(l => (
            <div key={l.label} className="flex items-center gap-1.5">
              <div className="w-3 h-0.5 rounded" style={{ backgroundColor: l.color }} />
              <span className="text-xs text-gray-500">{l.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
