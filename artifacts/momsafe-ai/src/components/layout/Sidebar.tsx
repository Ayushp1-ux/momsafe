import { Link, useLocation } from "wouter";
import { mockUser } from "@/lib/mock-data";
import { 
  HeartPulse, Activity, BellRing, BrainCircuit, 
  Apple, Pill, BookHeart, LineChart, Settings, 
  LogOut, HelpCircle, Menu, X
} from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/", icon: HeartPulse },
  { label: "Vitals", href: "/vitals", icon: Activity },
  { label: "Alerts", href: "/alerts", icon: BellRing, badge: 2 },
  { label: "Analytics", href: "/analytics", icon: LineChart },
  { label: "AI Guidance", href: "/ai-guidance", icon: BrainCircuit },
  { label: "Nutrition", href: "/nutrition", icon: Apple },
  { label: "Medication", href: "/medication", icon: Pill },
  { label: "Daily Logs", href: "/daily-logs", icon: BookHeart },
  { label: "Predictions", href: "/predictions", icon: LineChart },
];

export function Sidebar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const NavContent = () => (
    <>
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20">
            <HeartPulse className="text-white w-6 h-6" />
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-foreground">MomSafe AI</span>
        </div>

        <div className="flex items-center gap-4 p-4 rounded-2xl bg-secondary/50 border border-border/50 backdrop-blur-sm mb-8">
          <img src={mockUser.avatar} alt={mockUser.name} className="w-12 h-12 rounded-full border-2 border-white shadow-sm object-cover" />
          <div>
            <h3 className="font-semibold text-sm text-foreground">{mockUser.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">Week {mockUser.pregnancyWeek}</span>
            </div>
          </div>
        </div>

        <div className="space-y-1.5">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-2">Intelligence</p>
          {NAV_ITEMS.map((item) => {
            const isActive = location === item.href;
            return (
              <Link key={item.href} href={item.href} className={`
                flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 group relative
                ${isActive 
                  ? 'bg-primary/10 text-primary font-medium' 
                  : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                }
              `}>
                <div className="flex items-center gap-3">
                  <item.icon className={`w-5 h-5 ${isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'}`} />
                  <span>{item.label}</span>
                </div>
                {isActive && (
                  <motion.div 
                    layoutId="activeNav" 
                    className="absolute left-0 w-1 h-6 bg-primary rounded-r-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
                {item.badge && (
                  <span className="bg-destructive text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="mt-auto p-6 space-y-1.5 border-t border-border/50 bg-gray-50/50">
        <Link href="/settings" className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${location === '/settings' ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-secondary hover:text-foreground'}`}>
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </Link>
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-muted-foreground hover:bg-secondary hover:text-foreground">
          <HelpCircle className="w-5 h-5" />
          <span>Help & Support</span>
        </button>
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-red-500/80 hover:bg-red-50 hover:text-red-600">
          <LogOut className="w-5 h-5" />
          <span>Sign Out</span>
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Toggle */}
      <button 
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md border border-gray-100"
      >
        <Menu className="w-6 h-6 text-gray-700" />
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed top-0 left-0 h-full w-[280px] bg-white border-r border-border/50 shadow-[4px_0_24px_rgba(0,0,0,0.02)]
        flex flex-col z-50 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <button 
          onClick={() => setIsOpen(false)}
          className="lg:hidden absolute top-6 right-4 p-1 text-gray-400 hover:text-gray-700 bg-gray-100 rounded-md"
        >
          <X className="w-5 h-5" />
        </button>
        <NavContent />
      </aside>
    </>
  );
}
