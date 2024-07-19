import './App.css'
import '@picocss/pico/css/pico.min.css';
import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Recipe from './pages/Recipe';
import Landing from './pages/Landing';
import Login from './pages/Login';
import { RecipeProvider } from './modules/RecipesContext.jsx';
import { ModalProvider } from './modules/ModalContext';
import ModalContainer from './components/ModalContainer';
import { AuthProvider } from './modules/AuthContext.jsx';

function App() {
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
    <AuthProvider>
      <RecipeProvider>
        <ModalProvider>
          <main className='main-container container'>
            
            {!['/', '/login', '/signup'].includes(appLocation.pathname) &&  <Navbar toggleTheme={toggleTheme} theme={theme} />}

            <Routes>
              <Route path='/' element={<Landing />} />
              <Route path='/home' element={<Home />} />
              <Route path='/recipe/:id' element={<Recipe />} />
              <Route path='/login' element={<Login />} />
            </Routes>

            <ModalContainer />
          </main>
        </ModalProvider>
      </RecipeProvider>
    </AuthProvider>
  )
}

export default App;
