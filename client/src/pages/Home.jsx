import { useState, useEffect } from 'react';
import Wordle from '../components/Game/Wordle';
import './Home.css';
import api from '../utils/api';

export default function Home() {
  const [leaderboard, setLeaderboard] = useState([]);

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
        <button className="btn-primary">KIRJAUDU</button>
        <p className="info-text">CTA rekisteröitymään "Päivän sana" pelin joka on vorde mutta suomalaisilla sanoilla</p>
      </div>

      <div className="game-section">
        <Wordle />
      </div>
    </div>
  );
}
