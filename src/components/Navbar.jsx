import "../assets/css/Navbar.css";
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ModalContext } from '../modules/ModalContext';
import { useAuth } from '../modules/AuthContext';

function NavBar({ toggleTheme, theme }) {
  const { setModal } = useContext(ModalContext);
  const { currentUser } = useAuth();

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
          <Link to='/home'>Home</Link>
        </li>
      </ul>
      <ul>
        <li>
          <input type="checkbox" id="theme-toggle" onChange={toggleTheme} checked={theme === 'dark'} title="Toggle Theme"/>
          <label htmlFor="theme-toggle"></label>
        </li>
        <li>
          <details className="dropdown">
            <summary>Recipes</summary>
            <ul dir="rtl">
              <li>
                <a onClick={handleNewRecipeClick}>New Recipe</a>
              </li>
              <li>
                <a onClick={handleImportClick}>Import Recipe</a>
              </li>
              <li>
                <a onClick={handleExportClick}>Export Recipes</a>
              </li>
            </ul>
          </details>
        </li>
        <li>
          <details className="dropdown">
            <summary>Account</summary>
            <ul dir="rtl">
              {currentUser && 
              <li>
                <span>{currentUser.email}</span>
              </li>
              }
              <li>
                {currentUser ? 
                  <a href="/logout">Logout</a> : 
                  <a href="/login">Login</a>
                }
              </li>
            </ul>
          </details>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;