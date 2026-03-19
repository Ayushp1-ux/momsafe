import { PageTransition } from "@/components/ui/page-transition";
import { alerts } from "@/lib/mock-data";
import { AlertCircle, CheckCircle2, Clock, ChevronRight, BellOff } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Alerts() {
  const [activeTab, setActiveTab] = useState<'active' | 'resolved'>('active');

  return (
    <PageTransition>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Alerts & Escalation</h1>
          <p className="text-muted-foreground mt-1">Smart notifications ranked by clinical severity.</p>
        </div>
        <div className="bg-white p-1 rounded-xl border border-border shadow-sm flex">
          <button 
            onClick={() => setActiveTab('active')}
            className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'active' ? 'bg-primary text-white shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
          >
            Active ({alerts.length})
          </button>
          <button 
            onClick={() => setActiveTab('resolved')}
            className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'resolved' ? 'bg-primary text-white shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
          >
            Resolved
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 space-y-4">
          <AnimatePresence>
            {activeTab === 'active' && alerts.map((alert, index) => (
              <motion.div 
                key={alert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white rounded-2xl p-6 border premium-shadow relative overflow-hidden ${
                  alert.severity === 'critical' ? 'border-red-200' : 
                  alert.severity === 'warning' ? 'border-amber-200' : 'border-border/50'
                }`}
              >
                {alert.severity === 'critical' && (
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-red-500 animate-pulse" />
                )}
                <div className="flex items-start gap-5">
                  <div className={`p-3 rounded-2xl shrink-0 ${
                    alert.severity === 'critical' ? 'bg-red-100 text-red-600' : 
                    alert.severity === 'warning' ? 'bg-amber-100 text-amber-600' : 
                    'bg-blue-100 text-blue-600'
                  }`}>
                    <AlertCircle className="w-6 h-6" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                             alert.severity === 'critical' ? 'bg-red-50 text-red-700' : 
                             alert.severity === 'warning' ? 'bg-amber-50 text-amber-700' : 
                             'bg-blue-50 text-blue-700'
                          }`}>
                            L{alert.severity === 'critical' ? '3' : alert.severity === 'warning' ? '2' : '1'} {alert.severity}
                          </span>
                          <span className="text-xs text-muted-foreground flex items-center"><Clock className="w-3 h-3 mr-1" /> {alert.time}</span>
                        </div>
                        <h3 className="text-lg font-bold text-foreground mt-1">{alert.title}</h3>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground mt-2 text-sm leading-relaxed max-w-2xl">
                      {alert.description}
                    </p>
                    
                    <div className="mt-5 flex items-center gap-3">
                      <button className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all ${
                         alert.severity === 'critical' ? 'bg-red-500 text-white hover:bg-red-600 shadow-md shadow-red-500/20' : 
                         'bg-primary text-white hover:bg-primary/90 shadow-md shadow-primary/20'
                      }`}>
                        Take Action
                      </button>
                      <button className="px-5 py-2 rounded-xl text-sm font-semibold text-muted-foreground bg-gray-50 hover:bg-gray-100 border border-border transition-all">
                        Dismiss
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
            
            {activeTab === 'resolved' && (
              <motion.div initial={{opacity:0}} animate={{opacity:1}} className="text-center py-20 bg-white rounded-3xl border border-border border-dashed">
                <CheckCircle2 className="w-16 h-16 text-green-400 mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-semibold text-foreground">All caught up</h3>
                <p className="text-muted-foreground mt-2">No active alerts require your attention.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-white rounded-3xl p-6 border border-border/50 premium-shadow sticky top-8">
            <h3 className="font-display font-semibold text-lg mb-4">Escalation Rules</h3>
            <div className="space-y-4">
              <div className="relative pl-6 pb-4 border-l-2 border-gray-100">
                <div className="absolute w-3 h-3 bg-blue-400 rounded-full -left-[7px] top-1" />
                <h4 className="text-sm font-bold">L1: Informational</h4>
                <p className="text-xs text-muted-foreground mt-1">App notification only. Logged for review.</p>
              </div>
              <div className="relative pl-6 pb-4 border-l-2 border-gray-100">
                <div className="absolute w-3 h-3 bg-amber-400 rounded-full -left-[7px] top-1" />
                <h4 className="text-sm font-bold">L2: Warning</h4>
                <p className="text-xs text-muted-foreground mt-1">SMS alert sent. Requires app acknowledgment within 2hrs.</p>
              </div>
              <div className="relative pl-6 border-l-2 border-transparent">
                <div className="absolute w-3 h-3 bg-red-500 rounded-full -left-[7px] top-1 animate-pulse" />
                <h4 className="text-sm font-bold">L3: Critical</h4>
                <p className="text-xs text-muted-foreground mt-1">Immediate call to user & Emergency Contact if no response in 15m.</p>
              </div>
            </div>
            
            <button className="w-full mt-6 flex justify-center items-center gap-2 py-3 rounded-xl bg-gray-50 border border-border text-sm font-semibold text-foreground hover:bg-gray-100 transition-colors">
              <BellOff className="w-4 h-4" /> Manage Preferences
            </button>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
