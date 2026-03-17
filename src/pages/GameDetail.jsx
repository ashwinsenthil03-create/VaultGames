import { useParams, useNavigate } from 'react-router-dom';
import { getById, finalPrice } from '../data/games';
import { useCartStore } from '../store/cartStore';

function StarRating({ rating }) {
  return (
    <div style={{ display: 'flex', gap: '3px', alignItems: 'center' }}>
      {[1,2,3,4,5].map(i => (
        <span key={i} style={{ color: i <= Math.round(rating) ? '#fbbf24' : '#1a2030', fontSize: '14px' }}>★</span>
      ))}
      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#64748b', marginLeft: '6px' }}>
        {rating} ({(Math.round(Number(String(Math.floor(Math.random()*9+1))+'00') / 100 * 1000) / 10).toFixed(0)}k reviews)
      </span>
    </div>
  );
}

export default function GameDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const game = getById(id);
  const { addItem, hasItem } = useCartStore();

  if (!game) return (
    <div style={{ background: '#080b12', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ fontFamily: "'JetBrains Mono', monospace", color: '#334155' }}>Game not found.</div>
    </div>
  );

  const inCart = hasItem(game.id);
  const price = finalPrice(game);

  return (
    <div style={{ background: '#080b12', minHeight: '100vh', color: '#e2e8f0' }}>

      {/* Hero */}
      <div style={{ position: 'relative', height: '380px', overflow: 'hidden' }}>
        <img src={game.hero} alt={game.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.35 }}
          onError={e => e.target.style.opacity = '0'}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(transparent 40%, #080b12 100%)',
        }} />
        <button
          onClick={() => navigate(-1)}
          style={{
            position: 'absolute', top: '24px', left: '32px',
            background: 'rgba(10,12,18,0.8)', border: '1px solid #1a2030',
            color: '#64748b', borderRadius: '8px', padding: '8px 16px',
            fontFamily: "'JetBrains Mono', monospace", fontSize: '11px',
            cursor: 'pointer', letterSpacing: '1px',
          }}
        >← BACK</button>
      </div>

      {/* Content */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 48px 80px', marginTop: '-80px', position: 'relative' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '48px', alignItems: 'start' }}>

          {/* Left */}
          <div>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
              {game.genre.map(g => (
                <span key={g} style={{
                  fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', letterSpacing: '2px',
                  background: '#60a5fa22', color: '#60a5fa', border: '1px solid #60a5fa33',
                  padding: '3px 10px', borderRadius: '4px',
                }}>{g.toUpperCase()}</span>
              ))}
            </div>

            <h1 style={{
              fontFamily: "'Bebas Neue', cursive", fontSize: '56px', lineHeight: 1,
              color: '#f1f5f9', letterSpacing: '2px', marginBottom: '16px',
            }}>{game.title}</h1>

            <StarRating rating={game.rating} />

            <div style={{ display: 'flex', gap: '24px', margin: '20px 0 28px', flexWrap: 'wrap' }}>
              <MetaItem label="Developer" value={game.developer} />
              <MetaItem label="Release" value={game.releaseDate} />
              <MetaItem label="Tags" value={game.tags.join(', ')} />
            </div>

            <p style={{
              fontFamily: "'Syne', sans-serif", fontSize: '14px', color: '#94a3b8',
              lineHeight: 1.8, marginBottom: '32px',
            }}>{game.description}</p>

            <div style={{
              borderTop: '1px solid #1a2030', paddingTop: '28px',
              fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', color: '#334155', letterSpacing: '1px',
            }}>
              SYSTEM REQUIREMENTS — Windows 10/11 · 8GB RAM · GTX 970 / RX 480 · 70GB Storage
            </div>
          </div>

          {/* Right - Buy Card */}
          <div style={{
            background: '#0f1520', border: '1px solid #1a2030',
            borderRadius: '16px', padding: '28px', position: 'sticky', top: '80px',
          }}>
            <img src={game.cover} alt={game.title}
              style={{ width: '100%', borderRadius: '10px', marginBottom: '20px', display: 'block' }}
              onError={e => e.target.style.display = 'none'}
            />

            <div style={{ marginBottom: '20px' }}>
              {game.discount > 0 && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                  <span style={{
                    background: '#22c55e', color: '#080b12',
                    fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', fontWeight: 700,
                    padding: '2px 8px', borderRadius: '4px',
                  }}>-{game.discount}%</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '13px', color: '#475569', textDecoration: 'line-through' }}>
                    ${game.price.toFixed(2)}
                  </span>
                </div>
              )}
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '32px', fontWeight: 700, color: '#60a5fa' }}>
                ${price}
              </div>
            </div>

            <button
              onClick={() => addItem(game)}
              style={{
                width: '100%', padding: '14px',
                background: inCart ? '#1a3020' : '#1e3a5f',
                border: `1px solid ${inCart ? '#22c55e55' : '#60a5fa55'}`,
                color: inCart ? '#22c55e' : '#60a5fa',
                borderRadius: '10px', marginBottom: '10px',
                fontFamily: "'Bebas Neue', cursive", fontSize: '18px', letterSpacing: '3px',
                cursor: inCart ? 'default' : 'pointer', transition: 'all 0.15s',
              }}
            >
              {inCart ? '✓ ADDED TO CART' : 'ADD TO CART'}
            </button>

            <button
              onClick={() => { addItem(game); navigate('/cart'); }}
              style={{
                width: '100%', padding: '14px',
                background: '#60a5fa', border: 'none', color: '#080b12',
                borderRadius: '10px',
                fontFamily: "'Bebas Neue', cursive", fontSize: '18px', letterSpacing: '3px',
                cursor: 'pointer', transition: 'all 0.15s',
              }}
            >
              BUY NOW
            </button>

            <div style={{
              marginTop: '16px', fontFamily: "'JetBrains Mono', monospace",
              fontSize: '10px', color: '#334155', textAlign: 'center', letterSpacing: '1px',
            }}>
              SECURE CHECKOUT · INSTANT DELIVERY
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetaItem({ label, value }) {
  return (
    <div>
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', color: '#334155', letterSpacing: '2px', marginBottom: '4px' }}>{label.toUpperCase()}</div>
      <div style={{ fontFamily: "'Syne', sans-serif", fontSize: '13px', color: '#64748b' }}>{value}</div>
    </div>
  );
}
