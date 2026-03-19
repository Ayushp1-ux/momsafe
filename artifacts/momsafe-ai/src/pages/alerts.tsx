import { useState } from "react";
import { AlertCircle, BellOff, CheckCircle2, Clock, ChevronDown, ChevronUp, X } from "lucide-react";
import { alerts as allAlerts } from "@/lib/mock-data";

const tabs = ["Active", "Acknowledged", "Resolved"] as const;
const escalation = { critical: "L3 — Immediate response required", warning: "L2 — Warning — Monitor closely", info: "L1 — Informational" };
const severityBorder: Record<string, string> = { critical: "border-l-red-500", warning: "border-l-amber-400", info: "border-l-blue-400" };
const severityBg: Record<string, string> = { critical: "bg-red-50", warning: "bg-amber-50", info: "bg-blue-50" };
const severityIcon: Record<string, string> = { critical: "text-red-500", warning: "text-amber-500", info: "text-blue-400" };

export default function Alerts() {
  const [tab, setTab] = useState<"Active" | "Acknowledged" | "Resolved">("Active");
  const [expanded, setExpanded] = useState<number | null>(null);
  const [dismissed, setDismissed] = useState<number[]>([]);

  const active = allAlerts.filter(a => !a.acknowledged && !a.resolved && !dismissed.includes(a.id));
  const acknowledged = allAlerts.filter(a => a.acknowledged);
  const resolved = allAlerts.filter(a => a.resolved);
  const shown = tab === "Active" ? active : tab === "Acknowledged" ? acknowledged : resolved;

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="page-title">Alerts & Escalation</h1>
          <p className="page-subtitle">Smart notifications ranked by clinical severity.</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span className="badge-red">{active.length} Active</span>
        </div>
      </div>

      {/* Critical banner */}
      {active.some(a => a.severity === "critical") && (
        <div className="card border border-red-200 bg-red-50 p-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-4 h-4 text-red-600" />
            </div>
            <div>
              <p className="text-sm font-bold text-red-800">Critical Alert Requires Attention</p>
              <p className="text-xs text-red-600 mt-0.5">Missed medication detected. Immediate action recommended.</p>
            </div>
            <button className="ml-auto action-btn bg-red-600 hover:bg-red-700">Respond Now</button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-4 gap-4">
        {/* Main alerts */}
        <div className="col-span-3 space-y-4">
          {/* Tabs */}
          <div className="flex gap-1 card p-1 w-fit">
            {tabs.map(t => (
              <button key={t} onClick={() => setTab(t)} className={`text-xs px-4 py-1.5 rounded-lg font-medium transition-colors ${tab === t ? "bg-blue-600 text-white" : "text-gray-500 hover:bg-gray-100"}`}>
                {t} {t === "Active" ? `(${active.length})` : t === "Acknowledged" ? `(${acknowledged.length})` : `(${resolved.length})`}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {shown.length === 0 && (
              <div className="card p-8 text-center">
                <BellOff className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                <p className="text-sm text-gray-400">No {tab.toLowerCase()} alerts</p>
              </div>
            )}
            {shown.map(a => (
              <div key={a.id} className={`card border-l-4 ${severityBorder[a.severity]} ${severityBg[a.severity]} card-hover`}>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1">
                      <AlertCircle className={`w-5 h-5 mt-0.5 flex-shrink-0 ${severityIcon[a.severity]}`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className={a.severity === "critical" ? "badge-red" : a.severity === "warning" ? "badge-yellow" : "badge-blue"}>
                            {a.severity === "critical" ? "L3 Critical" : a.severity === "warning" ? "L2 Warning" : "L1 Info"}
                          </span>
                          <span className="badge-gray">{a.category}</span>
                          <span className="flex items-center gap-1 text-xs text-gray-400"><Clock className="w-3 h-3" />{a.time}</span>
                        </div>
                        <p className="text-sm font-semibold text-gray-800">{a.title}</p>
                        <p className="text-xs text-gray-600 mt-0.5">{a.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button className="action-btn text-xs">Take Action</button>
                      <button onClick={() => setDismissed(prev => [...prev, a.id])} className="ghost-btn text-xs">Dismiss</button>
                      <button onClick={() => setExpanded(expanded === a.id ? null : a.id)} className="p-1 text-gray-400 hover:text-gray-600">
                        {expanded === a.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {expanded === a.id && (
                    <div className="mt-3 pt-3 border-t border-gray-200 space-y-2">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 rounded-xl bg-white border border-gray-200">
                          <p className="text-xs text-gray-400 mb-1">Escalation Level</p>
                          <p className="text-xs font-semibold text-gray-800">{escalation[a.severity]}</p>
                        </div>
                        <div className="p-3 rounded-xl bg-white border border-gray-200">
                          <p className="text-xs text-gray-400 mb-1">Recommended Action</p>
                          <p className="text-xs font-semibold text-gray-800">Review immediately and log response</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Escalation sidebar */}
        <div className="space-y-4">
          <div className="card p-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Escalation Rules</h3>
            <div className="space-y-3">
              {[
                { level: "L1", label: "Informational", desc: "App notification only. Logged for review.", color: "bg-blue-500" },
                { level: "L2", label: "Warning", desc: "SMS alert sent. Requires acknowledgment within 2hrs.", color: "bg-amber-400" },
                { level: "L3", label: "Critical", desc: "Immediate call to user & Emergency Contact if no response in 15m.", color: "bg-red-500" },
              ].map(e => (
                <div key={e.level} className="flex gap-2.5">
                  <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${e.color}`} />
                  <div>
                    <p className="text-xs font-semibold text-gray-700">{e.level} — {e.label}</p>
                    <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{e.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Alert Timeline</h3>
            <div className="space-y-3">
              {allAlerts.slice(0, 4).map((a, i) => (
                <div key={a.id} className="flex gap-2.5">
                  <div className="flex flex-col items-center">
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 mt-1 ${a.severity === "critical" ? "bg-red-500" : a.severity === "warning" ? "bg-amber-400" : "bg-blue-400"}`} />
                    {i < 3 && <div className="w-px h-5 bg-gray-100 mt-1" />}
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-700">{a.title}</p>
                    <p className="text-[10px] text-gray-400">{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
