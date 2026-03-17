import { Link, useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';
import { useState } from 'react';

export default function Navbar() {
  const count = useCartStore(s => s.count)();
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMenuOpen(false);
  };

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: 'rgba(10,12,18,0.92)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid #1a2030',
      padding: '0 32px',
      display: 'flex', alignItems: 'center', height: '60px', gap: '32px'
    }}>
      <Link to="/" style={{ fontFamily: "'Bebas Neue', cursive", fontSize: '22px', color: '#60a5fa', letterSpacing: '3px', textDecoration: 'none' }}>
        VAULTGAMES
      </Link>

      <div style={{ display: 'flex', gap: '24px', flex: 1 }}>
        <Link to="/" style={navLink}>Store</Link>
        <Link to="/" style={navLink}>Browse</Link>
        <Link to="/" style={navLink}>News</Link>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <Link to="/cart" style={{ position: 'relative', textDecoration: 'none' }}>
          <div style={{
            background: '#1a2030', border: '1px solid #2a3550',
            borderRadius: '8px', padding: '7px 14px',
            fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', color: '#94a3b8',
            display: 'flex', alignItems: 'center', gap: '8px',
            transition: 'all 0.15s',
          }}>
            🛒
            {count > 0 && (
              <span style={{
                background: '#60a5fa', color: '#0a0c12',
                borderRadius: '4px', padding: '0 6px',
                fontSize: '11px', fontWeight: 700,
              }}>{count}</span>
            )}
          </div>
        </Link>

        {user ? (
          <div style={{ position: 'relative' }}>
            <button onClick={() => setMenuOpen(o => !o)} style={{
              background: '#1a2030', border: '1px solid #2a3550',
              borderRadius: '8px', padding: '7px 14px',
              fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', color: '#60a5fa',
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px',
            }}>
              <span style={{
                width: '22px', height: '22px', borderRadius: '50%',
                background: '#1e3a5f', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '11px', fontWeight: 700, color: '#60a5fa',
              }}>{user.avatar}</span>
              {user.username}
            </button>
            {menuOpen && (
              <div style={{
                position: 'absolute', right: 0, top: '44px',
                background: '#0f1520', border: '1px solid #1a2030',
                borderRadius: '10px', overflow: 'hidden', minWidth: '160px', zIndex: 200,
              }}>
                <Link to="/profile" onClick={() => setMenuOpen(false)} style={dropLink}>My Profile</Link>
                <Link to="/profile" onClick={() => setMenuOpen(false)} style={dropLink}>Library</Link>
                <div style={{ borderTop: '1px solid #1a2030' }} />
                <button onClick={handleLogout} style={{ ...dropLink, width: '100%', textAlign: 'left', border: 'none', cursor: 'pointer', color: '#f87171' }}>
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" style={{
            background: '#60a5fa', color: '#0a0c12',
            borderRadius: '8px', padding: '7px 18px',
            fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', fontWeight: 700,
            textDecoration: 'none', letterSpacing: '1px',
          }}>
            SIGN IN
          </Link>
        )}
      </div>
    </nav>
  );
}

const navLink = {
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: '12px', color: '#64748b',
  textDecoration: 'none', letterSpacing: '1px',
  transition: 'color 0.15s',
};

const dropLink = {
  display: 'block', padding: '10px 16px',
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: '12px', color: '#94a3b8',
  textDecoration: 'none', background: 'transparent',
  transition: 'background 0.1s',
};
