import { useState, FormEvent } from 'react';
import { useAuth } from '../../AuthContext';

const SignIn = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { signIn } = useAuth();

  const handleSignIn = async (e: FormEvent) => {
    e.preventDefault();

    const { user, error } = await signIn({ email, password });

    if (error) {
      console.log(error.message);
    } else {
      console.log('Signed in as:', user?.email);
    }
  };

  return (
    <form onSubmit={handleSignIn}>
      <input
        type='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder='Email'
      />
      <input
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder='Password'
      />
      <button type='submit'>Sign In</button>
    </form>
  );
};

export default SignIn;
