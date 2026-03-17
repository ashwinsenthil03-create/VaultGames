import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { games, getFeatured, getDiscounted, finalPrice } from '../data/games';
import { useCartStore } from '../store/cartStore';
import GameCard from '../components/GameCard';

const GENRES = ['All', 'RPG', 'Action', 'Adventure', 'Strategy', 'Platformer', 'Roguelike'];

export default function Home() {
  const [activeGenre, setActiveGenre] = useState('All');
  const [search, setSearch] = useState('');
  const featured = getFeatured();
  const [heroIdx, setHeroIdx] = useState(0);
  const hero = featured[heroIdx];
  const { addItem, hasItem } = useCartStore();
  const navigate = useNavigate();

  const filtered = games.filter(g => {
    const matchGenre = activeGenre === 'All' || g.genre.includes(activeGenre);
    const matchSearch = g.title.toLowerCase().includes(search.toLowerCase());
    return matchGenre && matchSearch;
  });

  return (
    <div style={{ background: '#080b12', minHeight: '100vh', color: '#e2e8f0' }}>

      {/* Hero Banner */}
      <div style={{
        position: 'relative', height: '480px', overflow: 'hidden',
        background: '#0a0c18',
      }}>
        <img
          src={hero.hero}
          alt={hero.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4 }}
          onError={e => e.target.style.opacity = '0'}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(90deg, rgba(8,11,18,0.97) 0%, rgba(8,11,18,0.6) 50%, transparent 100%)',
        }} />
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          background: 'linear-gradient(transparent, #080b12)',
          height: '120px',
        }} />

        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', padding: '0 64px' }}>
          <div style={{ maxWidth: '520px' }}>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
              {hero.genre.map(g => (
                <span key={g} style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '10px', letterSpacing: '2px',
                  background: '#60a5fa22', color: '#60a5fa',
                  border: '1px solid #60a5fa33',
                  padding: '3px 10px', borderRadius: '4px',
                }}>{g.toUpperCase()}</span>
              ))}
            </div>

            <h1 style={{
              fontFamily: "'Bebas Neue', cursive",
              fontSize: '64px', lineHeight: 1, color: '#f1f5f9',
              letterSpacing: '2px', marginBottom: '16px',
            }}>{hero.title}</h1>

            <p style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: '14px', color: '#94a3b8', lineHeight: 1.7,
              marginBottom: '28px', maxWidth: '420px',
            }}>{hero.description.slice(0, 160)}...</p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div>
                {hero.discount > 0 && (
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', color: '#475569', textDecoration: 'line-through' }}>
                    ${hero.price.toFixed(2)}
                  </div>
                )}
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '28px', fontWeight: 700, color: '#60a5fa' }}>
                  ${finalPrice(hero)}
                </div>
              </div>

              <button
                onClick={() => navigate(`/game/${hero.id}`)}
                style={{
                  background: '#60a5fa', color: '#080b12',
                  border: 'none', borderRadius: '8px', padding: '12px 28px',
                  fontFamily: "'Bebas Neue', cursive", fontSize: '18px', letterSpacing: '2px',
                  cursor: 'pointer', transition: 'all 0.15s',
                }}
              >
                VIEW GAME
              </button>

              <button
                onClick={() => addItem(hero)}
                style={{
                  background: hasItem(hero.id) ? '#1a3020' : 'transparent',
                  color: hasItem(hero.id) ? '#22c55e' : '#60a5fa',
                  border: `1px solid ${hasItem(hero.id) ? '#22c55e44' : '#60a5fa44'}`,
                  borderRadius: '8px', padding: '12px 24px',
                  fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', letterSpacing: '1px',
                  cursor: 'pointer',
                }}
              >
                {hasItem(hero.id) ? '✓ IN CART' : '+ ADD TO CART'}
              </button>
            </div>
          </div>
        </div>

        {/* Hero switcher dots */}
        <div style={{ position: 'absolute', bottom: '24px', right: '64px', display: 'flex', gap: '8px' }}>
          {featured.map((_, i) => (
            <button key={i} onClick={() => setHeroIdx(i)} style={{
              width: i === heroIdx ? '24px' : '8px', height: '8px',
              borderRadius: '4px', border: 'none',
              background: i === heroIdx ? '#60a5fa' : '#2a3550',
              cursor: 'pointer', transition: 'all 0.2s',
            }} />
          ))}
        </div>
      </div>

      {/* Filters & Search */}
      <div style={{ padding: '40px 48px 0', display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search games..."
          style={{
            background: '#0f1520', border: '1px solid #1a2030',
            borderRadius: '8px', padding: '9px 16px',
            fontFamily: "'Syne', sans-serif", fontSize: '13px', color: '#e2e8f0',
            outline: 'none', width: '220px',
          }}
        />
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {GENRES.map(g => (
            <button key={g} onClick={() => setActiveGenre(g)} style={{
              background: activeGenre === g ? '#1e3a5f' : 'transparent',
              border: `1px solid ${activeGenre === g ? '#60a5fa44' : '#1a2030'}`,
              color: activeGenre === g ? '#60a5fa' : '#475569',
              borderRadius: '6px', padding: '7px 14px',
              fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', letterSpacing: '1px',
              cursor: 'pointer', transition: 'all 0.15s',
            }}>{g.toUpperCase()}</button>
          ))}
        </div>
      </div>

      {/* On Sale Section */}
      {activeGenre === 'All' && !search && (
        <div style={{ padding: '40px 48px 0' }}>
          <SectionTitle>On Sale</SectionTitle>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px', marginTop: '20px' }}>
            {getDiscounted().map(g => <GameCard key={g.id} game={g} />)}
          </div>
        </div>
      )}

      {/* All / Filtered Games */}
      <div style={{ padding: '40px 48px 64px' }}>
        <SectionTitle>{activeGenre === 'All' && !search ? 'All Games' : `Results (${filtered.length})`}</SectionTitle>
        {filtered.length === 0 ? (
          <div style={{ fontFamily: "'JetBrains Mono', monospace", color: '#334155', marginTop: '40px', textAlign: 'center' }}>
            No games found.
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px', marginTop: '20px' }}>
            {filtered.map(g => <GameCard key={g.id} game={g} />)}
          </div>
        )}
      </div>
    </div>
  );
}

function SectionTitle({ children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <div style={{ width: '3px', height: '20px', background: '#60a5fa', borderRadius: '2px' }} />
      <span style={{ fontFamily: "'Bebas Neue', cursive", fontSize: '22px', letterSpacing: '2px', color: '#94a3b8' }}>
        {children}
      </span>
    </div>
  );
}
