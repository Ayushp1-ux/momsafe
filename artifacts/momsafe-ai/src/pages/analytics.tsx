import { PageTransition } from "@/components/ui/page-transition";
import { generateTrendData } from "@/lib/mock-data";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";
import { BrainCircuit, TrendingUp, Filter } from "lucide-react";

export default function Analytics() {
  const compositeData = generateTrendData(30, 100, 20).map(d => ({
    ...d,
    stressLevel: Math.round(50 + Math.random() * 30),
    sleepQuality: Math.round(60 + Math.random() * 40),
  }));

  return (
    <PageTransition>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Analytics & Intelligence</h1>
          <p className="text-muted-foreground mt-1">Correlations and deep insights across all health data.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-border rounded-xl text-sm font-semibold text-foreground hover:bg-gray-50 transition-colors shadow-sm">
          <Filter className="w-4 h-4" /> Filter Metrics
        </button>
      </div>

      {/* Main Correlation Chart */}
      <div className="bg-white rounded-3xl p-8 premium-shadow border border-border/50 mb-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl font-display font-bold">Vitals Correlation Engine</h2>
            <p className="text-sm text-muted-foreground mt-1">Overlapping Sleep Quality vs Stress Levels over 30 days</p>
          </div>
          <div className="p-2 bg-primary/10 rounded-xl">
            <BrainCircuit className="w-6 h-6 text-primary" />
          </div>
        </div>
        
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={compositeData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorStress" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorSleep" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} opacity={0.3} />
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} dy={10} minTickGap={30} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: '1px solid #E5E7EB', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
              />
              <Legend verticalAlign="top" height={36} iconType="circle" />
              <Area type="monotone" name="Stress Level" dataKey="stressLevel" stroke="hsl(var(--accent))" strokeWidth={3} fillOpacity={1} fill="url(#colorStress)" />
              <Area type="monotone" name="Sleep Quality" dataKey="sleepQuality" stroke="hsl(var(--primary))" strokeWidth={3} fillOpacity={1} fill="url(#colorSleep)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: "Weekly Trend", text: "Resting HR reduced by 4% on average when >7h sleep is achieved.", stat: "-4%", trend: "positive" },
          { title: "AI Discovery", text: "Blood pressure peaks correlate strongly with late afternoon activities.", stat: "High Correlation", trend: "neutral" },
          { title: "Health Trajectory", text: "Overall risk trajectory is stable. Continue current nutrition plan.", stat: "Stable", trend: "positive" }
        ].map((card, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-border/50 premium-shadow">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-semibold text-foreground">{card.title}</h3>
              <TrendingUp className={`w-5 h-5 ${card.trend === 'positive' ? 'text-green-500' : 'text-amber-500'}`} />
            </div>
            <div className="text-2xl font-bold text-foreground mb-2 font-display">{card.stat}</div>
            <p className="text-sm text-muted-foreground leading-relaxed">{card.text}</p>
          </div>
        ))}
      </div>
    </PageTransition>
  );
}
