import { PageTransition } from "@/components/ui/page-transition";
import { vitalsData, alerts, aiRecommendations, generateTrendData } from "@/lib/mock-data";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { AlertCircle, Clock, CheckCircle2, ChevronRight, Activity, Bell } from "lucide-react";
import { Link } from "wouter";

export default function Dashboard() {
  const areaData = generateTrendData(24, 72, 15);

  return (
    <PageTransition>
      {/* Patient Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-3xl font-bold text-foreground">Sarah Kumar</h1>
            <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs font-bold uppercase tracking-wider rounded">PT-8924</span>
          </div>
          <p className="text-sm text-muted-foreground">
            32 years • Week 34 • G1P0 • Last active: Just now
          </p>
        </div>
        <div className="text-right">
          <div className="clinical-label mb-1">Current Risk</div>
          <div className="flex items-baseline justify-end gap-2">
            <span className="text-3xl font-bold tabular-nums text-green-600">18</span>
            <span className="text-sm text-muted-foreground">/ 100</span>
          </div>
        </div>
      </div>

      {/* Vitals Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-6">
        {Object.entries(vitalsData).map(([key, data]) => {
          const isWarning = data.status === 'warning';
          return (
            <div key={key} className="card-clinical p-4 flex flex-col justify-between">
              <div className="flex items-start justify-between mb-2">
                <span className="clinical-label">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                {isWarning ? (
                  <span className="px-1.5 py-0.5 bg-amber-50 text-amber-700 text-[9px] font-bold uppercase tracking-wider rounded border border-amber-200">Warning</span>
                ) : (
                  <span className="px-1.5 py-0.5 bg-green-50 text-green-700 text-[9px] font-bold uppercase tracking-wider rounded border border-green-200">Normal</span>
                )}
              </div>
              <div className="flex items-baseline gap-1 mt-1">
                <span className={`data-value ${isWarning ? 'text-amber-600' : 'text-foreground'}`}>{data.current}</span>
                <span className="text-xs text-muted-foreground font-medium">
                  {key === 'bloodPressure' ? 'mmHg' : key === 'heartRate' ? 'bpm' : key === 'spo2' ? '%' : key === 'temperature' ? '°C' : 'kg'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Main Charts */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="card-clinical p-5 flex-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="clinical-label text-sm">Vital Trends (24H)</h2>
              <div className="flex gap-1">
                {['6H', '12H', '24H'].map(t => (
                  <button key={t} className={`px-2 py-1 text-xs font-medium rounded ${t === '24H' ? 'bg-gray-100 text-foreground' : 'text-muted-foreground hover:bg-gray-50'}`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={areaData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 10}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 10}} />
                  <RechartsTooltip 
                    contentStyle={{ borderRadius: '4px', border: '1px solid #E2E6EA', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', fontSize: '12px' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#2563EB" 
                    strokeWidth={1.5}
                    fillOpacity={0.05} 
                    fill="#2563EB" 
                    activeDot={{r: 4, strokeWidth: 0}}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* AI Engine & Alerts */}
        <div className="flex flex-col gap-6">
          {/* Risk Engine */}
          <div className="card-clinical p-5">
            <h2 className="clinical-label mb-4">AI Risk Assessment</h2>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full border-4 border-green-500 flex items-center justify-center shrink-0">
                <span className="text-2xl font-bold">18</span>
              </div>
              <div>
                <div className="px-2 py-0.5 bg-green-50 text-green-700 text-[10px] font-bold uppercase tracking-wider rounded border border-green-200 inline-block mb-1">
                  Risk Level: Low
                </div>
                <div className="text-xs text-muted-foreground">
                  Confidence: 94.2% based on latest vitals
                </div>
              </div>
            </div>
            <div className="p-3 bg-gray-50 border-l-2 border-primary rounded-r text-sm text-gray-700 leading-relaxed">
              "Patient vitals stable. Mild elevation in weight trend, but within W34 expected parameters. Continue standard monitoring."
            </div>
          </div>

          {/* Active Alerts */}
          <div className="card-clinical flex-1 flex flex-col">
            <div className="p-4 border-b border-border flex justify-between items-center">
              <h2 className="clinical-label">Active Alerts ({alerts.length})</h2>
              <Link href="/alerts" className="text-xs text-primary hover:underline">View All</Link>
            </div>
            <div className="p-0 flex-1 overflow-y-auto max-h-[300px]">
              {alerts.map((alert, i) => (
                <div key={alert.id} className={`p-4 border-l-2 hover:bg-gray-50 cursor-pointer ${i !== 0 ? 'border-t border-border/50' : ''} ${
                  alert.severity === 'critical' ? 'border-l-red-500' : 
                  alert.severity === 'warning' ? 'border-l-amber-500' : 'border-l-blue-500'
                }`}>
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-sm font-semibold">{alert.title}</span>
                    <span className="text-[10px] text-muted-foreground flex items-center"><Clock className="w-3 h-3 mr-1" /> {alert.time}</span>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">{alert.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* W34 Protocol */}
      <div className="card-clinical p-0">
        <div className="p-4 border-b border-border">
          <h2 className="clinical-label">W34 Clinical Protocol</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
          {aiRecommendations.map(rec => (
            <div key={rec.id} className="p-4">
              <div className="flex justify-between items-start mb-2">
                <span className="text-sm font-bold">{rec.title}</span>
                {rec.priority === 'high' && <span className="w-2 h-2 bg-red-500 rounded-full" />}
              </div>
              <p className="text-xs text-muted-foreground mb-3">{rec.description}</p>
              <button className="text-xs font-semibold px-3 py-1.5 bg-gray-50 border border-border rounded hover:bg-gray-100 transition-colors">
                {rec.action}
              </button>
            </div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}