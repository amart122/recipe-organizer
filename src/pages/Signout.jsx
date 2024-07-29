import '../assets/css/Login.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../modules/AuthContext';
import { useEffect } from 'react';

function Signout() {
  const { currentUser, logout } = useAuth();

  useEffect(() => {
    if (currentUser) {
      logout()
    }
  })

  return (
    <>
      <header>
        <nav>
          <div className="logo">Simple Recipes</div>
        </nav>
        <div className="hero">
          <h1>You habe been logged out</h1>
        </div>
      </header>
      <div className="login-container">
        <div className="logout-message">
          <p>You have been successfully logged out.</p>
          <p>Click <Link to="/login" className="btn">here</Link> to log back in.</p>
          <p>or head back to the <Link to="/home" className="btn">home page</Link></p>
        </div>
      </div>
    </>
  )
}

export default Signout;