import { useEffect, useState } from 'react'
import api from '../../utils/api'
import './AdminPanel.css'

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('users')
  const [users, setUsers] = useState([])
  const [scores, setScores] = useState([])
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [words, setWords] = useState([])
  const [newWord, setNewWord] = useState('')

  const fetchAdminData = async () => {
    try {
      setLoading(true)

      const [usersRes, scoresRes, statsRes, wordsRes] = await Promise.all([
        api.get('/admin/users'),
        api.get('/admin/game-scores'),
        api.get('/admin/stats'),
        api.get('/admin/words'),
      ])

      setUsers(usersRes.data)
      setScores(scoresRes.data)
      setStats(statsRes.data)
      setWords(wordsRes.data)
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

  const handleAddWord = async (event) => {
  event.preventDefault();

  try {
    await api.post('/admin/words', { value: newWord });
    setNewWord('');
    fetchAdminData();
  } catch (error) {
    console.error('Failed to add word:', error);
  }
};

const handleToggleWord = async (word) => {
  try {
    await api.patch(`/admin/words/${word._id}`, {
      active: !word.active,
    });
    fetchAdminData();
  } catch (error) {
    console.error('Failed to update word:', error);
  }
};

const handleDeleteWord = async (id) => {
  try {
    await api.delete(`/admin/words/${id}`);
    fetchAdminData();
  } catch (error) {
    console.error('Failed to delete word:', error);
  }
};

  if (loading) {
    return <div className="admin-container"><h2>Admin Panel</h2><p>Loading...</p></div>
  }

  return (
    <div className="admin-container">
      <h2>Admin Paneeli</h2>

      <div className="admin-tabs">
        <button
          className={activeTab === 'users' ? 'active' : ''}
          onClick={() => setActiveTab('users')}
        >
          Hallitse käyttäjiä
        </button>

        <button
          className={activeTab === 'scores' ? 'active' : ''}
          onClick={() => setActiveTab('scores')}
        >
          Pelatut pelit
        </button>

        <button
          className={activeTab === 'stats' ? 'active' : ''}
          onClick={() => setActiveTab('stats')}
        >
          Statistiikat
        </button>

        <button
          className={activeTab === 'words' ? 'active' : ''}
          onClick={() => setActiveTab('words')}
        >
          Hallitse sanoja
        </button>
      </div>

      <div className="admin-content">
        {activeTab === 'users' && (
          <div className="tab-content">
            <h3>Hallitse käyttäjiä</h3>

            <table>
              <thead>
                <tr>
                  <th>Käyttäjänimi</th>
                  <th>Admin</th>
                  <th>Toiminnot</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.username}</td>
                    <td>{user.isAdmin ? 'Kyllä' : 'Ei'}</td>
                    <td>
                      <button onClick={() => handleToggleAdmin(user._id, user.isAdmin)}>
                        {user.isAdmin ? 'Poista Admin' : 'Tee Admin'}
                      </button>
                      <button onClick={() => handleDeleteUser(user._id)}>
                        Poista
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
            <h3>Pelatut pelit</h3>

            <table>
              <thead>
                <tr>
                  <th>Käyttäjä</th>
                  <th>Sana</th>
                  <th>Yritykset</th>
                  <th>Aika</th>
                  <th>Toiminnot</th>
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
                        Poista
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
            <h3>Statistiikat</h3>

            {stats && (
              <div className="stats-grid">
                <div>Rekisteröidyt käyttäjät: {stats.totalUsers}</div>
                <div>Pelatut pelit: {stats.totalScores}</div>
                <div>
                  Paras tulos:{' '}
                  {stats.bestScore
                    ? `${stats.bestScore.attempts} arvaus`
                    : 'Ei tuloksia'}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'words' && (
          <div className="tab-content">
            <h3>Sana-tietokanta</h3>

            <form onSubmit={handleAddWord}>
              <input
                value={newWord}
                onChange={(event) => setNewWord(event.target.value)}
                maxLength={5}
                placeholder="Lisää 5-kirjaiminen sana"
              />
              <button type="submit">Lisää sana</button>
            </form>

            <table>
              <thead>
                <tr>
                  <th>Sana</th>
                  <th>Aktiivinen</th>
                  <th>Toiminnot</th>
                </tr>
              </thead>
              <tbody>
                {words.map((word) => (
                  <tr key={word._id}>
                    <td>{word.value}</td>
                    <td>{word.active ? 'Kyllä' : 'Ei'}</td>
                    <td>
                      <button onClick={() => handleToggleWord(word)}>
                        {word.active ? 'Käytössä' : 'Ei käytössä'}
                      </button>
                      <button onClick={() => handleDeleteWord(word._id)}>
                        Poista
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
