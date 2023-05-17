import supabase from "../../supabaseClient";
import { useAuth } from "../../AuthContext";
import "./LoginBar.css";

function LoginBar() {
  const { profile, careRecipientData } = useAuth();

  if (profile && careRecipientData) {
    return (
      <div className="login-bar">
        <div className="patient-info">
          <p className="patient-details"><strong>Have a look at {careRecipientData.name}'s health</strong></p>
        </div>
        <div className="user-info">
          <p className="user-details">Welcome, {profile}!</p>
          <button onClick={() => supabase.auth.signOut()}>Log Out</button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="login-bar">
      </div>
    );
  }
}

export default LoginBar;
