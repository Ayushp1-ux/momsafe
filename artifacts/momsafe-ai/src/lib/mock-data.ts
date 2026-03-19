// Centralized mock data to keep components clean
import { subDays, format } from "date-fns";

export const mockUser = {
  name: "Sarah Jenkins",
  avatar: `${import.meta.env.BASE_URL}images/avatar.png`,
  pregnancyWeek: 32,
  dueDate: "2025-08-14",
  bloodType: "O+",
  age: 29,
  doctor: "Dr. Emily Chen",
  hospital: "Cedar Sinai Medical Center"
};

export const generateTrendData = (days = 7, base = 80, variance = 5) => {
  return Array.from({ length: days }).map((_, i) => ({
    date: format(subDays(new Date(), days - 1 - i), 'MMM dd'),
    value: Math.round(base + (Math.random() * variance * 2 - variance)),
    value2: Math.round((base - 10) + (Math.random() * variance * 2 - variance)),
  }));
};

export const vitalsData = {
  heartRate: { current: 82, status: 'normal', trend: '+2', history: generateTrendData(7, 80, 8) },
  bloodPressure: { current: '118/76', systolic: 118, diastolic: 76, status: 'normal', trend: '-2', history: generateTrendData(7, 115, 10) },
  spo2: { current: 98, status: 'normal', trend: '0', history: generateTrendData(7, 98, 1) },
  temperature: { current: 36.8, status: 'normal', trend: '+0.1', history: generateTrendData(7, 36.6, 0.4) },
  weight: { current: 68.2, status: 'warning', trend: '+0.8', history: generateTrendData(7, 67, 1) },
};

export const alerts = [
  { id: 1, title: "Elevated Heart Rate Detected", description: "Your resting heart rate has been above 90bpm for the last 2 hours.", severity: "warning", time: "10 mins ago", type: "vital" },
  { id: 2, title: "Missed Medication", description: "Prenatal Vitamin dose scheduled for 9:00 AM was missed.", severity: "critical", time: "2 hours ago", type: "medication" },
  { id: 3, title: "Low Water Intake", description: "You've only logged 0.5L of water today. Goal is 2.5L.", severity: "info", time: "4 hours ago", type: "nutrition" },
];

export const aiRecommendations = [
  { id: 1, title: "Hydrate Immediately", description: "Drink 16oz of water to help normalize your heart rate.", action: "Log Water", priority: "high" },
  { id: 2, title: "Rest & Elevate Legs", description: "Take a 20-minute rest. Your recent activity level combined with slight BP increase suggests need for rest.", action: "Start Timer", priority: "medium" },
  { id: 3, title: "Iron-Rich Snack", description: "Based on your nutrition log, you're low on iron today. Consider a handful of spinach or fortified cereal.", action: "View Recipes", priority: "low" },
];

export const nutritionData = {
  calories: { consumed: 1850, target: 2200 },
  protein: { consumed: 65, target: 80 },
  carbs: { consumed: 210, target: 250 },
  fat: { consumed: 55, target: 70 },
  water: { consumed: 1.2, target: 2.5 }
};

export const medications = [
  { id: 1, name: "Prenatal Vitamin", dosage: "1 Tablet", time: "09:00 AM", taken: true, type: "supplement" },
  { id: 2, name: "Iron Supplement", dosage: "65 mg", time: "02:00 PM", taken: false, type: "supplement" },
  { id: 3, name: "Calcium", dosage: "500 mg", time: "08:00 PM", taken: false, type: "supplement" },
];
