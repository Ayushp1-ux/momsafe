import { Link, useLocation } from "wouter";
import { user } from "@/lib/mock-data";
import {
  LayoutDashboard, Activity, BellRing, LineChart,
  Brain, Apple, Pill, BookHeart, TrendingUp, Settings,
  HeartPulse, LogOut, HelpCircle
} from "lucide-react";

const NAV = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Vitals", href: "/vitals", icon: Activity },
  { label: "Alerts", href: "/alerts", icon: BellRing, badge: 2 },
  { label: "Analytics", href: "/analytics", icon: LineChart },
  { label: "AI Guidance", href: "/ai-guidance", icon: Brain },
  { label: "Nutrition", href: "/nutrition", icon: Apple },
  { label: "Medication", href: "/medication", icon: Pill },
  { label: "Daily Logs", href: "/daily-logs", icon: BookHeart },
  { label: "Predictions", href: "/predictions", icon: TrendingUp },
];

export default function Sidebar() {
  const [location] = useLocation();

  return (
    <aside className="fixed left-0 top-0 h-full w-56 bg-white border-r border-[#E5E7EB] flex flex-col z-30">
      {/* Logo */}
      <div className="px-4 py-5 border-b border-[#E5E7EB]">
        <Link href="/" className="flex items-center gap-2.5 no-underline">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <HeartPulse className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900 leading-none">MomSafe AI</p>
            <p className="text-xs text-gray-400 mt-0.5">Maternal Health</p>
          </div>
        </Link>
      </div>

      {/* User card */}
      <div className="px-3 py-3 border-b border-[#E5E7EB]">
        <div className="flex items-center gap-2.5 px-2 py-2 rounded-xl bg-gray-50">
          <img src={user.avatar} alt="" className="w-8 h-8 rounded-full object-cover bg-gray-200 flex-shrink-0" onError={e => { (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Ccircle cx='16' cy='16' r='16' fill='%23ddd'/%3E%3C/svg%3E"; }} />
          <div className="min-w-0">
            <p className="text-xs font-semibold text-gray-800 truncate">{user.name}</p>
            <span className="inline-block text-[10px] font-medium bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full leading-none mt-0.5">Week {user.week}</span>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-3 overflow-y-auto space-y-0.5">
        <p className="section-label px-2 mb-2">Navigation</p>
        {NAV.map(({ label, href, icon: Icon, badge }) => {
          const active = location === href;
          return (
            <Link key={href} href={href} className="block no-underline">
              <div className={active ? "nav-item-active" : "nav-item"}>
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span className="flex-1">{label}</span>
                {badge && (
                  <span className="ml-auto text-[10px] font-bold bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center">
                    {badge}
                  </span>
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-3 py-3 border-t border-[#E5E7EB] space-y-0.5">
        <Link href="/settings" className="block no-underline">
          <div className={useLocation()[0] === "/settings" ? "nav-item-active" : "nav-item"}>
            <Settings className="w-4 h-4" />
            Settings
          </div>
        </Link>
        <div className="nav-item text-gray-400">
          <HelpCircle className="w-4 h-4" />
          Help
        </div>
        <div className="nav-item text-red-500 hover:bg-red-50 hover:text-red-600">
          <LogOut className="w-4 h-4" />
          Sign out
        </div>
      </div>
    </aside>
  );
}
