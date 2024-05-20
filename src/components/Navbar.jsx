import "../assets/css/Navbar.css";
import React from 'react';
import { Link } from 'react-router-dom';

function NavBar({ toggleTheme }) {

  return (
    <nav>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
      </ul>
      <ul>
        <li>
          <button onClick={toggleTheme}>Toggle Theme</button>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;