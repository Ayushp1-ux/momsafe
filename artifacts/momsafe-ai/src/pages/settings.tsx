import { useState } from "react";
import { User, Bell, Shield, Phone, Baby, Save, ChevronRight, Camera } from "lucide-react";
import { user } from "@/lib/mock-data";

const tabs = ["Profile", "Pregnancy", "Notifications", "Emergency Contacts", "Privacy"] as const;

function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button onClick={onToggle} className={`relative w-10 h-5 rounded-full transition-colors ${on ? "bg-blue-600" : "bg-gray-200"}`}>
      <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${on ? "translate-x-5" : ""}`} />
    </button>
  );
}

function Field({ label, value, type = "text" }: { label: string; value: string; type?: string }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-500 mb-1.5">{label}</label>
      <input type={type} defaultValue={value} className="w-full text-sm px-3 py-2 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
    </div>
  );
}

export default function Settings() {
  const [tab, setTab] = useState<"Profile" | "Pregnancy" | "Notifications" | "Emergency Contacts" | "Privacy">("Profile");
  const [notifs, setNotifs] = useState({ alerts: true, medication: true, vitals: false, weekly: true, push: true, sms: false, email: true });
  const toggleNotif = (key: keyof typeof notifs) => setNotifs(prev => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="page-title">Settings</h1>
          <p className="page-subtitle">Manage your profile, preferences, and account settings.</p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {/* Tabs sidebar */}
        <div className="space-y-1">
          {[
            { key: "Profile", icon: User },
            { key: "Pregnancy", icon: Baby },
            { key: "Notifications", icon: Bell },
            { key: "Emergency Contacts", icon: Phone },
            { key: "Privacy", icon: Shield },
          ].map(({ key, icon: Icon }) => (
            <button key={key} onClick={() => setTab(key as any)} className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium text-left transition-colors ${tab === key ? "bg-blue-50 text-blue-700" : "text-gray-600 hover:bg-gray-100"}`}>
              <Icon className="w-4 h-4 flex-shrink-0" />
              {key}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="col-span-3">
          {tab === "Profile" && (
            <div className="card p-6 space-y-5">
              <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
                <div className="relative">
                  <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center text-2xl font-bold text-gray-400">
                    {user.name.charAt(0)}
                  </div>
                  <button className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-600 rounded-lg flex items-center justify-center">
                    <Camera className="w-3 h-3 text-white" />
                  </button>
                </div>
                <div>
                  <p className="text-base font-bold text-gray-900">{user.name}</p>
                  <p className="text-sm text-gray-500">Week {user.week} · Due {user.dueDate}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Full Name" value={user.name} />
                <Field label="Age" value={String(user.age)} type="number" />
                <Field label="Blood Type" value={user.bloodType} />
                <Field label="OB/GYN Provider" value={user.obName} />
                <Field label="Hospital / Clinic" value={user.hospital} />
                <Field label="Email Address" value="sarah.jenkins@example.com" type="email" />
              </div>
              <div className="flex justify-end pt-2">
                <button className="action-btn"><Save className="w-4 h-4" /> Save Changes</button>
              </div>
            </div>
          )}

          {tab === "Pregnancy" && (
            <div className="card p-6 space-y-5">
              <h2 className="text-sm font-semibold text-gray-700">Pregnancy Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Current Week" value={String(user.week)} type="number" />
                <Field label="Due Date" value={user.dueDate} type="date" />
                <Field label="Pregnancy Type" value="Singleton" />
                <Field label="Parity (previous births)" value="0" type="number" />
                <Field label="Pre-pregnancy Weight (kg)" value="61.0" type="number" />
                <Field label="Starting BMI" value="22.4" />
                <Field label="Pre-existing Conditions" value="None" />
                <Field label="Conception Method" value="Natural" />
              </div>
              <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
                <p className="text-xs font-semibold text-blue-700 mb-1">Week {user.week} Milestone</p>
                <p className="text-xs text-blue-600 leading-relaxed">Baby is about the size of a large squash. Lungs are developing and will be almost complete by W36. Begin preparing for delivery.</p>
              </div>
              <div className="flex justify-end pt-2">
                <button className="action-btn"><Save className="w-4 h-4" /> Save Changes</button>
              </div>
            </div>
          )}

          {tab === "Notifications" && (
            <div className="card p-6 space-y-5">
              <h2 className="text-sm font-semibold text-gray-700">Notification Preferences</h2>
              <div className="space-y-1">
                <p className="section-label mb-3">Alert Types</p>
                {[
                  { key: "alerts" as const, label: "Critical Health Alerts", desc: "Immediate notifications for abnormal vitals" },
                  { key: "medication" as const, label: "Medication Reminders", desc: "Daily reminders for scheduled medications" },
                  { key: "vitals" as const, label: "Vital Check Reminders", desc: "Hourly or scheduled vital logging prompts" },
                  { key: "weekly" as const, label: "Weekly AI Summary", desc: "Weekly report of trends and recommendations" },
                ].map(n => (
                  <div key={n.key} className="flex items-center justify-between py-3 border-b border-gray-50">
                    <div>
                      <p className="text-sm font-medium text-gray-800">{n.label}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{n.desc}</p>
                    </div>
                    <Toggle on={notifs[n.key]} onToggle={() => toggleNotif(n.key)} />
                  </div>
                ))}
              </div>
              <div className="space-y-1">
                <p className="section-label mb-3">Delivery Channels</p>
                {[
                  { key: "push" as const, label: "Push Notifications" },
                  { key: "sms" as const, label: "SMS / Text Message" },
                  { key: "email" as const, label: "Email Digest" },
                ].map(c => (
                  <div key={c.key} className="flex items-center justify-between py-3 border-b border-gray-50">
                    <p className="text-sm font-medium text-gray-800">{c.label}</p>
                    <Toggle on={notifs[c.key]} onToggle={() => toggleNotif(c.key)} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "Emergency Contacts" && (
            <div className="card p-6 space-y-5">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-gray-700">Emergency Contacts</h2>
                <button className="ghost-btn text-xs"><Phone className="w-3 h-3" /> Add Contact</button>
              </div>
              {[
                { name: "James Jenkins", relation: "Spouse", phone: "+1 (555) 012-3456", primary: true },
                { name: "Dr. Priya Sharma", relation: "OB/GYN", phone: "+1 (555) 987-6543", primary: false },
                { name: "Maria Jenkins", relation: "Mother", phone: "+1 (555) 456-7890", primary: false },
              ].map(c => (
                <div key={c.name} className="flex items-center justify-between p-4 rounded-xl border border-gray-100 bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-sm font-bold text-blue-700">{c.name.charAt(0)}</div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-gray-800">{c.name}</p>
                        {c.primary && <span className="badge-blue">Primary</span>}
                      </div>
                      <p className="text-xs text-gray-400">{c.relation} · {c.phone}</p>
                    </div>
                  </div>
                  <button className="ghost-btn text-xs">Edit</button>
                </div>
              ))}
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-100">
                <p className="text-xs text-amber-700 leading-relaxed">Emergency contacts will be notified automatically for L3 Critical alerts if you do not respond within 15 minutes.</p>
              </div>
            </div>
          )}

          {tab === "Privacy" && (
            <div className="card p-6 space-y-5">
              <h2 className="text-sm font-semibold text-gray-700">Data & Privacy</h2>
              <div className="space-y-3">
                {[
                  { title: "Data Sharing with OB", desc: "Allow your OB to access your MomSafe dashboard in read-only mode.", on: true },
                  { title: "AI Training Opt-In", desc: "Allow anonymized data to improve AI model accuracy.", on: false },
                  { title: "Location Services", desc: "Used for hospital directions during emergencies.", on: true },
                ].map(p => (
                  <div key={p.title} className="flex items-start justify-between gap-4 py-3 border-b border-gray-50">
                    <div>
                      <p className="text-sm font-medium text-gray-800">{p.title}</p>
                      <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{p.desc}</p>
                    </div>
                    <Toggle on={p.on} onToggle={() => {}} />
                  </div>
                ))}
              </div>
              <div className="flex gap-2 pt-2">
                <button className="ghost-btn text-xs text-red-500 border-red-200 hover:bg-red-50">Delete Account</button>
                <button className="ghost-btn text-xs">Export My Data</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
