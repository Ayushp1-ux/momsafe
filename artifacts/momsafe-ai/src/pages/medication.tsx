import { PageTransition } from "@/components/ui/page-transition";
import { medications } from "@/lib/mock-data";
import { Pill, Check, Clock, PlusCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function Medication() {
  return (
    <PageTransition>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Medication Engine</h1>
          <p className="text-muted-foreground mt-1">Smart scheduling and adherence tracking.</p>
        </div>
        <button className="bg-white border border-border text-foreground px-5 py-2.5 rounded-xl font-semibold shadow-sm hover:bg-gray-50 transition-all flex items-center gap-2">
          <PlusCircle className="w-4 h-4" /> Add Med
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Timeline View */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-3xl p-8 border border-border/50 premium-shadow">
            <h2 className="font-display font-bold text-xl mb-8">Today's Schedule</h2>
            
            <div className="space-y-6">
              {medications.map((med, i) => (
                <motion.div 
                  key={med.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`flex items-stretch gap-6 p-4 rounded-2xl border transition-all ${med.taken ? 'bg-gray-50/50 border-gray-100' : 'bg-white border-border hover:shadow-md'}`}
                >
                  <div className="flex flex-col items-center justify-center shrink-0 w-16">
                    <span className="text-sm font-bold text-foreground">{med.time.split(' ')[0]}</span>
                    <span className="text-xs font-semibold text-muted-foreground">{med.time.split(' ')[1]}</span>
                  </div>
                  
                  <div className="w-px bg-gray-200 relative">
                    <div className={`absolute top-1/2 -translate-y-1/2 -left-1.5 w-3 h-3 rounded-full ${med.taken ? 'bg-green-500' : 'bg-primary border-2 border-white'}`} />
                  </div>
                  
                  <div className="flex-1 flex justify-between items-center">
                    <div>
                      <h3 className={`text-lg font-bold ${med.taken ? 'text-muted-foreground line-through decoration-gray-300' : 'text-foreground'}`}>{med.name}</h3>
                      <p className="text-sm text-muted-foreground font-medium mt-1">{med.dosage} • {med.type}</p>
                    </div>
                    
                    <button className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                      med.taken 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-primary text-white shadow-lg shadow-primary/20 hover:scale-105'
                    }`}>
                      {med.taken ? <Check className="w-5 h-5" /> : <Pill className="w-5 h-5" />}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Adherence Stats */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-border/50 premium-shadow text-center">
            <h3 className="font-display font-semibold text-lg mb-6">Adherence Score</h3>
            <div className="relative w-40 h-40 mx-auto">
              <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                <circle cx="50" cy="50" r="40" stroke="#F3F4F6" strokeWidth="8" fill="none" />
                <motion.circle 
                  cx="50" cy="50" r="40" 
                  stroke="hsl(var(--success))" 
                  strokeWidth="8" 
                  fill="none" 
                  strokeLinecap="round"
                  strokeDasharray="251.2"
                  initial={{ strokeDashoffset: 251.2 }}
                  animate={{ strokeDashoffset: 251.2 - (251.2 * 0.94) }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-display font-bold text-foreground">94%</span>
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">30 Days</span>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 rounded-3xl p-6 border border-amber-100 premium-shadow">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-5 h-5 text-amber-600" />
              <h3 className="font-bold text-amber-900">Upcoming Refills</h3>
            </div>
            <p className="text-sm text-amber-800 leading-relaxed mb-4">
              Your Iron Supplement prescription has 5 days remaining.
            </p>
            <button className="w-full bg-amber-200 text-amber-800 py-2 rounded-xl font-semibold text-sm hover:bg-amber-300 transition-colors">
              Request Refill Now
            </button>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
