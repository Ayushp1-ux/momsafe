import { PageTransition } from "@/components/ui/page-transition";
import { mockUser } from "@/lib/mock-data";
import { User, Bell, Shield, Smartphone, ChevronRight, LogOut, CheckCircle } from "lucide-react";
import { useState } from "react";

export default function Settings() {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <PageTransition>
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-foreground">Settings & Profile</h1>
        <p className="text-muted-foreground mt-1">Manage your account, devices, and preferences.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-3xl p-6 border border-border/50 premium-shadow text-center">
            <div className="relative inline-block mb-4">
              <img src={mockUser.avatar} alt={mockUser.name} className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover mx-auto" />
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center border-2 border-white shadow-sm hover:scale-105 transition-transform">
                <User className="w-4 h-4" />
              </button>
            </div>
            <h2 className="text-xl font-bold text-foreground">{mockUser.name}</h2>
            <p className="text-sm text-muted-foreground mt-1">Week {mockUser.pregnancyWeek} • Due {mockUser.dueDate}</p>
            
            <div className="mt-6 pt-6 border-t border-gray-100 flex justify-center gap-6">
              <div className="text-center">
                <div className="text-lg font-bold text-foreground">{mockUser.bloodType}</div>
                <div className="text-xs text-muted-foreground uppercase font-semibold">Blood</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-foreground">{mockUser.age}</div>
                <div className="text-xs text-muted-foreground uppercase font-semibold">Age</div>
              </div>
            </div>
          </div>
        </div>

        {/* Settings Panels */}
        <div className="lg:col-span-3 space-y-6">
          
          <div className="bg-white rounded-3xl border border-border/50 premium-shadow overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center gap-3 bg-gray-50/50">
              <Bell className="w-5 h-5 text-gray-500" />
              <h3 className="font-bold text-lg">Notification Preferences</h3>
            </div>
            <div className="p-6 space-y-5">
              {[
                { label: "Critical AI Alerts (L3)", desc: "Immediate SMS and phone call escalations", state: true, disabled: true },
                { label: "Warning Alerts (L2)", desc: "Push notifications and in-app badges", state: true },
                { label: "Daily Insights Summary", desc: "Morning recap of your health data", state: true },
                { label: "Medication Reminders", desc: "Push notifications at scheduled times", state: true },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-foreground text-sm">{item.label}</h4>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                  <div className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${item.state ? 'bg-primary' : 'bg-gray-200'} ${item.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
                    <div className={`absolute top-1 bg-white w-4 h-4 rounded-full shadow-sm transition-all ${item.state ? 'left-6' : 'left-1'}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-border/50 premium-shadow overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center gap-3 bg-gray-50/50">
              <Smartphone className="w-5 h-5 text-gray-500" />
              <h3 className="font-bold text-lg">Connected Devices</h3>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between p-4 border border-green-200 bg-green-50/30 rounded-2xl">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-green-600">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">Apple Watch Series 9</h4>
                    <p className="text-xs text-green-600 font-medium mt-0.5 flex items-center gap-1">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" /> Syncing Live Vitals
                    </p>
                  </div>
                </div>
                <button className="text-sm font-semibold text-gray-500 hover:text-gray-900 px-3 py-1 bg-white border border-gray-200 rounded-lg shadow-sm">Manage</button>
              </div>
              
              <button className="w-full mt-4 py-3 border-2 border-dashed border-gray-200 rounded-2xl text-sm font-semibold text-gray-500 hover:border-primary/50 hover:text-primary transition-colors hover:bg-primary/5">
                + Connect New Device (Oura, Fitbit, BP Monitor)
              </button>
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-8">
            <button className="px-6 py-2.5 rounded-xl font-semibold text-muted-foreground hover:bg-gray-100 transition-colors">
              Cancel
            </button>
            <button 
              onClick={handleSave}
              className="px-8 py-2.5 rounded-xl font-bold bg-primary text-white shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex items-center gap-2"
            >
              {saved ? <><CheckCircle className="w-4 h-4" /> Saved</> : 'Save Changes'}
            </button>
          </div>

        </div>
      </div>
    </PageTransition>
  );
}
