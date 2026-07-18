//import { BrowserRouter as Router, Routes, Route, useState, useContext } from 'react-router-dom';
import { useState } from 'react';
import Home from './pages/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import './App.css';
import { useAuth } from './contexts/AuthContext';

function App() {
  const { user, logout } = useAuth();
  const [currentPage, setCurrentPage] = useState('home');

  const handleLogout = () => {
    logout();
    setCurrentPage('home');
  };

  if (!user && currentPage === 'home') {
    return (
      <div className="app">
        <header className="header">
          <div className="logo">LOGO?</div>
          <nav className="nav-buttons">
            <button onClick={() => setCurrentPage('login')}>Kirjaudu</button>
            <button onClick={() => setCurrentPage('register')}>Rekisteröidy</button>
          </nav>
        </header>
        {currentPage === 'login' && <Login setCurrentPage={setCurrentPage} />}
        {currentPage === 'register' && <Register setCurrentPage={setCurrentPage} />}
      </div>
    );
  }

  if (!user) {
    return (
      <div className="app">
        <header className="header">
          <div className="logo">LOGO?</div>
          <nav className="nav-buttons">
            <button onClick={() => setCurrentPage('login')}>Kirjaudu</button>
            <button onClick={() => setCurrentPage('register')}>Rekisteröidy</button>
          </nav>
        </header>
        {currentPage === 'login' && <Login setCurrentPage={setCurrentPage} />}
        {currentPage === 'register' && <Register setCurrentPage={setCurrentPage} />}
      </div>
    );
  }

  return (
    <div className="app">
      <header className="header">
        <div className="logo">LOGO?</div>
        <nav className="nav-buttons">
          <button onClick={() => setCurrentPage('home')}>Pääivän sana</button>
          <button onClick={() => setCurrentPage('profile')}>{user.username}</button>
          <button onClick={handleLogout}>Kirjaudu ulos</button>
        </nav>
      </header>

      <main className="main-content">
        {currentPage === 'home' && <Home />}
        {currentPage === 'profile' && <div className="profile-page">Profile page coming soon</div>}
      </main>
    </div>
  );
}

export default App;
