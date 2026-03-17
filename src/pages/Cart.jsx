import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';
import { finalPrice } from '../data/games';

export default function Cart() {
  const { items, removeItem, total, clear } = useCartStore();
  const { user, addToLibrary } = useAuthStore();
  const navigate = useNavigate();
  const [step, setStep] = useState('cart'); // cart | checkout | success

  const handleCheckout = () => {
    if (!user) { navigate('/login'); return; }
    setStep('checkout');
  };

  const handlePurchase = (e) => {
    e.preventDefault();
    items.forEach(g => addToLibrary(g));
    clear();
    setStep('success');
  };

  if (step === 'success') return (
    <div style={{ background: '#080b12', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '24px' }}>
      <div style={{ fontSize: '48px' }}>🎮</div>
      <h2 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: '40px', color: '#22c55e', letterSpacing: '3px' }}>PURCHASE COMPLETE</h2>
      <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '13px', color: '#64748b' }}>Your games have been added to your library.</p>
      <div style={{ display: 'flex', gap: '12px' }}>
        <Link to="/profile" style={{
          background: '#60a5fa', color: '#080b12', borderRadius: '8px', padding: '12px 24px',
          fontFamily: "'Bebas Neue', cursive", fontSize: '18px', letterSpacing: '2px', textDecoration: 'none',
        }}>VIEW LIBRARY</Link>
        <Link to="/" style={{
          background: 'transparent', color: '#60a5fa', border: '1px solid #60a5fa44',
          borderRadius: '8px', padding: '12px 24px',
          fontFamily: "'Bebas Neue', cursive", fontSize: '18px', letterSpacing: '2px', textDecoration: 'none',
        }}>BACK TO STORE</Link>
      </div>
    </div>
  );

  return (
    <div style={{ background: '#080b12', minHeight: '100vh', color: '#e2e8f0', padding: '48px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>

        {/* Steps */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '40px' }}>
          {['cart', 'checkout'].map((s, i) => (
            <div key={s} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '28px', height: '28px', borderRadius: '50%',
                background: step === s ? '#60a5fa' : '#1a2030',
                color: step === s ? '#080b12' : '#334155',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', fontWeight: 700,
              }}>{i + 1}</div>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', letterSpacing: '1px', color: step === s ? '#60a5fa' : '#334155' }}>
                {s.toUpperCase()}
              </span>
              {i === 0 && <div style={{ width: '32px', height: '1px', background: '#1a2030' }} />}
            </div>
          ))}
        </div>

        {step === 'cart' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '32px', alignItems: 'start' }}>
            <div>
              <h2 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: '28px', letterSpacing: '2px', color: '#94a3b8', marginBottom: '20px' }}>
                YOUR CART ({items.length})
              </h2>

              {items.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '80px 0' }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '13px', color: '#334155', marginBottom: '20px' }}>
                    Your cart is empty.
                  </div>
                  <Link to="/" style={{
                    background: '#60a5fa', color: '#080b12', borderRadius: '8px', padding: '10px 24px',
                    fontFamily: "'Bebas Neue', cursive", fontSize: '18px', letterSpacing: '2px', textDecoration: 'none',
                  }}>BROWSE GAMES</Link>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {items.map(game => (
                    <div key={game.id} style={{
                      background: '#0f1520', border: '1px solid #1a2030',
                      borderRadius: '12px', padding: '16px',
                      display: 'flex', gap: '16px', alignItems: 'center',
                    }}>
                      <img src={game.cover} alt={game.title}
                        style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px', flexShrink: 0 }}
                        onError={e => e.target.style.display = 'none'}
                      />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '15px', color: '#e2e8f0', marginBottom: '4px' }}>{game.title}</div>
                        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: '#475569', letterSpacing: '1px' }}>{game.genre.join(' · ')}</div>
                      </div>
                      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '18px', fontWeight: 700, color: '#60a5fa' }}>
                        ${finalPrice(game)}
                      </div>
                      <button
                        onClick={() => removeItem(game.id)}
                        style={{
                          background: 'transparent', border: '1px solid #2a1a1a',
                          color: '#ef4444', borderRadius: '6px', padding: '6px 10px',
                          fontFamily: "'JetBrains Mono', monospace", fontSize: '11px',
                          cursor: 'pointer',
                        }}
                      >✕</button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div style={{
                background: '#0f1520', border: '1px solid #1a2030',
                borderRadius: '16px', padding: '24px', position: 'sticky', top: '80px',
              }}>
                <h3 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: '20px', letterSpacing: '2px', color: '#94a3b8', marginBottom: '20px' }}>ORDER SUMMARY</h3>
                {items.map(g => (
                  <div key={g.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontFamily: "'Syne', sans-serif", fontSize: '12px', color: '#64748b', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginRight: '8px' }}>{g.title}</span>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', color: '#94a3b8' }}>${finalPrice(g)}</span>
                  </div>
                ))}
                <div style={{ borderTop: '1px solid #1a2030', marginTop: '16px', paddingTop: '16px', display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '13px', color: '#94a3b8' }}>TOTAL</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '20px', fontWeight: 700, color: '#60a5fa' }}>${total()}</span>
                </div>
                <button onClick={handleCheckout} style={{
                  width: '100%', marginTop: '20px', padding: '14px',
                  background: '#60a5fa', border: 'none', color: '#080b12',
                  borderRadius: '10px', fontFamily: "'Bebas Neue', cursive",
                  fontSize: '20px', letterSpacing: '3px', cursor: 'pointer',
                }}>CHECKOUT</button>
                {!user && (
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: '#334155', textAlign: 'center', marginTop: '10px' }}>
                    You'll be asked to sign in
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {step === 'checkout' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '32px', alignItems: 'start' }}>
            <div>
              <h2 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: '28px', letterSpacing: '2px', color: '#94a3b8', marginBottom: '28px' }}>PAYMENT DETAILS</h2>
              <form onSubmit={handlePurchase} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <Field label="CARDHOLDER NAME" placeholder="John Doe" />
                <Field label="CARD NUMBER" placeholder="1234 5678 9012 3456" maxLength={19} />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <Field label="EXPIRY" placeholder="MM / YY" />
                  <Field label="CVV" placeholder="···" maxLength={3} type="password" />
                </div>
                <div style={{ borderTop: '1px solid #1a2030', paddingTop: '24px', display: 'flex', gap: '12px' }}>
                  <button type="button" onClick={() => setStep('cart')} style={{
                    background: 'transparent', border: '1px solid #1a2030', color: '#64748b',
                    borderRadius: '10px', padding: '13px 24px',
                    fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', cursor: 'pointer', letterSpacing: '1px',
                  }}>← BACK</button>
                  <button type="submit" style={{
                    flex: 1, padding: '14px',
                    background: '#60a5fa', border: 'none', color: '#080b12',
                    borderRadius: '10px', fontFamily: "'Bebas Neue', cursive",
                    fontSize: '20px', letterSpacing: '3px', cursor: 'pointer',
                  }}>PAY ${total()}</button>
                </div>
              </form>
            </div>

            <div style={{ background: '#0f1520', border: '1px solid #1a2030', borderRadius: '16px', padding: '24px' }}>
              <h3 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: '18px', letterSpacing: '2px', color: '#94a3b8', marginBottom: '16px' }}>
                {items.length} GAME{items.length > 1 ? 'S' : ''}
              </h3>
              {items.map(g => (
                <div key={g.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontFamily: "'Syne', sans-serif", fontSize: '12px', color: '#64748b', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', marginRight: '8px' }}>{g.title}</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', color: '#94a3b8' }}>${finalPrice(g)}</span>
                </div>
              ))}
              <div style={{ borderTop: '1px solid #1a2030', marginTop: '12px', paddingTop: '12px', display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', color: '#64748b' }}>TOTAL</span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '18px', fontWeight: 700, color: '#60a5fa' }}>${total()}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ label, placeholder, maxLength, type = 'text' }) {
  return (
    <div>
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', color: '#334155', letterSpacing: '2px', marginBottom: '8px' }}>{label}</div>
      <input
        type={type}
        placeholder={placeholder}
        maxLength={maxLength}
        required
        style={{
          width: '100%', background: '#0f1520', border: '1px solid #1a2030',
          borderRadius: '8px', padding: '12px 16px',
          fontFamily: "'JetBrains Mono', monospace", fontSize: '13px', color: '#e2e8f0',
          outline: 'none',
        }}
      />
    </div>
  );
}
