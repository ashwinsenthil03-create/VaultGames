import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export default function Login() {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, register } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    const result = mode === 'login'
      ? login(email, password)
      : register(email, username, password);
    if (result.error) setError(result.error);
    else navigate('/profile');
  };

  return (
    <div style={{
      background: '#080b12', minHeight: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{
        background: '#0f1520', border: '1px solid #1a2030',
        borderRadius: '20px', padding: '48px', width: '100%', maxWidth: '420px',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: '28px', color: '#60a5fa', letterSpacing: '4px', marginBottom: '8px' }}>
            VAULTGAMES
          </div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#334155', letterSpacing: '2px' }}>
            {mode === 'login' ? 'SIGN IN TO YOUR ACCOUNT' : 'CREATE YOUR ACCOUNT'}
          </div>
        </div>

        {/* Toggle */}
        <div style={{
          display: 'flex', background: '#080b12', borderRadius: '10px',
          padding: '4px', marginBottom: '28px', border: '1px solid #1a2030',
        }}>
          {['login', 'register'].map(m => (
            <button key={m} onClick={() => { setMode(m); setError(''); }} style={{
              flex: 1, padding: '9px',
              background: mode === m ? '#1e3a5f' : 'transparent',
              border: mode === m ? '1px solid #60a5fa33' : '1px solid transparent',
              color: mode === m ? '#60a5fa' : '#334155',
              borderRadius: '7px',
              fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', letterSpacing: '1px',
              cursor: 'pointer', transition: 'all 0.15s',
            }}>{m === 'login' ? 'SIGN IN' : 'REGISTER'}</button>
          ))}
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <AuthField label="EMAIL" type="email" value={email} onChange={setEmail} placeholder="you@example.com" />
          {mode === 'register' && (
            <AuthField label="USERNAME" value={username} onChange={setUsername} placeholder="coolplayer99" />
          )}
          <AuthField label="PASSWORD" type="password" value={password} onChange={setPassword} placeholder="••••••••" />

          {error && (
            <div style={{
              background: '#2a1a1a', border: '1px solid #ef444433',
              borderRadius: '8px', padding: '10px 14px',
              fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#ef4444',
            }}>{error}</div>
          )}

          <button type="submit" style={{
            marginTop: '8px', padding: '14px',
            background: '#60a5fa', border: 'none', color: '#080b12',
            borderRadius: '10px', fontFamily: "'Bebas Neue', cursive",
            fontSize: '20px', letterSpacing: '3px', cursor: 'pointer',
            transition: 'opacity 0.15s',
          }}>
            {mode === 'login' ? 'SIGN IN' : 'CREATE ACCOUNT'}
          </button>
        </form>

        <div style={{
          marginTop: '24px', textAlign: 'center',
          fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: '#334155', letterSpacing: '1px',
        }}>
          SECURE · ENCRYPTED · NO SPAM
        </div>
      </div>
    </div>
  );
}

function AuthField({ label, type = 'text', value, onChange, placeholder }) {
  return (
    <div>
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', color: '#334155', letterSpacing: '2px', marginBottom: '8px' }}>{label}</div>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        required
        style={{
          width: '100%', background: '#080b12', border: '1px solid #1a2030',
          borderRadius: '8px', padding: '11px 14px',
          fontFamily: "'JetBrains Mono', monospace", fontSize: '13px', color: '#e2e8f0',
          outline: 'none', transition: 'border-color 0.15s',
        }}
        onFocus={e => e.target.style.borderColor = '#60a5fa44'}
        onBlur={e => e.target.style.borderColor = '#1a2030'}
      />
    </div>
  );
}
