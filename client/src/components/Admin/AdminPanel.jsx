import { useState } from 'react'
import './AdminPanel.css'

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('users')

  return (
    <div className="admin-container">
      <h2>Admin Panel</h2>
      <div className="admin-tabs">
        <button 
          className={activeTab === 'users' ? 'active' : ''}
          onClick={() => setActiveTab('users')}
        >
          Manage Users
        </button>
        <button 
          className={activeTab === 'stats' ? 'active' : ''}
          onClick={() => setActiveTab('stats')}
        >
          System Stats
        </button>
        <button 
          className={activeTab === 'scores' ? 'active' : ''}
          onClick={() => setActiveTab('scores')}
        >
          Game Scores
        </button>
      </div>

      <div className="admin-content">
        {activeTab === 'users' && (
          <div className="tab-content">
            <h3>Manage Users</h3>
            {/* Users management will go here */}
          </div>
        )}
        {activeTab === 'stats' && (
          <div className="tab-content">
            <h3>System Statistics</h3>
            {/* Stats will go here */}
          </div>
        )}
        {activeTab === 'scores' && (
          <div className="tab-content">
            <h3>Game Scores</h3>
            {/* Game scores will go here */}
          </div>
        )}
      </div>
    </div>
  )
}
