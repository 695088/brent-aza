import { Link } from 'react-router-dom';

const wrap = {
  minHeight: '100vh',
  background: 'linear-gradient(160deg, #0a0f1e 0%, #0d1a2e 40%, #0a1628 100%)',
  color: '#f0fdf4',
  fontFamily: "'DM Sans', sans-serif",
};

const hero = {
  padding: '4rem 1.5rem 5rem',
  textAlign: 'center',
  maxWidth: 720,
  margin: '0 auto',
};

const badge = {
  display: 'inline-block',
  padding: '6px 16px',
  borderRadius: '99px',
  background: 'rgba(74, 222, 128, 0.15)',
  border: '1px solid rgba(74, 222, 128, 0.4)',
  color: '#4ade80',
  fontSize: '0.8rem',
  fontWeight: 600,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  marginBottom: '1.25rem',
};

const title = {
  fontFamily: "'Playfair Display', serif",
  fontWeight: 900,
  fontSize: 'clamp(2.5rem, 8vw, 4rem)',
  letterSpacing: '-0.03em',
  lineHeight: 1.1,
  marginBottom: '1rem',
};

const subtitle = {
  fontSize: '1.15rem',
  color: '#94a3b8',
  lineHeight: 1.7,
  marginBottom: '2rem',
};

const tagline = {
  fontSize: '1rem',
  color: '#64748b',
  fontStyle: 'italic',
};

const cardsWrap = {
  maxWidth: 1000,
  margin: '0 auto',
  padding: '0 1.5rem 4rem',
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
  gap: '1.5rem',
};

const card = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '16px',
  padding: '1.75rem',
  transition: 'all 0.25s',
  cursor: 'pointer',
  textDecoration: 'none',
  color: 'inherit',
  display: 'block',
};

const cardTitle = {
  fontFamily: "'Playfair Display', serif",
  fontSize: '1.25rem',
  fontWeight: 700,
  marginBottom: '0.5rem',
  color: '#f0fdf4',
};

const cardDesc = {
  fontSize: '0.9rem',
  color: '#94a3b8',
  lineHeight: 1.6,
};

const cardAccent = { color: '#4ade80' };

export default function Home() {
  return (
    <div style={wrap}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;600;700&display=swap');
        .home-card:hover {
          transform: translateY(-4px);
          border-color: rgba(74, 222, 128, 0.25);
          box-shadow: 0 12px 40px rgba(0,0,0,0.3);
        }
      `}</style>
      <section style={hero}>
        <div style={badge}>Product Launch</div>
        <h1 style={title}>
          Pantry<span style={{ color: '#4ade80' }}>Pal</span>
        </h1>
        <p style={subtitle}>
          Stop throwing money in the trash. Track expiration dates, get AI meal suggestions from what you already have, and cut household food waste.
        </p>
        <p style={tagline}>Smart expiration tracker & meal suggester</p>
      </section>

      <section style={cardsWrap}>
        <Link
          to="/product"
          className="home-card"
          style={card}
        >
          <h2 style={cardTitle}>Product Strategy</h2>
          <p style={cardDesc}>
            Business analysis, SWOT, Lean Canvas, competitive landscape, and revenue estimates for <span style={cardAccent}>PantryPal</span>.
          </p>
        </Link>
        <Link
          to="/survey"
          className="home-card"
          style={card}
        >
          <h2 style={cardTitle}>Customer Survey</h2>
          <p style={cardDesc}>
            Take the 3-minute discovery survey. Your input shapes the product — demographics, buying factors, and download intent.
          </p>
        </Link>
        <Link
          to="/results"
          className="home-card"
          style={card}
        >
          <h2 style={cardTitle}>Survey Results</h2>
          <p style={cardDesc}>
            Correlation matrix and insights from 160 respondents. See what drives adoption and who’s most likely to download.
          </p>
        </Link>
        <Link
          to="/dashboard"
          className="home-card"
          style={card}
        >
          <h2 style={cardTitle}>Analysis Dashboard</h2>
          <p style={cardDesc}>
            Interactive dashboard with demographics, constructs, relationships, correlation matrix, and insights from <span style={cardAccent}>160 survey responses</span>.
          </p>
        </Link>
      </section>
    </div>
  );
}
