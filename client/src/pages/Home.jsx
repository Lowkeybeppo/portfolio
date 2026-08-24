import { useState, useEffect } from 'react';
import './Home.css';
import api from '../utils/api';
import { useAuth } from '../contexts/AuthContext';

export default function Home({ setCurrentPage, openAuthModal }) {
  const [leaderboard, setLeaderboard] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const response = await api.get('/game/leaderboard');
      setLeaderboard(response.data);
    } catch (error) {
      console.error('Failed to fetch leaderboard:', error);
    }
  };

  const handlePlayClick = () => {
    if (!user) {
      openAuthModal('login');
      return;
    }

    setCurrentPage('game');
  };

  return (
    <div className="home-container">
      <section className="home-left">
        <div className="leaderboard-section">
          <div className="game-launch-card">
            <h1>Päivän sana</h1>
            <p>Kirjaudu sisään pelataksesi!</p><br />
            <button onClick={handlePlayClick} className="btn-primary">
              {user ? 'Pelaa' : 'Kirjaudu sisään'}
            </button>
          </div>

          <h2>Leaderboard</h2>
          <p>Päivän sana pelin leaderboard</p>

          <div className="leaderboard-list">
            {leaderboard.length > 0 ? (
              leaderboard.map((entry, index) => (
                <div key={index} className="leaderboard-item">
                  <span>{index + 1}.</span>
                  <span>{entry.username}</span>
                  <span>{entry.score}</span>
                </div>
              ))
            ) : (
              <p>No scores yet</p>
            )}
          </div>
        </div>
      </section>

      <section className="home-right">
        <div className="portfolio-section">
          <h1>Minusta</h1>
          <img src="/ICT_0825.jpg" alt="Profile" className="profile-image" />
          <p>
            Olen aloitteleva ohjelmistokehittäjä, joka on erikoistunut web-kehitykseen. 
            Minulla on kokemusta Reactista, Node.js:stä ja MongoDB:stä. Tavoitteeni on luoda käyttäjäystävällisiä ja 
            tehokkaita web-sovelluksia. Olen kiinnostunut uusista teknologioista ja jatkuvasti kehittämässä taitojani 
            ohjelmistokehityksen alalla.
          </p>

          <div className="portfolio-card">
            <h3>CV/Sertifikaatit</h3>
            <p>Vitusti cv:tä ja sertejä</p>
          </div>

          <div className="portfolio-card">
            <h3>Referenssit</h3>
            <p>Vitusti referenssejä yooooo!</p>
          </div>
        </div>


      </section>
    </div>
  );
}
