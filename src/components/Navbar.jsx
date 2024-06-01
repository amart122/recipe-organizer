import "../assets/css/Navbar.css";
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ModalContext } from '../modules/ModalContext';

function NavBar({ toggleTheme }) {
  const { setModal } = useContext(ModalContext);

  const handleNewRecipeClick = () => {
    setModal({showModal: true, currentModal: 'new-recipe'});
  }

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
        <li>
          <button onClick={handleNewRecipeClick}>New Recipe</button>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;