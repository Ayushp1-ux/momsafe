# MomSafe AI — Intelligent Maternal Health Companion

<p align="center">
  <img src="https://img.shields.io/badge/React-18-blue?logo=react" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-5-green?logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/Supabase-PostgreSQL-orange?logo=supabase" alt="Supabase">
  <img src="https://img.shields.io/badge/Tailwind-3.4-purple?logo=tailwindcss" alt="Tailwind">
</p>

MomSafe AI is a comprehensive, AI-powered maternal health platform designed to track vitals, nutrition, medications, and overall wellness during pregnancy. It features an intelligent risk assessment engine, real-time health monitoring, and a premium glassmorphism UI.

---

## 🚀 Features

### 📊 Dashboard
- **Health Risk Score**: Real-time calculation based on vitals, sleep, hydration, and symptoms.
- **Live Vitals Cards**: Heart rate, blood pressure, SpO2, temperature, and weight tracking.
- **Activity Feed**: Unified timeline of all health events (vitals, meals, water, sleep, mood).
- **AI-Powered Guidance**: Contextual health advice based on current readings.

### 💉 Vitals Intelligence
- **Historical Charts**: Interactive trend visualization for up to 30 days.
- **Abnormal Dot Detection**: Visual indicators for readings outside thresholds.
- **AI Analysis**: Rule-based interpretation of vital signs with actionable feedback.
- **CSV Export**: Download complete health records.

### 🍽️ Nutrition Tracker
- **Meal Logging**: Descriptive, multi-turn AI-assisted meal analysis.
- **Macro Breakdown**: Precise calorie, protein, carbs, fat, and fiber tracking.
- **Daily Goals**: Customizable targets with progress visualization.
- **AI Insights**: Food suggestions based on daily nutritional gaps.

### 💊 Medication Manager
- **Daily Schedule**: Time-based medication reminders.
- **Adherence Tracking**: Visual compliance percentage.
- **History Log**: Weekly/monthly compliance overview.

### 😴 Sleep & Wellness
- **Sleep Quality Tracking**: Hours and quality rating.
- **Mood Logging**: Emotional well-being monitoring.
- **Hydration Tracking**: Daily water intake with goal setting.

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18, TypeScript, Vite |
| **Styling** | Tailwind CSS, Framer Motion |
| **Backend** | Supabase (PostgreSQL, Edge Functions, Realtime) |
| **Charts** | Recharts |
| **Icons** | Lucide React |
| **State** | React Hooks, Context API |

---

## 📁 Project Structure

```
momsafe-ai/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AppLayout.tsx       # Main app shell
│   │   │   └── Sidebar.tsx          # Navigation sidebar
│   │   ├── ui/                      # Radix UI primitives
│   │   └── vitals/
│   │       └── ManualVitalsInput.tsx # Vitals logging modal
│   ├── lib/
│   │   ├── AuthContext.tsx          # Authentication context
│   │   ├── supabase.ts              # Supabase client
│   │   ├── alerts.ts                # Alert generation logic
│   │   └── ai/
│   │       └── riskEngine.ts        # Risk calculation engine
│   ├── pages/
│   │   ├── dashboard.tsx            # Main health dashboard
│   │   ├── vitals.tsx               # Vitals intelligence page
│   │   ├── nutrition.tsx             # Nutrition tracker
│   │   ├── medication.tsx           # Medication manager
│   │   └── analytics.tsx            # Health analytics
│   └── hooks/
│       └── use-toast.ts             # Toast notifications
└── supabase/
    └── functions/                    # Edge functions
```

---

## 🔑 Core Code Snippets

### 1. Risk Engine Calculation
Located in `src/lib/ai/riskEngine.ts`:

```typescript
interface RiskHealthData {
  heart_rate?: number;
  bp_systolic?: number;
  bp_diastolic?: number;
  spo2?: number;
  temperature?: number;
  sleep_hours?: number;
  water_intake?: number;
  water_goal?: number;
  symptoms_count?: number;
  gestational_week?: number;
}

export function calculateRiskScore(data: RiskHealthData): RiskResult {
  let risk = 0;
  const breakdown: Record<string, number> = {};

  // BLOOD PRESSURE
  if (data.bp_systolic !== undefined) {
    if (data.bp_systolic >= 160) {
      risk += 25; // severe
      breakdown.blood_pressure = 25;
    } else if (data.bp_systolic >= 140) {
      risk += 15; // high
      breakdown.blood_pressure = 15;
    } else if (data.bp_systolic >= 130) {
      risk += 5; // mild
      breakdown.blood_pressure = 5;
    }
  }

  // HEART RATE
  if (data.heart_rate !== undefined) {
    if (data.heart_rate >= 120) {
      risk += 20; // severe
      breakdown.heart_rate = 20;
    } else if (data.heart_rate >= 100) {
      risk += 10; // elevated
      breakdown.heart_rate = 10;
    }
  }

  return { score: Math.min(risk, 100), level: getRiskLevel(risk), breakdown };
}
```

### 2. Vitals Selection Logic (Latest Valid Row)
Located in `src/pages/dashboard.tsx`:

