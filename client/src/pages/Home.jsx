import { useState, useEffect } from 'react';
import Wordle from '../components/Game/Wordle';
import './Home.css';
import api from '../utils/api';
import { useAuth } from '../contexts/AuthContext';

export default function Home() {
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

  return (
    <div className="home-container">
      <section className="home-left">
        <div className="leaderboard-section">
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

          <button className="btn-primary">
            {user ? 'Pelaa peliä' : 'Kirjaudu'}
          </button>

          <p className="info-text">
            CTA rekisteröitymään "Päivän sana" pelin joka on wordle mutta suomalaisilla sanoilla
          </p>
        </div>

        <div className="game-section">
          {user ? (
            <Wordle />
          ) : (
            <div className="locked-game">
              <h3>Play the game</h3>
              <p>Please log in or register to unlock the daily word game.</p>
            </div>
          )}
        </div>
      </section>

      <section className="home-right">
        <div className="portfolio-section">
          <h2>About the owner</h2>
          <p>
            This is your portfolio-style landing section. Add a short profile, project summary,
            technical skills, and a link to your work here.
          </p>

          <div className="portfolio-card">
            <h3>Portfolio Snapshot</h3>
            <p>Frontend developer • React • Node.js • MongoDB</p>
          </div>

          <div className="portfolio-card">
            <h3>Featured Work</h3>
            <p>Show your strongest projects, demo links, or GitHub here.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
