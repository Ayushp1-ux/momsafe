import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/AuthContext";
import { useLocation } from "wouter";
import { toast } from "sonner";
import { User, Baby, Save, Loader2, Heart, CheckCircle2, AlertCircle } from "lucide-react";

function Field({
  label,
  value,
  type = "text",
  onChange,
  onBlur,
  disabled = false,
  error,
  hint,
  min,
  max,
  required = true,
}: {
  label: string;
  value: string;
  type?: string;
  onChange?: (val: string) => void;
  onBlur?: () => void;
  disabled?: boolean;
  error?: string;
  hint?: string;
  min?: number;
  max?: number;
  required?: boolean;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-semibold text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type={type}
        value={value || ""}
        onChange={(e) => onChange?.(e.target.value)}
        onBlur={onBlur}
        disabled={disabled}
        min={min}
        max={max}
        className={`w-full text-sm px-4 py-3 rounded-xl border-2 transition-all focus:outline-none focus:ring-2 focus:ring-blue-100 ${
          error
            ? "border-red-300 bg-red-50 focus:border-red-400"
            : "border-gray-200 bg-white focus:border-blue-400"
        }`}
      />
      {error && (
        <div className="flex items-center gap-1 text-xs text-red-600">
          <AlertCircle className="w-3 h-3" />
          {error}
        </div>
      )}
      {hint && (
        <p className="text-[10px] text-blue-500 font-medium mt-1 flex items-center gap-1">
          <span>↻</span> {hint}
        </p>
      )}
    </div>
  );
}

function SelectField({
  label,
  value,
  options,
  onChange,
  onBlur,
  error,
  required = true,
}: {
  label: string;
  value: string;
  options: { value: string; label: string }[] | string[];
  onChange?: (val: string) => void;
  onBlur?: () => void;
  error?: string;
  required?: boolean;
}) {
  const formattedOptions = Array.isArray(options)
    ? options.map((opt) =>
        typeof opt === "string" ? { value: opt, label: opt } : opt
      )
    : [];

  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-semibold text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative">
        <select
          value={value || ""}
          onChange={(e) => onChange?.(e.target.value)}
          onBlur={onBlur}
          className={`w-full text-sm px-4 py-3 rounded-xl border-2 transition-all focus:outline-none focus:ring-2 focus:ring-blue-100 appearance-none ${
            error
              ? "border-red-300 bg-red-50 focus:border-red-400"
              : "border-gray-200 bg-white focus:border-blue-400"
          } text-gray-700`}
        >
          <option value="" disabled>
            Select {label.toLowerCase()}
          </option>
          {formattedOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </div>
      </div>
      {error && (
        <div className="flex items-center gap-1 text-xs text-red-600">
          <AlertCircle className="w-3 h-3" />
          {error}
        </div>
      )}
    </div>
  );
}

