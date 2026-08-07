//import { BrowserRouter as Router, Routes, Route, useState, useContext } from 'react-router-dom';
import { useState } from 'react';
import Home from './pages/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Wordle from './components/Game/Wordle';
import './App.css';
import { useAuth } from './contexts/AuthContext';

function App() {
  const { user, logout, loading } = useAuth();
  const [currentPage, setCurrentPage] = useState('home');

  const handleLogout = () => {
    logout();
    setCurrentPage('home');
  };

  if (loading) {
    return <div className="app">Loading...</div>;
  }

  const renderGuestNav = (
    <header className="header">
      <div className="logo">LOGO?</div>
      <nav className="nav-buttons">
        <button onClick={() => setCurrentPage('login')}>Kirjaudu</button>
        <button onClick={() => setCurrentPage('register')}>Rekisteröidy</button>
      </nav>
    </header>
  );

  if (!user) {
    return (
      <div className="app">
        {renderGuestNav}

        <main className="main-content">
          {currentPage === 'login' && <Login setCurrentPage={setCurrentPage} />}
          {currentPage === 'register' && <Register setCurrentPage={setCurrentPage} />}
          {currentPage === 'home' && <Home setCurrentPage={setCurrentPage} />}
          {currentPage === 'game' && <Wordle setCurrentPage={setCurrentPage} />}
        </main>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="header">
        <div className="logo">LOGO?</div>
        <nav className="nav-buttons">
          <button onClick={() => setCurrentPage('home')}>Päivän sana</button>
          <button onClick={() => setCurrentPage('profile')}>{user.username}</button>
          <button onClick={handleLogout}>Kirjaudu ulos</button>
        </nav>
      </header>

      <main className="main-content">
        {currentPage === 'home' && <Home setCurrentPage={setCurrentPage} />}
        {currentPage === 'game' && <Wordle setCurrentPage={setCurrentPage} />}
        {currentPage === 'profile' && <div className="profile-page">Profile page coming soon</div>}
      </main>
    </div>
  );
}

export default App;
