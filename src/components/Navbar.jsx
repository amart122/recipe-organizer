import "../assets/css/Navbar.css";
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ModalContext } from '../modules/ModalContext';

function NavBar({ toggleTheme, theme }) {
  const { setModal } = useContext(ModalContext);

  const handleNewRecipeClick = () => {
    setModal({showModal: true, currentModal: 'new-recipe'});
  }

  const handleImportClick = () => {
    setModal({showModal: true, currentModal: 'import'});
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
          <input type="checkbox" id="theme-toggle" onChange={toggleTheme} checked={theme === 'dark'} title="Toggle Theme"/>
          <label htmlFor="theme-toggle"></label>
        </li>
        <li>
          <button onClick={handleNewRecipeClick}>New Recipe</button>
        </li>
        <li>
          <button onClick={handleImportClick}>Import Recipe</button>
        </li>
        <li>
          <button onClick={handleExportClick}>Export Recipes</button>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;