import { PageTransition } from "@/components/ui/page-transition";
import { alerts } from "@/lib/mock-data";
import { AlertTriangle, Clock, CheckCircle, Search, Filter } from "lucide-react";
import { useState } from "react";

export default function Alerts() {
  const [activeTab, setActiveTab] = useState<'active' | 'resolved'>('active');

  return (
    <PageTransition>
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Alerts & Escalations</h1>
          <p className="text-sm text-muted-foreground">Smart notifications ranked by clinical severity.</p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <div className="flex bg-white rounded border border-border overflow-hidden w-full md:w-auto">
            <button 
              onClick={() => setActiveTab('active')}
              className={`flex-1 md:flex-none px-4 py-1.5 text-xs font-medium transition-colors border-r border-border
                ${activeTab === 'active' ? 'bg-gray-100 text-foreground' : 'text-muted-foreground hover:bg-gray-50'}`}
            >
              Active ({alerts.length})
            </button>
            <button 
              onClick={() => setActiveTab('resolved')}
              className={`flex-1 md:flex-none px-4 py-1.5 text-xs font-medium transition-colors
                ${activeTab === 'resolved' ? 'bg-gray-100 text-foreground' : 'text-muted-foreground hover:bg-gray-50'}`}
            >
              Resolved
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <div className="card-clinical flex flex-col overflow-hidden">
            <div className="p-3 border-b border-border bg-gray-50 flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Search alerts..." 
                  className="w-full h-8 pl-8 pr-3 text-xs bg-white border border-border rounded focus:border-primary focus:outline-none"
                />
              </div>
              <button className="px-3 h-8 bg-white border border-border rounded text-xs font-medium text-foreground hover:bg-gray-50 flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5" /> Filter
              </button>
            </div>
            
            <div className="flex-1">
              {activeTab === 'active' && alerts.map((alert, index) => (
                <div 
                  key={alert.id}
                  className={`p-4 border-b border-border last:border-b-0 hover:bg-gray-50/50 transition-colors flex gap-4 ${
                    alert.severity === 'critical' ? 'border-l-2 border-l-red-500' : 
                    alert.severity === 'warning' ? 'border-l-2 border-l-amber-500' : 
                    'border-l-2 border-l-blue-500'
                  }`}
                >
                  <div className="mt-0.5">
                    {alert.severity === 'critical' && <AlertTriangle className="w-4 h-4 text-red-500" />}
                    {alert.severity === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-500" />}
                    {alert.severity === 'info' && <Clock className="w-4 h-4 text-blue-500" />}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-foreground">{alert.title}</h3>
                        <span className={`px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded border ${
                           alert.severity === 'critical' ? 'bg-red-50 text-red-700 border-red-200' : 
                           alert.severity === 'warning' ? 'bg-amber-50 text-amber-700 border-amber-200' : 
                           'bg-blue-50 text-blue-700 border-blue-200'
                        }`}>
                          {alert.severity}
                        </span>
                      </div>
                      <span className="text-[10px] text-muted-foreground flex items-center"><Clock className="w-3 h-3 mr-1" /> {alert.time}</span>
                    </div>
                    
                    <p className="text-xs text-muted-foreground mb-3 max-w-2xl">
                      {alert.description}
                    </p>
                    
                    <div className="flex items-center gap-2">
                      <button className={`px-3 py-1.5 rounded text-xs font-semibold transition-colors ${
                         alert.severity === 'critical' ? 'bg-red-600 text-white hover:bg-red-700' : 
                         'bg-primary text-white hover:bg-primary/90'
                      }`}>
                        Review Data
                      </button>
                      <button className="px-3 py-1.5 rounded text-xs font-medium text-foreground bg-white border border-border hover:bg-gray-50 transition-colors">
                        Acknowledge
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              
              {activeTab === 'resolved' && (
                <div className="text-center py-16">
                  <CheckCircle className="w-8 h-8 text-gray-300 mx-auto mb-3" />
                  <h3 className="text-sm font-semibold text-foreground">No active alerts</h3>
                  <p className="text-xs text-muted-foreground mt-1">All escalations have been resolved.</p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <div className="card-clinical p-4 sticky top-20">
            <h3 className="clinical-label mb-4">Escalation Protocol</h3>
            <div className="space-y-4">
              <div className="relative pl-4 border-l border-border">
                <div className="absolute w-2 h-2 bg-blue-500 rounded-full -left-[4.5px] top-1" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">L1: Informational</h4>
                <p className="text-[10px] text-muted-foreground mt-0.5">Logged for review. No immediate action.</p>
              </div>
              <div className="relative pl-4 border-l border-border">
                <div className="absolute w-2 h-2 bg-amber-500 rounded-full -left-[4.5px] top-1" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">L2: Warning</h4>
                <p className="text-[10px] text-muted-foreground mt-0.5">Requires acknowledgment within 2hrs.</p>
              </div>
              <div className="relative pl-4 border-l border-transparent">
                <div className="absolute w-2 h-2 bg-red-500 rounded-full -left-[4.5px] top-1" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">L3: Critical</h4>
                <p className="text-[10px] text-muted-foreground mt-0.5">Immediate escalation to physician.</p>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-border">
              <button className="w-full py-2 bg-white border border-border rounded text-xs font-medium hover:bg-gray-50 transition-colors">
                Configure Routing
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}