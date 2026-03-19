import { PageTransition } from "@/components/ui/page-transition";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { vitalsData, alerts, aiRecommendations, generateTrendData } from "@/lib/mock-data";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { Activity, ShieldAlert, ArrowUpRight, ArrowDownRight, Clock, CheckCircle2, CheckCircle, ChevronRight, BrainCircuit, BellRing } from "lucide-react";
import { Link } from "wouter";

export default function Dashboard() {
  const areaData = generateTrendData(24, 72, 15); // Simulated overall risk/health score trend

  return (
    <PageTransition>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Command Center</h1>
          <p className="text-muted-foreground mt-1">AI actively monitoring your vitals and health status.</p>
        </div>
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-border/50 text-sm font-medium">
          <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
          System Active • Last sync: Just now
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Risk MRI Card */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-8 premium-shadow border border-border/50 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
          
          <div className="flex justify-between items-start mb-6 relative z-10">
            <div>
              <h2 className="text-lg font-semibold text-muted-foreground flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-primary" />
                Current AI Risk Score
              </h2>
              <div className="flex items-baseline mt-4">
                <AnimatedNumber 
                  value={18} 
                  className="text-7xl font-display font-extrabold text-foreground tracking-tighter"
                />
                <span className="text-2xl text-muted-foreground font-medium ml-2">/ 100</span>
              </div>
            </div>
            <div className="text-right">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50 text-green-700 font-semibold text-sm border border-green-100">
                <CheckCircle2 className="w-4 h-4" /> LOW RISK
              </div>
              <p className="text-sm text-muted-foreground mt-2 font-medium">
                <ArrowDownRight className="inline w-4 h-4 text-green-500 mr-1" />
                -2 from yesterday
              </p>
            </div>
          </div>

          <div className="h-[180px] w-full mt-6 relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={areaData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" hide />
                <YAxis hide domain={['dataMin - 10', 'dataMax + 10']} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                  labelStyle={{ fontWeight: 'bold', color: '#111827' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorRisk)" 
                  animationDuration={1500}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-6 pt-6 border-t border-border/50 flex items-center justify-between relative z-10">
            <p className="text-sm text-muted-foreground font-medium">
              AI Confidence: <span className="text-foreground font-bold">94%</span> based on 1.2M data points.
            </p>
            <Link href="/analytics" className="text-primary font-semibold text-sm flex items-center hover:underline">
              Full Analysis <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>

        {/* Action Panel */}
        <div className="flex flex-col gap-6">
          <div className="bg-white rounded-3xl p-6 premium-shadow border border-border/50 flex-1">
            <h3 className="font-display font-semibold text-lg mb-4 flex items-center gap-2">
              <BrainCircuit className="w-5 h-5 text-accent" />
              Do This Now
            </h3>
            <div className="space-y-4">
              {aiRecommendations.map(rec => (
                <div key={rec.id} className="p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:bg-blue-50/50 hover:border-blue-100 transition-colors group cursor-pointer">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-semibold text-sm text-foreground">{rec.title}</h4>
                    {rec.priority === 'high' && <span className="w-2 h-2 rounded-full bg-red-500 mt-1" />}
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-3">{rec.description}</p>
                  <button className="text-xs font-semibold text-primary bg-white px-3 py-1.5 rounded-lg shadow-sm border border-gray-200 group-hover:border-primary/30 transition-all w-full text-center">
                    {rec.action}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Vitals Grid */}
      <div>
        <div className="flex justify-between items-center mb-4 mt-8">
          <h2 className="text-xl font-display font-bold text-foreground">Live Vitals</h2>
          <Link href="/vitals" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">View All Details</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {Object.entries(vitalsData).map(([key, data], i) => (
            <div key={key} className="bg-white rounded-2xl p-5 premium-shadow border border-border/50 hover:-translate-y-1 transition-transform duration-300">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </p>
              <div className="flex items-end justify-between mb-4">
                <span className="text-2xl font-display font-bold text-foreground">
                  {data.current}
                </span>
                <span className={`text-xs font-bold flex items-center ${data.trend.startsWith('+') ? 'text-rose-500' : 'text-green-500'}`}>
                  {data.trend.startsWith('+') ? <ArrowUpRight className="w-3 h-3 mr-0.5" /> : <ArrowDownRight className="w-3 h-3 mr-0.5" />}
                  {data.trend}
                </span>
              </div>
              <div className="h-12 w-full opacity-60">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data.history}>
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke={data.status === 'warning' ? "hsl(var(--warning))" : "hsl(var(--primary))"} 
                      strokeWidth={2} 
                      dot={false}
                      isAnimationActive={true}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Alerts Summary */}
      <div className="mt-8">
        <h2 className="text-xl font-display font-bold text-foreground mb-4">Recent Alerts</h2>
        <div className="bg-white rounded-3xl border border-border/50 premium-shadow overflow-hidden">
          {alerts.map((alert, i) => (
            <div key={alert.id} className={`p-5 flex items-start gap-4 hover:bg-gray-50 transition-colors cursor-pointer ${i !== alerts.length - 1 ? 'border-b border-border/50' : ''}`}>
              <div className={`p-2 rounded-xl mt-1 ${alert.severity === 'critical' ? 'bg-red-100 text-red-600' : alert.severity === 'warning' ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'}`}>
                <BellRing className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-foreground text-sm">{alert.title}</h4>
                <p className="text-sm text-muted-foreground mt-1">{alert.description}</p>
                <div className="flex items-center gap-2 mt-3">
                  <span className="text-xs text-gray-400 flex items-center font-medium">
                    <Clock className="w-3 h-3 mr-1" /> {alert.time}
                  </span>
                  <span className="text-xs font-medium px-2 py-0.5 rounded-md bg-gray-100 text-gray-600 capitalize">
                    {alert.type}
                  </span>
                </div>
              </div>
              <button className="px-4 py-2 text-sm font-semibold rounded-xl bg-white border border-gray-200 hover:bg-gray-50 shadow-sm transition-all text-foreground shrink-0">
                Review
              </button>
            </div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
