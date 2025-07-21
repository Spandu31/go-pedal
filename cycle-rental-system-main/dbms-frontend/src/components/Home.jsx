import { useNavigate } from 'react-router-dom';
import logo from '../assets/cycle.png';
import './Home.css';

function Home() {
  const navigate = useNavigate(); // Initialize the navigation function

  const handleExplore = () => {
    navigate('/available-cycles'); // Navigate to the new page
  };

  return (
    <div className="home-container">
      <section className="hero">
        <div className="hero-text">
          <h1>GO PEDAL </h1>
          <h2> Rent a cycle. Ride freely</h2>
          <p>Access affordable bicycles anytime, anywhere.</p>
          <button className="hero-btn" onClick={handleExplore}>Explore Cycles</button>
        </div>
        <div className="hero-image">
          <img src={logo} alt="Cycle" />
        </div>
      </section>

      <section className="features">
        <div className="feature-card">
          <h3>Easy Rentals</h3>
          <p>Pick up a cycle from any docking station easily.</p>
        </div>
        <div className="feature-card">
          <h3>Track Your Ride</h3>
          <p>Stay updated with real-time tracking and trip history.</p>
        </div>
        <div className="feature-card">
          <h3>Affordable Plans</h3>
          <p>Choose from daily, weekly, or monthly rental options.</p>
        </div>
      </section>
    </div>
  );
}

export default Home;
