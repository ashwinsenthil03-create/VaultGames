import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { finalPrice } from '../data/games';

export default function Profile() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  if (!user) return (
    <div style={{ background: '#080b12', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '20px' }}>
      <div style={{ fontFamily: "'JetBrains Mono', monospace", color: '#334155' }}>You are not signed in.</div>
      <Link to="/login" style={{
        background: '#60a5fa', color: '#080b12', borderRadius: '8px', padding: '10px 24px',
        fontFamily: "'Bebas Neue', cursive", fontSize: '18px', letterSpacing: '2px', textDecoration: 'none',
      }}>SIGN IN</Link>
    </div>
  );

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <div style={{ background: '#080b12', minHeight: '100vh', color: '#e2e8f0', padding: '48px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>

        {/* Profile Header */}
        <div style={{
          background: '#0f1520', border: '1px solid #1a2030',
          borderRadius: '16px', padding: '32px',
          display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '32px',
        }}>
          <div style={{
            width: '72px', height: '72px', borderRadius: '50%',
            background: '#1e3a5f', border: '2px solid #60a5fa33',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: "'Bebas Neue', cursive", fontSize: '32px', color: '#60a5fa',
          }}>{user.avatar}</div>

          <div style={{ flex: 1 }}>
            <h2 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: '32px', color: '#f1f5f9', letterSpacing: '2px', marginBottom: '4px' }}>
              {user.username}
            </h2>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#334155', letterSpacing: '1px' }}>
              {user.email} · MEMBER SINCE {user.joinDate}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{ textAlign: 'center', background: '#080b12', borderRadius: '10px', padding: '14px 20px' }}>
              <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: '28px', color: '#60a5fa' }}>{user.library.length}</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', color: '#334155', letterSpacing: '1px' }}>GAMES</div>
            </div>
            <div style={{ textAlign: 'center', background: '#080b12', borderRadius: '10px', padding: '14px 20px' }}>
              <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: '28px', color: '#22c55e' }}>
                ${user.library.reduce((s, g) => s + parseFloat(finalPrice(g)), 0).toFixed(0)}
              </div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', color: '#334155', letterSpacing: '1px' }}>SPENT</div>
            </div>
          </div>

          <button onClick={handleLogout} style={{
            background: 'transparent', border: '1px solid #2a1a1a',
            color: '#ef4444', borderRadius: '8px', padding: '10px 16px',
            fontFamily: "'JetBrains Mono', monospace", fontSize: '11px',
            cursor: 'pointer', letterSpacing: '1px',
          }}>SIGN OUT</button>
        </div>

        {/* Library */}
        <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: '22px', color: '#94a3b8', letterSpacing: '2px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '3px', height: '20px', background: '#60a5fa', borderRadius: '2px' }} />
          MY LIBRARY
        </div>

        {user.library.length === 0 ? (
          <div style={{
            background: '#0f1520', border: '1px dashed #1a2030',
            borderRadius: '16px', padding: '60px', textAlign: 'center',
          }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '13px', color: '#334155', marginBottom: '20px' }}>
              Your library is empty. Purchase games to see them here.
            </div>
            <Link to="/" style={{
              background: '#60a5fa', color: '#080b12', borderRadius: '8px', padding: '10px 24px',
              fontFamily: "'Bebas Neue', cursive", fontSize: '18px', letterSpacing: '2px', textDecoration: 'none',
            }}>BROWSE STORE</Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '16px' }}>
            {user.library.map(game => (
              <Link key={game.id} to={`/game/${game.id}`} style={{ textDecoration: 'none' }}>
                <div style={{
                  background: '#0f1520', border: '1px solid #1a2030',
                  borderRadius: '12px', overflow: 'hidden',
                  transition: 'border-color 0.15s, transform 0.15s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#2a4070'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#1a2030'; e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  <div style={{ position: 'relative', paddingTop: '52%', background: '#0a0c18' }}>
                    <img src={game.cover} alt={game.title}
                      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={e => e.target.style.display = 'none'}
                    />
                    <div style={{
                      position: 'absolute', top: '8px', right: '8px',
                      background: '#1a3020', border: '1px solid #22c55e33',
                      borderRadius: '4px', padding: '2px 8px',
                      fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', color: '#22c55e',
                    }}>OWNED</div>
                  </div>
                  <div style={{ padding: '14px' }}>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '14px', color: '#e2e8f0', marginBottom: '4px' }}>
                      {game.title}
                    </div>
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: '#334155' }}>
                      {game.developer}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
