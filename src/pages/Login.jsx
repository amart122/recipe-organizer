import '../assets/css/Login.css';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import { useAuth } from '../modules/AuthContext';
import { useNavigate } from 'react-router-dom';

function Login() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate('/home');
    }
  })

  return (
    <>
      <header>
        <nav>
          <div className="logo">Simple Recipes - Login </div>
        </nav>
        <div className="hero">
          <h1>Welcome to Simple Recipes</h1>
          <p>Easily Create and Import Recipes</p>
        </div>
      </header>
      <div className='login-container'>
        <LoginForm />
      </div>
      <div className="signup-link">
        <Link to="/signup" className="btn">Sign Up</Link>
      </div>
    </>
  )
}

export default Login;