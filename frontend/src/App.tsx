import "./App.css";
import Alerts from "./components/Alerts";
import EventsTable from "./components/EventsTable";
import GraphicInformation from "./components/GraphicInformation";
import AskDoc from "./components/AskDoc";
import { Auth } from "@supabase/auth-ui-react";
import { useState, useEffect } from "react";
import supabase from "./supabaseClient";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import AuthComponent from "./components/Auth/Auth";
import { AuthProvider, useAuth } from "./AuthContext";
import LoginBar from "./components/Auth/LoginBar";

const App = () => {
  // const [user, setUser] = useState(null);
  // const [session, setSession] = useState(null);
  // const [loading, setLoading] = useState(true); // loading state

  // useEffect(() => {
  //   setLoading(true);
  //   supabase.auth.getSession().then(({ data: { session } }) => {
  //     setSession(session);
  //     setLoading(false);
  //   });

  //   const {
  //     data: { subscription },
  //   } = supabase.auth.onAuthStateChange((_event, session) => {
  //     setSession(session);
  //   });

  //   return () => subscription.unsubscribe();
  // }, []);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }
  const auth = useAuth();
  console.log("auth", auth);
  if (!auth.session) {
    return <AuthComponent />;
  }
  // console.log("session", session);

  return (
    <div className="app-container">
      <LoginBar />
      <div className="main-content">
        <div className="left-side">
          <Alerts />
          <AskDoc />
        </div>
        <div className="right-side">
          <EventsTable />
        </div>
      </div>
      <div className="graphic-info">
        <GraphicInformation />
      </div>
    </div>
  );
};

export default App;
