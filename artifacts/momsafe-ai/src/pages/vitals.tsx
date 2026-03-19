import { PageTransition } from "@/components/ui/page-transition";
import { vitalsData, generateTrendData } from "@/lib/mock-data";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceArea, CartesianGrid } from "recharts";
import { Activity, Download, Filter, Info } from "lucide-react";
import { useState } from "react";

export default function Vitals() {
  const [timeRange, setTimeRange] = useState('7d');
  
  const detailedHRData = generateTrendData(24, 82, 10);
  const detailedBPData = generateTrendData(24, 115, 12);

  return (
    <PageTransition>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Vitals Intelligence</h1>
          <p className="text-muted-foreground mt-1">Deep analysis of your physiological markers.</p>
        </div>
        <div className="flex gap-3">
          <div className="flex bg-white rounded-xl p-1 border border-border shadow-sm">
            {['24h', '7d', '30d'].map(range => (
              <button 
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-all ${timeRange === range ? 'bg-primary text-white shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
              >
                {range}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-border rounded-xl text-sm font-semibold text-foreground hover:bg-gray-50 transition-colors shadow-sm">
            <Download className="w-4 h-4" /> Export
          </button>
        </div>
      </div>

      <div className="space-y-8">
        {/* Heart Rate Detailed Chart */}
        <div className="bg-white rounded-3xl p-8 premium-shadow border border-border/50">
          <div className="flex justify-between items-start mb-8">
            <div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-rose-100 text-rose-600 rounded-xl">
                  <Activity className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-display font-bold">Heart Rate</h2>
              </div>
              <p className="text-sm text-muted-foreground mt-2 max-w-md">
                AI notes a stable pattern within normal maternal range (60-100 bpm). No anomalies detected in the last {timeRange}.
              </p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-display font-bold text-foreground">{vitalsData.heartRate.current} <span className="text-lg text-muted-foreground font-medium">bpm</span></div>
              <div className="text-sm font-medium text-green-600 mt-1 bg-green-50 px-2 py-1 rounded-md inline-block">Normal Range</div>
            </div>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={detailedHRData} margin={{ top: 20, right: 20, left: -20, bottom: 0 }}>
                <CartesianGrid vertical={false} opacity={0.3} />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} dy={10} />
                <YAxis domain={[40, 120]} axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: '1px solid #E5E7EB', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                />
                <ReferenceArea y1={60} y2={100} fill="hsl(var(--success))" fillOpacity={0.05} />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="hsl(var(--accent))" 
                  strokeWidth={3} 
                  dot={{r: 4, strokeWidth: 2, fill: 'white'}}
                  activeDot={{r: 6, fill: 'hsl(var(--accent))'}}
                  isAnimationActive={true}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Blood Pressure Detailed Chart */}
        <div className="bg-white rounded-3xl p-8 premium-shadow border border-border/50">
          <div className="flex justify-between items-start mb-8">
            <div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 text-blue-600 rounded-xl">
                  <Activity className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-display font-bold">Blood Pressure</h2>
              </div>
              <p className="text-sm text-muted-foreground mt-2 max-w-md">
                Slight elevation detected 2 days ago, normalized after resting. Monitoring closely for preeclampsia signs.
              </p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-display font-bold text-foreground">{vitalsData.bloodPressure.current} <span className="text-lg text-muted-foreground font-medium">mmHg</span></div>
              <div className="text-sm font-medium text-amber-600 mt-1 bg-amber-50 px-2 py-1 rounded-md inline-block">Monitor closely</div>
            </div>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={detailedBPData} margin={{ top: 20, right: 20, left: -20, bottom: 0 }}>
                <CartesianGrid vertical={false} opacity={0.3} />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} dy={10} />
                <YAxis domain={[60, 150]} axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: '1px solid #E5E7EB', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                />
                <ReferenceArea y1={90} y2={120} fill="hsl(var(--primary))" fillOpacity={0.05} />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  name="Systolic"
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3} 
                  dot={{r: 4, fill: 'white'}}
                />
                <Line 
                  type="monotone" 
                  dataKey="value2" 
                  name="Diastolic"
                  stroke="hsl(var(--accent))" 
                  strokeWidth={3} 
                  dot={{r: 4, fill: 'white'}}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
