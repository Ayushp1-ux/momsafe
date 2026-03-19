import { PageTransition } from "@/components/ui/page-transition";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, ReferenceLine } from "recharts";
import { BrainCircuit, SlidersHorizontal, AlertTriangle, TrendingUp } from "lucide-react";
import { format, addDays } from "date-fns";

export default function Predictions() {
  // Generate historical data and predicted data
  const baseVal = 115;
  const history = Array.from({length: 14}).map((_, i) => ({
    date: format(addDays(new Date(), i - 14), 'MMM dd'),
    value: baseVal + (Math.random() * 8 - 4),
    isPrediction: false
  }));
  
  const future = Array.from({length: 7}).map((_, i) => ({
    date: format(addDays(new Date(), i + 1), 'MMM dd'),
    value: baseVal + (i * 1.5) + (Math.random() * 4 - 2), // Trending up slightly
    isPrediction: true
  }));
  
  const combinedData = [...history, ...future];

  return (
    <PageTransition>
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-foreground">AI Predictions Engine</h1>
        <p className="text-muted-foreground mt-1">Forecasting future health trajectories based on current data models.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Graph */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-8 border border-border/50 premium-shadow">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-display font-bold">Blood Pressure 7-Day Forecast</h2>
              <p className="text-sm text-muted-foreground">Historical vs. AI Projected Trend</p>
            </div>
            <div className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full uppercase tracking-wide">
              92% Confidence
            </div>
          </div>
          
          <div className="h-[350px] w-full mt-8">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={combinedData} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
                <CartesianGrid vertical={false} opacity={0.3} />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} dy={10} minTickGap={20} />
                <YAxis domain={[90, 140]} axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: '1px solid #E5E7EB', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                  labelStyle={{ fontWeight: 'bold' }}
                />
                
                <ReferenceLine x={history[history.length-1].date} stroke="hsl(var(--muted-foreground))" strokeDasharray="3 3" label={{ position: 'top', value: 'TODAY', fill: 'hsl(var(--muted-foreground))', fontSize: 10, fontWeight: 'bold' }} />
                
                {/* History Line */}
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="hsl(var(--foreground))" 
                  strokeWidth={3} 
                  dot={{r: 0}}
                  activeDot={{r: 6}}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center gap-6 mt-4 text-sm font-medium text-muted-foreground">
            <div className="flex items-center gap-2"><div className="w-4 h-1 bg-foreground rounded-full"></div> Historical Data</div>
            <div className="flex items-center gap-2"><div className="w-4 h-1 border-t-2 border-dashed border-foreground"></div> AI Projection</div>
          </div>
        </div>

        {/* Narrative Panel */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-6 border border-indigo-100 premium-shadow">
            <h3 className="font-display font-bold text-lg text-indigo-950 mb-4 flex items-center gap-2">
              <BrainCircuit className="w-5 h-5 text-indigo-600" />
              What May Happen Next
            </h3>
            <p className="text-sm text-indigo-900/80 leading-relaxed mb-4">
              Our models project a <strong className="text-indigo-950">slight upward trend in systolic blood pressure</strong> over the next 7 days, likely reaching 122mmHg. This is a normal physiological response for Week 32, but requires attention.
            </p>
            <div className="bg-white/60 p-4 rounded-xl backdrop-blur-sm">
              <h4 className="text-xs font-bold text-indigo-900 uppercase tracking-wider mb-2">Recommended Actions</h4>
              <ul className="space-y-2 text-sm text-indigo-800">
                <li className="flex gap-2"><span className="text-indigo-500">•</span> Reduce sodium intake starting today.</li>
                <li className="flex gap-2"><span className="text-indigo-500">•</span> Add 15 mins of daily meditation.</li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-border/50 premium-shadow">
            <h3 className="font-display font-bold text-lg mb-4 flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5 text-primary" />
              Scenario Simulator
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm font-medium mb-2">
                  <span>If Sleep Drops to &lt;5h</span>
                  <span className="text-red-500 font-bold">+18% Risk</span>
                </div>
                <input type="range" className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-not-allowed opacity-50" disabled value="70" />
              </div>
              <div>
                <div className="flex justify-between text-sm font-medium mb-2">
                  <span>If Hydration hits 2.5L</span>
                  <span className="text-green-500 font-bold">-12% Risk</span>
                </div>
                <input type="range" className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-not-allowed opacity-50" disabled value="30" />
              </div>
            </div>
            <button className="w-full mt-6 py-2 bg-gray-50 border border-border rounded-xl text-sm font-semibold hover:bg-gray-100 transition-colors">
              Unlock Advanced Simulator
            </button>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
