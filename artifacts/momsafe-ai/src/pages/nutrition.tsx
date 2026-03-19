import { PageTransition } from "@/components/ui/page-transition";
import { nutritionData } from "@/lib/mock-data";
import { BarChart, Bar, XAxis, ResponsiveContainer, CartesianGrid, Tooltip } from "recharts";
import { Plus } from "lucide-react";

export default function Nutrition() {
  const macros = [
    { name: "Protein", val: nutritionData.protein.consumed, target: nutritionData.protein.target, fill: "#2563EB" },
    { name: "Carbs", val: nutritionData.carbs.consumed, target: nutritionData.carbs.target, fill: "#D97706" },
    { name: "Fat", val: nutritionData.fat.consumed, target: nutritionData.fat.target, fill: "#059669" },
  ];

  return (
    <PageTransition>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Nutritional Intake</h1>
          <p className="text-sm text-muted-foreground">Macronutrient tracking against clinical targets.</p>
        </div>
        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-white border border-primary rounded text-xs font-bold hover:bg-primary/90 transition-colors">
          <Plus className="w-3.5 h-3.5" /> Log Entry
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Caloric Summary */}
        <div className="card-clinical p-5 flex flex-col justify-center items-center text-center">
          <div className="clinical-label mb-2">Energy Balance</div>
          <div className="flex items-baseline gap-1 mb-2">
            <span className="text-4xl font-bold tabular-nums tracking-tight text-foreground">{nutritionData.calories.consumed}</span>
            <span className="text-sm text-muted-foreground font-medium">/ {nutritionData.calories.target} kcal</span>
          </div>
          <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden mt-4">
            <div 
              className="bg-primary h-full" 
              style={{ width: `${(nutritionData.calories.consumed / nutritionData.calories.target) * 100}%` }}
            />
          </div>
        </div>

        {/* Macros Breakdown */}
        <div className="lg:col-span-2 card-clinical p-5">
          <h3 className="clinical-label mb-6">Macronutrient Distribution</h3>
          <div className="space-y-5">
            {macros.map(m => (
              <div key={m.name}>
                <div className="flex justify-between text-xs font-bold mb-1.5 uppercase tracking-wide">
                  <span className="text-foreground">{m.name}</span>
                  <span className="text-muted-foreground">{m.val}g / {m.target}g</span>
                </div>
                <div className="h-1.5 w-full bg-gray-100 overflow-hidden">
                  <div 
                    className="h-full"
                    style={{ width: `${(m.val / m.target) * 100}%`, backgroundColor: m.fill }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fluid Intake */}
        <div className="lg:col-span-3 card-clinical p-5 flex items-center justify-between">
          <div>
            <h3 className="clinical-label mb-1">Hydration Volume</h3>
            <p className="text-xs text-muted-foreground">Target: {nutritionData.water.target}L</p>
          </div>
          <div className="flex-1 max-w-xl mx-8 relative">
            <div className="h-2 w-full bg-gray-100 overflow-hidden">
              <div 
                className="h-full bg-blue-500"
                style={{ width: `${(nutritionData.water.consumed / nutritionData.water.target) * 100}%` }}
              />
            </div>
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-blue-600">
              {nutritionData.water.consumed}L Logged
            </div>
          </div>
          <button className="w-8 h-8 rounded bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center hover:bg-blue-100 transition-colors">
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </PageTransition>
  );
}