```typescript
const latestVitals = (last2Vitals || [])
  .filter(v =>
    v.heart_rate !== null &&
    v.systolic_bp !== null &&
    v.diastolic_bp !== null
  )
  .sort((a, b) => new Date(b.recorded_at).getTime() - new Date(a.recorded_at).getTime())[0] || null;
```

### 3. Manual Vitals Input Component
Located in `src/components/vitals/ManualVitalsInput.tsx`:

```typescript
interface ManualVitalsInputProps {
  onSuccess?: () => void;
}

export function ManualVitalsInput({ onSuccess }: ManualVitalsInputProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<Step>("selection");
  const [selectedVital, setSelectedVital] = useState<VitalType | null>(null);
  const [lastVitals, setLastVitals] = useState<any>(null);

  const fetchLastVitals = useCallback(async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from("vitals")
      .select("*")
      .eq("user_id", user.id)
      .order("recorded_at", { ascending: false })
      .limit(10);

    if (!error && data) {
      const lastValid = (data || [])
        .filter(v =>
          v.heart_rate !== null &&
          v.systolic_bp !== null &&
          v.diastolic_bp !== null
        )
        .sort((a, b) => new Date(b.recorded_at).getTime() - new Date(a.recorded_at).getTime())[0];

      if (lastValid) {
        setLastVitals(lastValid);
        setFormData({
          heart_rate: String(lastValid.heart_rate || ""),
          systolic_bp: String(lastValid.systolic_bp || ""),
          diastolic_bp: String(lastValid.diastolic_bp || ""),
          spo2: String(lastValid.spo2 || ""),
          temperature: String(lastValid.temperature || ""),
          weight: String(lastValid.weight || ""),
        });
      }
    }
  }, [user]);

  const handleSubmit = async () => {
    if (!user) return;
    if (!validate()) return;

    setLoading(true);
    try {
      const fullPayload = {
        user_id: user.id,
        heart_rate: Number(formData.heart_rate) || lastVitals?.heart_rate || null,
        systolic_bp: Number(formData.systolic_bp) || lastVitals?.systolic_bp || null,
        diastolic_bp: Number(formData.diastolic_bp) || lastVitals?.diastolic_bp || null,
        spo2: Number(formData.spo2) || lastVitals?.spo2 || null,
        temperature: Number(formData.temperature) || lastVitals?.temperature || null,
        weight: Number(formData.weight) || lastVitals?.weight || null,
      };

      const { error } = await supabase.from("vitals").insert([fullPayload]);
      if (error) throw error;

      await fetchLastVitals();

      const anomalies = checkVitalsForAlerts(fullPayload);
      if (anomalies.length > 0) {
        for (const anomaly of anomalies) {
          await createAlert({ ...anomaly, user_id: user.id });
        }
      }

      setStep("success");
      if (onSuccess) onSuccess();
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };
}
```

### 4. Nutrition AI Edge Function Prompt
Used in `supabase/functions/nutrition-`:

```typescript
// MODE 1: Initial Improvement + Probing Questions
if (improve && text) {
  prompt = `
You are an expert maternal nutritionist.

User entered: "${text}"

TASK:
1. Rewrite the meal clearly and structurally.
2. Generate specific, probing follow-up questions to reach 95% estimation accuracy.

Rules for Questions:
- Ask about hidden ingredients (oils, ghee, sugar, cream).
- Ask about preparation (Deep fried, shallow fried, steamed, boiled).
- Ask about specific quantities using relatable metrics (bowl size, number of rotis).
- Max 5 questions. Use options (not open-ended) to keep UX fast.

Return ONLY JSON:
{
  "improved": "...",
  "questions": [{"key": "...", "question": "...", "options": ["...", "..."]}]
}
`;
}

// MODE 2: Analyze with Answers (Precise Math)
else if (description && answers) {
  prompt = `
You are a professional maternal nutritionist.

Meal: ${description}
Detailed answers: ${JSON.stringify(answers)}

TASK:
Estimate nutrition with high precision.

Rules:
- DO NOT round values to the nearest 5 or 10.
- Provide exact decimal estimates (e.g., 2.3g fiber instead of 5g).
- Use realistic Indian food database values.

Return ONLY JSON:
{
  "calories": number,
  "protein": number,
  "carbs": number,
  "fat": number,
  "fiber": number
}
`;
}
```

### 5. Realtime Subscription for Live Updates
Located in `src/pages/dashboard.tsx`:

```typescript
useEffect(() => {
  fetchDashboardData();

  const channel = supabase
    .channel('dashboard-realtime')
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'alerts' }, () => fetchDashboardData())
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'vitals' }, () => fetchDashboardData())
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'water_intake' }, () => fetchDashboardData())
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'sleep_data' }, () => fetchDashboardData())
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'mood_logs' }, () => fetchDashboardData())
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'symptoms' }, () => fetchDashboardData())
    .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'alerts' }, () => fetchDashboardData())
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}, [fetchDashboardData]);
```

---

## ⚙️ Environment Variables

Create a `.env` file:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
OPENAI_API_KEY=your-openai-key
```

---

## 🚴 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Type check
npm run typecheck
```

---

## 📄 License

This project is private and proprietary. All rights reserved.

---

<p align="center" style="color: #888; font-size: 0.875rem;">
  Built with ❤️ for maternal health
</p>
