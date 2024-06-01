import "../assets/css/Navbar.css";
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ModalContext } from '../modules/ModalContext';

function NavBar({ toggleTheme }) {
  const { setModal } = useContext(ModalContext);

  const handleNewRecipeClick = () => {
    setModal({showModal: true, currentModal: 'new-recipe'});
  }

  const handleExportClick = () => {
    const recipes = JSON.parse(localStorage.getItem('recipes'));
    const ingredients = JSON.parse(localStorage.getItem('ingredients'));
    const data = JSON.stringify({ recipes, ingredients });
    const blob = new Blob([data], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'recipes.json';
    a.click();
    URL.revokeObjectURL(url);
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
        <li>
          <button onClick={handleExportClick}>Export Recipes</button>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;