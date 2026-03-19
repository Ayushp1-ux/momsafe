import { Link, useLocation } from "wouter";
import { 
  HeartPulse, Activity, BellRing, BrainCircuit, 
  Apple, Pill, BookHeart, LineChart, Settings, 
  HelpCircle, Menu, X
} from "lucide-react";
import { useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/", icon: HeartPulse },
  { label: "Vitals", href: "/vitals", icon: Activity },
  { label: "Alerts", href: "/alerts", icon: BellRing, badge: true },
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
    <div className="flex flex-col h-full items-center py-4 bg-slate-900 text-slate-400">
      <div className="w-10 h-10 mb-6 flex items-center justify-center text-white">
        <HeartPulse className="w-6 h-6" />
      </div>

      <TooltipProvider delayDuration={0}>
        <div className="flex-1 flex flex-col gap-2 w-full px-2">
          {NAV_ITEMS.map((item) => {
            const isActive = location === item.href;
            return (
              <Tooltip key={item.href}>
                <TooltipTrigger asChild>
                  <Link href={item.href} className={`
                    w-10 h-10 flex items-center justify-center rounded-lg transition-colors relative mx-auto
                    ${isActive 
                      ? 'bg-white/10 text-white' 
                      : 'hover:bg-white/5 hover:text-white'
                    }
                  `}>
                    <item.icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
                    {item.badge && (
                      <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-slate-900" />
                    )}
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" className="border-slate-800 bg-slate-800 text-white text-xs ml-2">
                  {item.label}
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>

        <div className="flex flex-col gap-2 w-full px-2 mt-auto">
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="w-10 h-10 flex items-center justify-center rounded-lg transition-colors hover:bg-white/5 hover:text-white mx-auto">
                <HelpCircle className="w-5 h-5" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right" className="border-slate-800 bg-slate-800 text-white text-xs ml-2">
              Support
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href="/settings" className={`
                w-10 h-10 flex items-center justify-center rounded-lg transition-colors mx-auto
                ${location === '/settings' ? 'bg-white/10 text-white' : 'hover:bg-white/5 hover:text-white'}
              `}>
                <Settings className="w-5 h-5" />
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right" className="border-slate-800 bg-slate-800 text-white text-xs ml-2">
              Settings
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </div>
  );

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed top-3 left-3 z-50 p-2 bg-white rounded border shadow-sm"
      >
        <Menu className="w-5 h-5 text-gray-700" />
      </button>

      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={`
        fixed top-0 left-0 h-full w-14 bg-slate-900 shadow-xl
        flex flex-col z-50 transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <NavContent />
      </aside>
    </>
  );
}