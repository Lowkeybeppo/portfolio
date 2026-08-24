import { useEffect, useState } from 'react'
import api from '../../utils/api'
import './AdminPanel.css'

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('users')
  const [users, setUsers] = useState([])
  const [scores, setScores] = useState([])
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchAdminData = async () => {
    try {
      setLoading(true)

      const [usersRes, scoresRes, statsRes] = await Promise.all([
        api.get('/admin/users'),
        api.get('/admin/game-scores'),
        api.get('/admin/stats'),
      ])

      setUsers(usersRes.data)
      setScores(scoresRes.data)
      setStats(statsRes.data)
    } catch (error) {
      console.error('Failed to load admin data:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAdminData()
  }, [])

  const handleDeleteUser = async (id) => {
    try {
      await api.delete(`/admin/users/${id}`)
      fetchAdminData()
    } catch (error) {
      console.error('Failed to delete user:', error)
    }
  }

  const handleToggleAdmin = async (id, currentValue) => {
    try {
      await api.patch(`/admin/users/${id}`, {
        isAdmin: !currentValue,
      })
      fetchAdminData()
    } catch (error) {
      console.error('Failed to update user admin status:', error)
    }
  }

  const handleDeleteScore = async (id) => {
    try {
      await api.delete(`/admin/game-scores/${id}`)
      fetchAdminData()
    } catch (error) {
      console.error('Failed to delete score:', error)
    }
  }

  if (loading) {
    return <div className="admin-container"><h2>Admin Panel</h2><p>Loading...</p></div>
  }

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
          className={activeTab === 'scores' ? 'active' : ''}
          onClick={() => setActiveTab('scores')}
        >
          Game Scores
        </button>

        <button
          className={activeTab === 'stats' ? 'active' : ''}
          onClick={() => setActiveTab('stats')}
        >
          System Stats
        </button>
      </div>

      <div className="admin-content">
        {activeTab === 'users' && (
          <div className="tab-content">
            <h3>Manage Users</h3>

            <table>
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Admin</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.username}</td>
                    <td>{user.isAdmin ? 'Yes' : 'No'}</td>
                    <td>
                      <button onClick={() => handleToggleAdmin(user._id, user.isAdmin)}>
                        {user.isAdmin ? 'Remove Admin' : 'Make Admin'}
                      </button>
                      <button onClick={() => handleDeleteUser(user._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'scores' && (
          <div className="tab-content">
            <h3>Game Scores</h3>

            <table>
              <thead>
                <tr>
                  <th>User</th>
                  <th>Word</th>
                  <th>Attempts</th>
                  <th>Time</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {scores.map((score) => (
                  <tr key={score._id}>
                    <td>{score.user?.username || 'Unknown'}</td>
                    <td>{score.word}</td>
                    <td>{score.attempts}</td>
                    <td>{score.time}s</td>
                    <td>
                      <button onClick={() => handleDeleteScore(score._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="tab-content">
            <h3>System Statistics</h3>

            {stats && (
              <div className="stats-grid">
                <div>Total users: {stats.totalUsers}</div>
                <div>Total scores: {stats.totalScores}</div>
                <div>
                  Best score:{' '}
                  {stats.bestScore
                    ? `${stats.bestScore.attempts} attempts`
                    : 'None'}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
