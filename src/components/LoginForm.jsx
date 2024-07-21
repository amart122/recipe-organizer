import { useState } from 'react';
import { useAuth } from '../modules/AuthContext';
import { useNavigate } from 'react-router-dom';
import Toast from './Toast';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [toast, setToast] = useState({ message: '', show: false });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);

      navigate('/home')
    } catch (error) {
      setToast({
        message: error.message,
        show: true,
        type: "error"
      })
    }
  }

  return (
    <div className='login-form'>
      <form onSubmit={handleLogin}>
        <input type='text' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type='submit'>Login</button>
      </form>
      <Toast {...toast} setToast={setToast}/>
    </div>
  )
}

export default LoginForm;