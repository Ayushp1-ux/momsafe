import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";

export function AppLayout({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  
  return (
    <div className="flex min-h-screen bg-[#F9FAFB]">
      <Sidebar />
      <main className="flex-1 lg:pl-[280px] overflow-x-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-50/50 via-transparent to-transparent pointer-events-none" />
        
        <AnimatePresence mode="wait">
          <div key={location} className="w-full h-full">
            {children}
          </div>
        </AnimatePresence>
      </main>
    </div>
  );
}
