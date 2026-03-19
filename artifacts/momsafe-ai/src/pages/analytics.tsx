import { PageTransition } from "@/components/ui/page-transition";
import { generateTrendData } from "@/lib/mock-data";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";
import { Filter } from "lucide-react";

export default function Analytics() {
  const compositeData = generateTrendData(30, 100, 20).map(d => ({
    ...d,
    stressLevel: Math.round(50 + Math.random() * 30),
    sleepQuality: Math.round(60 + Math.random() * 40),
  }));

  return (
    <PageTransition>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Analytics & Trends</h1>
          <p className="text-sm text-muted-foreground">Longitudinal correlation of physiological parameters.</p>
        </div>
        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-border rounded text-xs font-medium hover:bg-gray-50 transition-colors shadow-sm">
          <Filter className="w-3.5 h-3.5" /> Filter Parameters
        </button>
      </div>

      <div className="card-clinical p-0 mb-6 overflow-hidden">
        <div className="p-4 border-b border-border flex justify-between items-center bg-gray-50">
          <h2 className="clinical-label text-sm">Multivariate Analysis: Sleep vs. Stress (30D)</h2>
          <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
            Dataset: 1.2M Points
          </div>
        </div>
        
        <div className="p-5 h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={compositeData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 10}} dy={10} minTickGap={30} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 10}} />
              <Tooltip 
                contentStyle={{ borderRadius: '4px', border: '1px solid #E2E6EA', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', fontSize: '12px', padding: '8px' }}
              />
              <Legend verticalAlign="top" height={36} iconType="plainline" wrapperStyle={{ fontSize: '12px' }} />
              <Line type="monotone" name="Stress Index" dataKey="stressLevel" stroke="#D97706" strokeWidth={1.5} dot={false} isAnimationActive={false} />
              <Line type="monotone" name="Sleep Score" dataKey="sleepQuality" stroke="#2563EB" strokeWidth={1.5} dot={false} isAnimationActive={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { title: "RHR & Sleep Correlation", text: "Resting HR reduced by 4% on average when >7h sleep is achieved.", stat: "-4.2%", trend: "positive" },
          { title: "BP Diurnal Variation", text: "Blood pressure peaks correlate with late afternoon activity.", stat: "r = 0.82", trend: "neutral" },
          { title: "Risk Trajectory", text: "Overall risk trajectory is flat. No significant deviation from baseline.", stat: "Stable", trend: "positive" }
        ].map((card, i) => (
          <div key={i} className="card-clinical p-4">
            <h3 className="clinical-label mb-2">{card.title}</h3>
            <div className={`data-value mb-2 ${card.trend === 'positive' ? 'text-green-600' : 'text-foreground'}`}>
              {card.stat}
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">{card.text}</p>
          </div>
        ))}
      </div>
    </PageTransition>
  );
}