import './App.css'
import '@picocss/pico/css/pico.min.css';
import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Recipe from './pages/Recipe';
import Landing from './pages/Landing';
import { RecipeProvider } from './modules/RecipesContext.jsx';
import { ModalProvider } from './modules/ModalContext';
import ModalContainer from './components/ModalContainer';

function App({ location }) {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const appLocation = useLocation();

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
          
          {appLocation.pathname !== '/' &&  <Navbar toggleTheme={toggleTheme} theme={theme} />}

          <Routes>
            <Route path='/home' element={<Home />} />
            <Route path='/recipe/:id' element={<Recipe />} />
            <Route path='/' element={<Landing />} />
          </Routes>

          <ModalContainer />
        </main>
      </ModalProvider>
    </RecipeProvider>
  )
}

export default App;