export default function Onboarding() {
  const { user: authUser, refreshOnboardingStatus } = useAuth();
  const [, setLocation] = useLocation();
  const [saving, setSaving] = useState(false);
  const [step, setStep] = useState(1);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const [profileData, setProfileData] = useState({
    full_name: "",
    age: "",
    blood_type: "",
    doctor_name: "",
    hospital: "",
  });

  const [pregnancyData, setPregnancyData] = useState({
    gestational_week: "",
    due_date: "",
    pregnancy_type: "Singleton",
    parity: "0",
    pre_preg_weight: "",
    conditions: "None",
    conception_method: "Natural",
  });

  // Validation functions
  const validateProfile = () => {
    const errors: Record<string, string> = {};
    if (!profileData.full_name.trim()) {
      errors.full_name = "Please enter your full name";
    } else if (profileData.full_name.trim().length < 2) {
      errors.full_name = "Name must be at least 2 characters";
    }

    const age = Number(profileData.age);
    if (!profileData.age) {
      errors.age = "Please enter your age";
    } else if (isNaN(age) || age < 13) {
      errors.age = "Age must be at least 13";
    } else if (age > 100) {
      errors.age = "Please enter a valid age";
    }

    if (!profileData.blood_type) {
      errors.blood_type = "Please select your blood type";
    }

    return errors;
  };

  const validatePregnancy = () => {
    const errors: Record<string, string> = {};
    const week = Number(pregnancyData.gestational_week);

    if (!pregnancyData.gestational_week && !pregnancyData.due_date) {
      errors.gestational_week = "Please enter either current week or due date";
    }

    if (pregnancyData.gestational_week) {
      if (isNaN(week) || week < 1) {
        errors.gestational_week = "Week must be at least 1";
      } else if (week > 42) {
        errors.gestational_week = "Week cannot be more than 42";
      }
    }

    const parity = Number(pregnancyData.parity);
    if (pregnancyData.parity && (isNaN(parity) || parity < 0)) {
      errors.parity = "Parity cannot be negative";
    }

    const weight = Number(pregnancyData.pre_preg_weight);
    if (pregnancyData.pre_preg_weight) {
      if (isNaN(weight) || weight < 30) {
        errors.pre_preg_weight = "Weight must be at least 30 kg";
      } else if (weight > 300) {
        errors.pre_preg_weight = "Please enter a valid weight";
      }
    }

    return errors;
  };

  const profileErrors = validateProfile();
  const pregnancyErrors = validatePregnancy();
  const isProfileStepComplete = Object.keys(profileErrors).length === 0;
  const isPregnancyStepComplete = Object.keys(pregnancyErrors).length === 0;

  const handleTouch = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSaveProfile = async () => {
    if (!isProfileStepComplete || !isPregnancyStepComplete) {
      toast.error("Please fix the errors before continuing");
      return;
    }

    setSaving(true);
    try {
      const { error } = await supabase.from("users").upsert(
        {
          id: authUser!.id,
          full_name: profileData.full_name.trim(),
          age: Number(profileData.age),
          blood_type: profileData.blood_type,
          doctor_name: profileData.doctor_name.trim(),
          hospital: profileData.hospital.trim(),
          gestational_week: pregnancyData.gestational_week
            ? Number(pregnancyData.gestational_week)
            : null,
          due_date: pregnancyData.due_date || null,
          pregnancy_type: pregnancyData.pregnancy_type,
          parity: Number(pregnancyData.parity) || 0,
          pre_preg_weight: pregnancyData.pre_preg_weight
            ? Number(pregnancyData.pre_preg_weight)
            : null,
          conditions: pregnancyData.conditions.trim(),
          conception_method: pregnancyData.conception_method,
        },
        { onConflict: "id" }
      );

      if (error) throw error;
      await refreshOnboardingStatus();
      toast.success("Welcome to MomSafe! 🎉");
      setLocation("/dashboard");
    } catch (err: any) {
      console.error("Onboarding error:", err);
      toast.error(err.message || "Failed to create profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-pink-50 px-4 py-8">
      <div className="max-w-lg w-full space-y-6 p-8 bg-white rounded-3xl shadow-xl border border-gray-100">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-100 to-pink-100 rounded-2xl flex items-center justify-center mb-4">
            <Heart className="w-8 h-8 text-pink-500 fill-pink-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome to MomSafe
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Let's personalize your care journey
          </p>
        </div>

        {/* Steps Indicator */}
        <div className="flex items-center justify-center gap-2">
          <div
            className={`flex items-center gap-2 transition-colors ${
              step >= 1 ? "text-blue-600" : "text-gray-300"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                step === 1
                  ? "bg-blue-600 text-white scale-110"
                  : step > 1
                  ? "bg-green-500 text-white"
                  : "bg-gray-100 text-gray-400"
              }`}
            >
              {step > 1 ? <CheckCircle2 className="w-4 h-4" /> : 1}
            </div>
            <span className="text-xs font-medium hidden sm:block">Profile</span>
          </div>
          <div
            className={`w-10 h-0.5 transition-colors ${
              step >= 2 ? "bg-blue-600" : "bg-gray-200"
            }`}
          ></div>
          <div
            className={`flex items-center gap-2 transition-colors ${
              step >= 2 ? "text-blue-600" : "text-gray-300"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                step === 2
                  ? "bg-blue-600 text-white scale-110"
                  : "bg-gray-100 text-gray-400"
              }`}
            >
              2
            </div>
            <span className="text-xs font-medium hidden sm:block">Pregnancy</span>
          </div>
        </div>

        {/* Step Content */}
        <div className="space-y-4 pt-2">
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <User className="w-4 h-4" /> Your Profile
              </h2>
              <Field
                label="Full Name"
                value={profileData.full_name}
                onChange={(v) => setProfileData({ ...profileData, full_name: v })}
                onBlur={() => handleTouch("full_name")}
                error={touched.full_name ? profileErrors.full_name : undefined}
              />
              <Field
                label="Age"
                type="number"
                value={profileData.age}
                onChange={(v) => setProfileData({ ...profileData, age: v })}
                onBlur={() => handleTouch("age")}
                min={13}
                max={100}
                error={touched.age ? profileErrors.age : undefined}
              />
              <SelectField
                label="Blood Type"
                value={profileData.blood_type}
                options={[
                  "A+",
                  "A-",
                  "B+",
                  "B-",
                  "AB+",
                  "AB-",
                  "O+",
                  "O-",
                  "Don't know",
                ]}
                onChange={(v) => setProfileData({ ...profileData, blood_type: v })}
                onBlur={() => handleTouch("blood_type")}
                error={touched.blood_type ? profileErrors.blood_type : undefined}
              />
              <Field
                label="OB/GYN Provider (Optional)"
                value={profileData.doctor_name}
                onChange={(v) => setProfileData({ ...profileData, doctor_name: v })}
                required={false}
              />
              <Field
                label="Hospital / Clinic (Optional)"
                value={profileData.hospital}
                onChange={(v) => setProfileData({ ...profileData, hospital: v })}
                required={false}
              />
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Baby className="w-4 h-4" /> Pregnancy Details
              </h2>
              <Field
                label="Current Week (1-42)"
                type="number"
                value={pregnancyData.gestational_week}
                onChange={(v) =>
                  setPregnancyData({ ...pregnancyData, gestational_week: v })
                }
                onBlur={() => handleTouch("gestational_week")}
                min={1}
                max={42}
                error={
                  touched.gestational_week
                    ? pregnancyErrors.gestational_week
                    : undefined
                }
                required={!pregnancyData.due_date}
              />
              <Field
                label="Due Date (Optional)"
                type="date"
                value={pregnancyData.due_date}
                onChange={(v) =>
                  setPregnancyData({ ...pregnancyData, due_date: v })
                }
                required={false}
              />
              <SelectField
                label="Pregnancy Type"
                value={pregnancyData.pregnancy_type}
                options={["Singleton", "Twins", "Triplets", "More"]}
                onChange={(v) =>
                  setPregnancyData({ ...pregnancyData, pregnancy_type: v })
                }
                required={true}
              />
              <Field
                label="Parity (previous births)"
                type="number"
                value={pregnancyData.parity}
                onChange={(v) => setPregnancyData({ ...pregnancyData, parity: v })}
                onBlur={() => handleTouch("parity")}
                min={0}
                error={touched.parity ? pregnancyErrors.parity : undefined}
                required={true}
              />
              <Field
                label="Pre-pregnancy Weight (kg, Optional)"
                type="number"
                value={pregnancyData.pre_preg_weight}
                onChange={(v) =>
                  setPregnancyData({ ...pregnancyData, pre_preg_weight: v })
                }
                onBlur={() => handleTouch("pre_preg_weight")}
                min={30}
                error={
                  touched.pre_preg_weight
                    ? pregnancyErrors.pre_preg_weight
                    : undefined
                }
                required={false}
              />
              <Field
                label="Pre-existing Conditions (Optional)"
                value={pregnancyData.conditions}
                onChange={(v) =>
                  setPregnancyData({ ...pregnancyData, conditions: v })
                }
                required={false}
              />
              <SelectField
                label="Conception Method"
                value={pregnancyData.conception_method}
                options={["Natural", "IVF", "IUI", "Fertility meds", "Other"]}
                onChange={(v) =>
                  setPregnancyData({ ...pregnancyData, conception_method: v })
                }
                required={true}
              />
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-3 pt-4">
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="flex-1 py-3 rounded-xl border-2 border-gray-200 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all"
            >
              Back
            </button>
          )}

          {step === 1 ? (
            <button
              onClick={() => {
                setTouched({
                  full_name: true,
                  age: true,
                  blood_type: true,
                });
                if (isProfileStepComplete) setStep(2);
                else toast.error("Please fill in all required fields");
              }}
              disabled={!isProfileStepComplete}
              className="flex-1 py-3 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-100"
            >
              Continue
            </button>
          ) : (
            <button
              onClick={handleSaveProfile}
              disabled={!isPregnancyStepComplete || saving}
              className="flex-1 py-3 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-100 flex items-center justify-center gap-2"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Setting up...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Complete Setup
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
