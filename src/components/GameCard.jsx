import { Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { finalPrice } from '../data/games';

export default function GameCard({ game }) {
  const { addItem, hasItem } = useCartStore();
  const inCart = hasItem(game.id);
  const price = finalPrice(game);

  return (
    <Link to={`/game/${game.id}`} style={{ textDecoration: 'none' }}>
      <div style={{
        background: '#0f1520',
        border: '1px solid #1a2030',
        borderRadius: '12px',
        overflow: 'hidden',
        transition: 'transform 0.2s, border-color 0.2s',
        cursor: 'pointer',
      }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'translateY(-4px)';
          e.currentTarget.style.borderColor = '#2a4070';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.borderColor = '#1a2030';
        }}
      >
        <div style={{ position: 'relative', paddingTop: '56%', background: '#0a0c18' }}>
          <img
            src={game.cover}
            alt={game.title}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
            onError={e => { e.target.style.display = 'none'; }}
          />
          {game.discount > 0 && (
            <div style={{
              position: 'absolute', top: '10px', left: '10px',
              background: '#22c55e', color: '#0a0c12',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '11px', fontWeight: 700,
              padding: '3px 8px', borderRadius: '4px',
            }}>
              -{game.discount}%
            </div>
          )}
        </div>

        <div style={{ padding: '14px' }}>
          <div style={{
            fontFamily: "'Syne', sans-serif", fontWeight: 700,
            fontSize: '14px', color: '#e2e8f0',
            marginBottom: '6px', whiteSpace: 'nowrap',
            overflow: 'hidden', textOverflow: 'ellipsis',
          }}>{game.title}</div>

          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '12px' }}>
            {game.genre.slice(0, 2).map(g => (
              <span key={g} style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '9px', letterSpacing: '1px',
                background: '#1a2030', color: '#60a5fa',
                padding: '2px 7px', borderRadius: '3px',
              }}>{g.toUpperCase()}</span>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              {game.discount > 0 && (
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '11px', color: '#475569',
                  textDecoration: 'line-through',
                }}>${game.price.toFixed(2)}</div>
              )}
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '16px', fontWeight: 700, color: '#60a5fa',
              }}>${price}</div>
            </div>

            <button
              onClick={e => { e.preventDefault(); addItem(game); }}
              style={{
                background: inCart ? '#1a3020' : '#1e3a5f',
                border: `1px solid ${inCart ? '#22c55e44' : '#60a5fa44'}`,
                color: inCart ? '#22c55e' : '#60a5fa',
                borderRadius: '6px', padding: '6px 12px',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '10px', letterSpacing: '1px',
                cursor: inCart ? 'default' : 'pointer',
                transition: 'all 0.15s',
              }}
            >
              {inCart ? '✓ ADDED' : '+ CART'}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
