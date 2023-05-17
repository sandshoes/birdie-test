import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { Session, User } from "@supabase/supabase-js";
import supabase from "./supabaseClient";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: any | null;
  careRecipientId: string | null;
  careRecipientData: any | null;
  signIn: (
    credentials: any
  ) => Promise<{ user: User | null; error: Error | null }>;
  signOut: () => Promise<{ error: Error | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [careRecipientId, setCareRecipientId] = useState<string | null>(null);
  const [careRecipientData, setCareRecipientData] = useState<any | null>("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { savedSession } }) => {
      setSession(savedSession);
    });

    supabase.auth.getUser().then(({ data: { savedUser } }) => {
      setUser(savedUser);
    });

    if (session && session?.user?.id) {
      fetchProfile(session?.user?.id);
    }

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        const currentUser = session?.user;
        setUser(currentUser ?? null);
        if (currentUser) {
          fetchProfile(currentUser.id);
        }
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (careRecipientId) {
      fetchCareRecipientInfo(careRecipientId);
    }
  }, [careRecipientId]);

  const fetchProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("username, care_recipient_id")
      .eq("user_id", userId)
      .single();

    if (error) {
      console.error("Error fetching profile: ", error.message);
    } else {
      setProfile(data.username);
      setCareRecipientId(data.care_recipient_id);
    }
  };

  const fetchCareRecipientInfo = async (careRecipientId: string) => {
    const response = await fetch(
      `http://localhost:3000/recipient/${careRecipientId}`
    );
    const careRecipientData = await response.json();
    setCareRecipientData(careRecipientData);
  };

  const signIn = async (credentials: any) => {
    let { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });

    if (error) {
      console.log(error.message);
    } else {
      await supabase
        .from("profiles")
        .select("username")
        .eq("id", data.user!.id)
        .single();
    }

    setUser(data.user);
    setSession(data.session);

    return { user, session, error: null };
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      return { error };
    }

    setUser(null);
    setSession(null);

    return { error: null };
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        profile,
        careRecipientId,
        careRecipientData,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
