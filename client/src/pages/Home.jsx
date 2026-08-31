import { useState, useEffect } from 'react';
import './Home.css';
import api from '../utils/api';
import { useAuth } from '../contexts/AuthContext';

const projects = [
  {
    title: "Päivän Sana",
    description: "Päivän sana -sovellus, jossa on dynaaminen API ja moderni UI.",
    image: "/projects/paivansana.png",
    url: "https://paivansana.fi"
  },
  {
    title: "Kaatajat IG-kampanja",
    description: "Mainoskampanja, jossa vastasin videotuotannosta ja editoinnista.",
    image: "/projects/kaatajat.png",
    url: "https://instagram.com/kaatajatfi"
  },
  {
    title: "Portfolio-sivusto",
    description: "Oma React/Vite-pohjainen portfolio, jossa on CV, sertifikaatit ja projektiesittelyt.",
    image: "/projects/portfolio.png",
    url: ""
  }
];


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
            <h2>CV/Sertifikaatit</h2>
            <a href="/CV.pdf" target="_blank" rel="noopener noreferrer" className="cv-link">
              Avaa CV
            </a>
            <a href="https://www.credly.com/badges/18455a3d-0659-4e4f-b835-5a5ae24d1ba6" target="_blank" rel="noopener noreferrer">
              <img src="/badgehtml.png" alt="HTML/CSS" />
            </a>
            <a href="https://www.credly.com/badges/68b59db5-7dad-4e93-b3e2-8ea679c920db" target="_blank" rel="noopener noreferrer">
              <img src="/badgejs.png" alt="JavaScript" />
            </a>
          </div>

          <div className="portfolio-card">
  <h2>Referenssit</h2>
            <section id="references" style={{ padding: "2rem" }}>


  <div style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "1.5rem",
    marginTop: "1rem"
  }}>
    {projects.map((project, index) => (
      <a
        key={index}
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          textDecoration: "none",
          color: "inherit"
        }}
      >
        <div style={{
          border: "1px solid #ddd",
          padding: "1rem",
          borderRadius: "8px",
          background: "#fafafa",
          transition: "0.2s",
          cursor: "pointer"
        }}>
          {project.image && (
            <img
              src={project.image}
              alt={project.title}
              style={{
                width: "100%",
                borderRadius: "6px",
                marginBottom: "0.75rem"
              }}
            />
          )}

          <h3>{project.title}</h3>
          <p>{project.description}</p>
        </div>
      </a>
    ))}
  </div>
</section>

          </div>
        </div>


      </section>
    </div>
  );
}
