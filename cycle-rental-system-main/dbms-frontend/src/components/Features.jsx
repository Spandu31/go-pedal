const Features = () => {
    const cards = [
      { title: 'Easy Booking', text: 'Book a cycle in seconds via app or web.' },
      { title: 'Affordable Plans', text: 'Flexible pricing for daily to monthly rides.' },
      { title: 'GPS Tracked', text: 'Real-time tracking for safety & navigation.' },
      { title: 'Eco Friendly', text: 'Support green transport with zero emissions.' },
    ];
  
    return (
      <section className="features">
        <h2>
          Why Choose <span>GO PEDAL</span>?
        </h2>
        <div className="feature-cards">
          {cards.map((card, i) => (
            <div key={i} className="card">
              <h3 style={{ color: '#219ebc', marginBottom: '0.5rem' }}>{card.title}</h3>
              <p style={{ fontSize: '0.95rem', color: '#555' }}>{card.text}</p>
            </div>
          ))}
        </div>
      </section>
    );
  };
  
  export default Features;
  