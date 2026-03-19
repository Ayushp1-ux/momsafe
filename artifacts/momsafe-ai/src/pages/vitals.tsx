import { PageTransition } from "@/components/ui/page-transition";
import { vitalsData, generateTrendData } from "@/lib/mock-data";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, ReferenceArea } from "recharts";
import { Download, Filter, FileText } from "lucide-react";
import { useState } from "react";

export default function Vitals() {
  const [timeRange, setTimeRange] = useState('7D');
  
  const detailedHRData = generateTrendData(24, 82, 10);
  const detailedBPData = generateTrendData(24, 115, 12);

  return (
    <PageTransition>
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Vitals Intelligence</h1>
          <p className="text-sm text-muted-foreground">Historical physiological markers and threshold analysis.</p>
        </div>
        <div className="flex gap-2">
          <div className="flex bg-white rounded border border-border overflow-hidden">
            {['24H', '7D', '30D', 'ALL'].map(range => (
              <button 
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1.5 text-xs font-medium transition-colors border-r border-border last:border-0
                  ${timeRange === range ? 'bg-gray-100 text-foreground' : 'text-muted-foreground hover:bg-gray-50'}`}
              >
                {range}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-border rounded text-xs font-semibold text-foreground hover:bg-gray-50 transition-colors">
            <Filter className="w-3.5 h-3.5" /> Filter
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-white border border-primary rounded text-xs font-semibold hover:bg-primary/90 transition-colors">
            <Download className="w-3.5 h-3.5" /> Export CSV
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Heart Rate Detailed Chart */}
        <div className="card-clinical p-0 overflow-hidden">
          <div className="p-5 border-b border-border flex flex-wrap justify-between items-start gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-lg font-bold">Heart Rate (BPM)</h2>
                <span className="px-1.5 py-0.5 bg-green-50 text-green-700 text-[10px] font-bold uppercase tracking-wider rounded border border-green-200">Normal</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Stable pattern within maternal range (60-100 bpm). No anomalies in {timeRange}.
              </p>
            </div>
            <div className="text-right">
              <div className="data-value">{vitalsData.heartRate.current}</div>
              <div className="clinical-label mt-1">Current Average</div>
            </div>
          </div>
          
          <div className="p-5">
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={detailedHRData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 10}} dy={10} />
                  <YAxis domain={[40, 120]} axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 10}} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '4px', border: '1px solid #E2E6EA', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', fontSize: '12px', padding: '8px' }}
                  />
                  <ReferenceArea y1={60} y2={100} fill="#059669" fillOpacity={0.05} />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#2563EB" 
                    strokeWidth={1.5} 
                    dot={false}
                    activeDot={{r: 4, strokeWidth: 0, fill: '#2563EB'}}
                    isAnimationActive={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Blood Pressure Detailed Chart */}
        <div className="card-clinical p-0 overflow-hidden">
          <div className="p-5 border-b border-border flex flex-wrap justify-between items-start gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-lg font-bold">Blood Pressure (mmHg)</h2>
                <span className="px-1.5 py-0.5 bg-amber-50 text-amber-700 text-[10px] font-bold uppercase tracking-wider rounded border border-amber-200">Monitor</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Slight elevation detected 2 days ago, normalized after resting.
              </p>
            </div>
            <div className="text-right">
              <div className="data-value">{vitalsData.bloodPressure.current}</div>
              <div className="clinical-label mt-1">Current Reading</div>
            </div>
          </div>
          
          <div className="p-5">
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={detailedBPData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 10}} dy={10} />
                  <YAxis domain={[60, 150]} axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 10}} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '4px', border: '1px solid #E2E6EA', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', fontSize: '12px', padding: '8px' }}
                  />
                  <ReferenceArea y1={90} y2={120} fill="#2563EB" fillOpacity={0.05} />
                  <Line 
                    type="step" 
                    dataKey="value" 
                    name="Systolic"
                    stroke="#1E293B" 
                    strokeWidth={1.5} 
                    dot={{r: 2, fill: '#1E293B', strokeWidth: 0}}
                    activeDot={{r: 4}}
                    isAnimationActive={false}
                  />
                  <Line 
                    type="step" 
                    dataKey="value2" 
                    name="Diastolic"
                    stroke="#64748B" 
                    strokeWidth={1.5} 
                    dot={{r: 2, fill: '#64748B', strokeWidth: 0}}
                    activeDot={{r: 4}}
                    isAnimationActive={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}