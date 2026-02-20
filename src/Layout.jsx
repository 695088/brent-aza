import { Outlet, NavLink } from 'react-router-dom';

const navStyle = {
  position: 'sticky',
  top: 0,
  zIndex: 100,
  background: 'rgba(10, 15, 30, 0.95)',
  backdropFilter: 'blur(10px)',
  borderBottom: '1px solid rgba(255,255,255,0.08)',
  padding: '0.75rem 1.5rem',
};

const innerStyle = {
  maxWidth: 1200,
  margin: '0 auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '1.5rem',
};

const logoStyle = {
  fontFamily: "'Playfair Display', serif",
  fontWeight: 700,
  fontSize: '1.35rem',
  color: '#f0fdf4',
  letterSpacing: '-0.02em',
};

const accentStyle = { color: '#4ade80' };

const navLinksStyle = {
  display: 'flex',
  gap: '0.25rem',
  flexWrap: 'wrap',
};

const linkStyle = {
  padding: '0.5rem 1rem',
  borderRadius: '8px',
  fontSize: '0.9rem',
  fontWeight: 600,
  color: '#94a3b8',
  transition: 'all 0.2s',
};

export default function Layout() {
  return (
    <>
      <nav style={navStyle}>
        <div style={innerStyle}>
          <NavLink
            to="/"
            style={({ isActive }) => ({
              ...logoStyle,
              color: isActive ? '#4ade80' : '#f0fdf4',
            })}
          >
            Pantry<span style={accentStyle}>Pal</span>
          </NavLink>
          <div style={navLinksStyle}>
            <NavLink
              to="/"
              end
              style={({ isActive }) => ({
                ...linkStyle,
                color: isActive ? '#4ade80' : '#94a3b8',
                background: isActive ? 'rgba(74, 222, 128, 0.12)' : 'transparent',
              })}
            >
              Home
            </NavLink>
            <NavLink
              to="/product"
              style={({ isActive }) => ({
                ...linkStyle,
                color: isActive ? '#4ade80' : '#94a3b8',
                background: isActive ? 'rgba(74, 222, 128, 0.12)' : 'transparent',
              })}
            >
              Product
            </NavLink>
            <NavLink
              to="/survey"
              style={({ isActive }) => ({
                ...linkStyle,
                color: isActive ? '#4ade80' : '#94a3b8',
                background: isActive ? 'rgba(74, 222, 128, 0.12)' : 'transparent',
              })}
            >
              Survey
            </NavLink>
            <NavLink
              to="/results"
              style={({ isActive }) => ({
                ...linkStyle,
                color: isActive ? '#4ade80' : '#94a3b8',
                background: isActive ? 'rgba(74, 222, 128, 0.12)' : 'transparent',
              })}
            >
              Results
            </NavLink>
            <NavLink
              to="/dashboard"
              style={({ isActive }) => ({
                ...linkStyle,
                color: isActive ? '#4ade80' : '#94a3b8',
                background: isActive ? 'rgba(74, 222, 128, 0.12)' : 'transparent',
              })}
            >
              Dashboard
            </NavLink>
          </div>
        </div>
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  );
}
