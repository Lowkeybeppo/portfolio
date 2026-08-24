//import { BrowserRouter as Router, Routes, Route, useState, useContext } from 'react-router-dom';
import { useState } from 'react'
import Modal from 'react-modal'
import Home from './pages/Home'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import Wordle from './components/Game/Wordle'
import AdminPanel from './components/Admin/AdminPanel'
import './App.css'
import { useAuth } from './contexts/AuthContext'

function App() {
  const { user, logout, loading } = useAuth()
  const [currentPage, setCurrentPage] = useState('home')
  const [authModal, setAuthModal] = useState(null) // 'login' | 'register' | null

  const openAuthModal = (type) => setAuthModal(type)
  const closeAuthModal = () => setAuthModal(null)

  const handleLogout = () => {
    logout()
    setCurrentPage('home')
  }

  if (loading) {
    return <div className="app">Loading...</div>
  }

  const renderGuestNav = (
    <header className="header">
      <div className="logo">LOGO?</div>
      <nav className="nav-buttons">
        <button onClick={() => setAuthModal('login')}>Kirjaudu</button>
        <button onClick={() => setAuthModal('register')}>Rekisteröidy</button>
      </nav>
    </header>
  )

  if (!user) {
    return (
      <div className="app">
        {renderGuestNav}

        <main className="main-content">
          {currentPage === 'home' && <Home setCurrentPage={setCurrentPage} openAuthModal={setAuthModal} />}
          {currentPage === 'game' && <Wordle setCurrentPage={setCurrentPage} />}
        </main>

        <Modal
          isOpen={Boolean(authModal)}
          onRequestClose={closeAuthModal}
          contentLabel={authModal === 'login' ? 'Login' : 'Register'}
          overlayClassName="modal-overlay"
          className="modal-content"
        >
          {authModal === 'login' ? (
            <Login setCurrentPage={setCurrentPage} onClose={closeAuthModal} />
          ) : (
            <Register setCurrentPage={setCurrentPage} onClose={closeAuthModal} />
          )}
        </Modal>
      </div>
    )
  }

  return (
    <div className="app">
      <header className="header">
        <div className="logo">LOGO?</div>
        <nav className="nav-buttons">
          <button onClick={() => setCurrentPage('home')}>Päivän sana</button>
          <button onClick={() => setCurrentPage('profile')}>{user.username}</button>
          {user.isAdmin && (
            <button onClick={() => setCurrentPage('admin')}>Admin</button>
          )}
          <button onClick={handleLogout}>Kirjaudu ulos</button>
        </nav>
      </header>

      <main className="main-content">
        {currentPage === 'home' && <Home setCurrentPage={setCurrentPage} />}
        {currentPage === 'game' && <Wordle setCurrentPage={setCurrentPage} />}
        {currentPage === 'profile' && <div className="profile-page">Profiilisivu tulossa...</div>}
        {currentPage === 'admin' && <AdminPanel />}
      </main>
    </div>
  )
}

export default App