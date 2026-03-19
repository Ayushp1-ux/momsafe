import { PageTransition } from "@/components/ui/page-transition";
import { nutritionData } from "@/lib/mock-data";
import { RadialBarChart, RadialBar, ResponsiveContainer, BarChart, Bar, XAxis, Tooltip } from "recharts";
import { Apple, Droplets, Plus, Info } from "lucide-react";
import { motion } from "framer-motion";

export default function Nutrition() {
  const macros = [
    { name: "Protein", val: nutritionData.protein.consumed, target: nutritionData.protein.target, fill: "hsl(var(--primary))" },
    { name: "Carbs", val: nutritionData.carbs.consumed, target: nutritionData.carbs.target, fill: "hsl(var(--warning))" },
    { name: "Fat", val: nutritionData.fat.consumed, target: nutritionData.fat.target, fill: "hsl(var(--accent))" },
  ];

  const calData = [{ name: 'Calories', value: nutritionData.calories.consumed, fill: 'hsl(var(--primary))' }];

  return (
    <PageTransition>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Nutrition Intelligence</h1>
          <p className="text-muted-foreground mt-1">AI-optimized diet for maternal health.</p>
        </div>
        <button className="bg-primary text-white px-5 py-2.5 rounded-xl font-semibold shadow-md shadow-primary/20 hover:bg-primary/90 transition-all flex items-center gap-2">
          <Plus className="w-4 h-4" /> Log Meal
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calorie Ring */}
        <div className="bg-white rounded-3xl p-8 border border-border/50 premium-shadow flex flex-col items-center justify-center relative">
          <div className="absolute top-4 left-4 p-2 bg-blue-50 text-primary rounded-xl">
            <Apple className="w-5 h-5" />
          </div>
          <div className="h-[220px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart cx="50%" cy="50%" innerRadius="70%" outerRadius="100%" barSize={20} data={calData} startAngle={90} endAngle={-270}>
                <RadialBar background={{ fill: '#F3F4F6' }} dataKey="value" cornerRadius={10} />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-display font-bold text-foreground">{nutritionData.calories.consumed}</span>
              <span className="text-sm font-medium text-muted-foreground">/ {nutritionData.calories.target} kcal</span>
            </div>
          </div>
          <h3 className="font-semibold text-lg mt-4">Daily Energy</h3>
        </div>

        {/* Macros Bar Chart */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-8 border border-border/50 premium-shadow">
          <h3 className="font-display font-bold text-lg mb-6">Macronutrient Breakdown</h3>
          <div className="space-y-6">
            {macros.map(m => (
              <div key={m.name}>
                <div className="flex justify-between text-sm font-medium mb-2">
                  <span className="text-foreground">{m.name}</span>
                  <span className="text-muted-foreground">{m.val}g / {m.target}g</span>
                </div>
                <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(m.val / m.target) * 100}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: m.fill }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 p-4 bg-amber-50 border border-amber-100 rounded-2xl flex items-start gap-3">
            <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-sm text-amber-800 leading-relaxed">
              <strong>AI Insight:</strong> You are consistently slightly low on protein. Consider adding a Greek yogurt snack in the afternoon to reach your target and support fetal growth.
            </p>
          </div>
        </div>

        {/* Water Intake */}
        <div className="lg:col-span-3 bg-white rounded-3xl p-6 border border-border/50 premium-shadow flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-blue-50 text-blue-500 rounded-2xl">
              <Droplets className="w-8 h-8" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Hydration Tracker</h3>
              <p className="text-muted-foreground text-sm">Goal: {nutritionData.water.target}L daily</p>
            </div>
          </div>
          <div className="flex-1 max-w-xl mx-8">
            <div className="h-4 w-full bg-gray-100 rounded-full overflow-hidden border border-gray-200 shadow-inner">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${(nutritionData.water.consumed / nutritionData.water.target) * 100}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-blue-400 to-blue-500 rounded-full"
              />
            </div>
            <div className="flex justify-between mt-2 text-xs font-semibold text-muted-foreground">
              <span>0L</span>
              <span className="text-blue-600 font-bold">{nutritionData.water.consumed}L Logged</span>
              <span>{nutritionData.water.target}L</span>
            </div>
          </div>
          <button className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center hover:bg-blue-100 hover:scale-105 transition-all shadow-sm">
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>
    </PageTransition>
  );
}
