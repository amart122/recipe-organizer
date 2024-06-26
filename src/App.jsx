import './App.css'
import '@picocss/pico/css/pico.min.css';
import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Recipe from './pages/Recipe';
import { RecipeProvider } from './modules/RecipesContext.jsx';
import { ModalProvider } from './modules/ModalContext';
import ModalContainer from './components/ModalContainer';

function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.getElementsByTagName('html')[0].dataset.theme = theme;
    document.getElementsByTagName('main')[0].dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme])

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }

  return (
    <RecipeProvider>
      <ModalProvider>
        <main className='main-container container'>
          <Navbar toggleTheme={toggleTheme} theme={theme} />

          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/recipe/:id' element={<Recipe />} />
          </Routes>

          <ModalContainer />
        </main>
      </ModalProvider>
    </RecipeProvider>
  )
}

export default App
