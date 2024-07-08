import React from 'react';
import '../assets/css/Landing.css';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <>
      <header>
        <nav>
          <div className="logo">Simple Recipes</div>
        </nav>
        <div className="hero">
          <h1>Welcome to Simple Recipes</h1>
          <p>Easily Create and Import Recipes Locally</p>
        </div>
      </header>
      <div className='try-it'>
        <Link to="/home" className="btn">Try It Now</Link>
      </div>
      <section id="features">
        <div className="feature">
          <h3>No Sign Up</h3>
          <p>Create and store your own recipes locally.</p>
        </div>
        <div className="feature">
          <h3>Import Recipes</h3>
          <p>Import recipes from over 80 different websites.</p>
        </div>
        <div className="feature">
          <h3>Share and Save</h3>
          <p>Export your recipes easily and look forward to many new features.</p>
        </div>
        <div className="feature">
          <h3>Clutter-Free</h3>
          <p>Import recipes seamlessly and bypass the distractions of ads and clutter found on typical recipe websites.</p>
        </div>
      </section>
      <footer>
        <p>&copy; 2024 Simple Recipes. All rights reserved.</p>
      </footer>
    </>
  );
};

export default Landing;
