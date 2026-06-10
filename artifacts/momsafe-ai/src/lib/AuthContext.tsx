import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
import { supabase } from "./supabase";
import { User, Session } from "@supabase/supabase-js";

interface UserProfile {
  id: string;
  full_name: string | null;
  age: number | null;
  blood_type: string | null;
  doctor_name: string | null;
  hospital: string | null;
  gestational_week: number | null;
  due_date: string | null;
  pregnancy_type: string | null;
  parity: number | null;
  pre_preg_weight: number | null;
  conditions: string | null;
  conception_method: string | null;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  onboardingComplete: boolean;
  userProfile: UserProfile | null;
  signOut: () => Promise<void>;
  refreshOnboardingStatus: () => Promise<void>;
  refreshUserProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", userId)
        .maybeSingle();

      if (error) throw error;
      setUserProfile(data as UserProfile | null);

      if (data && (data.full_name || data.gestational_week)) {
        setOnboardingComplete(true);
      } else {
        setOnboardingComplete(false);
      }
    } catch (err) {
      console.error("Error fetching user profile:", err);
      setUserProfile(null);
      setOnboardingComplete(false);
    }
  };

  const checkOnboardingStatus = async (userId: string) => {
    await fetchUserProfile(userId);
  };

  const refreshOnboardingStatus = async () => {
    if (user) {
      await checkOnboardingStatus(user.id);
    }
  };

  const refreshUserProfile = async () => {
    if (user) {
      await fetchUserProfile(user.id);
    }
  };

  useEffect(() => {
    // Initial session check
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        await fetchUserProfile(session.user.id);
      }

      setLoading(false);
    };

    init();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        await fetchUserProfile(session.user.id);
      } else {
        setOnboardingComplete(false);
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    setOnboardingComplete(false);
    setUserProfile(null);
  };

  const value = useMemo(() => ({
    user,
    session,
    loading,
    onboardingComplete,
    userProfile,
    signOut,
    refreshOnboardingStatus,
    refreshUserProfile
  }), [user, session, loading, onboardingComplete, userProfile]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
