import { useState } from "react";
// import supabase from "../../supabaseClient";
import SignIn from "./Signin";
import SignUp from "./Signup";

function AuthComponent() {
  const [isSigningUp, setIsSigningUp] = useState(false);

  const switchMode = () => setIsSigningUp((prev) => !prev);

  return (
    <div>
      {isSigningUp ? (
        <SignUp/>
      ) : (
        <SignIn/>
      )}
      <button onClick={switchMode}>
        {isSigningUp
          ? "Already have an account? Sign in"
          : "Need an account? Sign up"}
      </button>
    </div>
  );
}

export default AuthComponent;
