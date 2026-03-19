import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Search, Bell, Moon, User } from "lucide-react";
import { mockUser } from "@/lib/mock-data";

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 md:pl-14 flex flex-col min-h-screen">
        <header className="h-14 bg-white border-b border-border flex items-center justify-between px-4 sticky top-0 z-30">
          <div className="flex items-center flex-1 ml-10 md:ml-0">
            <div className="relative w-full max-w-md hidden sm:block">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search clinical data, triage logs, or patient reports..." 
                className="w-full h-8 pl-9 pr-3 text-sm bg-gray-50 border border-transparent rounded-md focus:border-border focus:bg-white focus:outline-none transition-colors"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-sm font-medium">
            <div className="hidden lg:flex items-center gap-1.5 px-2 py-1 bg-green-50 text-green-700 rounded border border-green-100">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] tracking-wider uppercase">Systems Nominal</span>
            </div>
            
            <div className="hidden sm:flex items-center text-xs text-muted-foreground hover:text-foreground cursor-pointer">
              EN
            </div>
            
            <div className="h-4 w-px bg-border hidden sm:block" />
            
            <button className="text-muted-foreground hover:text-foreground relative">
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border border-white" />
            </button>
            
            <button className="text-muted-foreground hover:text-foreground hidden sm:block">
              <Moon className="w-4 h-4" />
            </button>
            
            <div className="h-4 w-px bg-border" />
            
            <button className="flex items-center gap-2">
              <img src={mockUser.avatar} alt="User" className="w-7 h-7 rounded-full bg-gray-200 border border-border object-cover" />
            </button>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6 lg:p-8 w-full max-w-[1600px] mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}