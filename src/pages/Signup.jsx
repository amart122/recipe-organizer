import '../assets/css/Login.css';
import { Link } from 'react-router-dom';
import SignupForm from '../components/SignupForm';
import { useAuth } from '../modules/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function Signup() {
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
          <div className="logo">Simple Recipes - Sign Up </div>
        </nav>
        <div className="hero">
          <h1>Welcome to Simple Recipes</h1>
          <p>Easily Create and Import Recipes</p>
        </div>
      </header>
      <div className='login-container'>
        <SignupForm />
      </div>
      <div className="signup-link">
        Already have an account? <Link to="/login" className="btn">Log In</Link>
      </div>
    </>
  )
}

export default Signup;