import { useState } from 'react';
import { useAuth } from '../modules/AuthContext';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);

      navigate('/home')
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className='login-form'>
      <form onSubmit={handleLogin}>
        <input type='text' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default LoginForm;