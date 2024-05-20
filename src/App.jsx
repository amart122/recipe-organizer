import './App.css'
import '@picocss/pico/css/pico.min.css';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';

function App() {

  return (
    <main className='main-container container'>
      <Navbar/>

      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </main>
  )
}

export default App
