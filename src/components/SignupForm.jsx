import { useState } from 'react';
import { useAuth } from '../modules/AuthContext';
import { useNavigate } from 'react-router-dom';

function SignupForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await signup(email, password);

      navigate('/home')
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className='login-form'>
      <form onSubmit={handleSignup}>
        <input type='text' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type='submit'>Signup</button>
      </form>
    </div>
  )
}

export default SignupForm;