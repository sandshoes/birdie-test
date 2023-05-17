import { useState } from "react";
import supabase from "../../supabaseClient";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [careRecipientId, setCareRecipientId] = useState("");

  const handleSignUp = async (e: any) => {
    e.preventDefault();
    let { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      console.log(error.message);
    } else {
      await supabase.from("profiles").insert([
        {
          user_id: data.user!.id,
          username: username,
          care_recipient_id: careRecipientId,
        },
      ]);
    }
  };

  return (
    <form onSubmit={handleSignUp}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <select
        defaultValue={""}
        onChange={(e) => {
          setCareRecipientId(e.target.value);
        }}
      >
        <option value="" disabled>
          Select...
        </option>
        <option value="df50cac5-293c-490d-a06c-ee26796f850d">Linda</option>
        <option value="e3e2bff8-d318-4760-beea-841a75f00227">Alice</option>
        <option value="ad3512a6-91b1-4d7d-a005-6f8764dd0111">Lisa</option>
      </select>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default SignUp;
