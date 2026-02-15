import { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import './App.css';

const API_BASE = 'http://localhost:5222';

// SHA-256 Utility function
async function sha256(message) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(localStorage.getItem('jwt_token') || '');
  const [tokenData, setTokenData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setTokenData(decoded);
      } catch (err) {
        console.error("Invalid token:", err);
        handleLogout();
      }
    }
  }, [token]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // 1. Get Salt from Backend
      const saltResponse = await axios.get(`${API_BASE}/Login/GetSalt`, {
        params: { loginName: username }
      });
      const salt = saltResponse.data;

      // 2. Hash the password (standard SHA256)
      const passwordHash = await sha256(password);

      // 3. Login with username and the hashed password
      // Note: Backend does SHA256(SentHash + Salt)
      const loginResponse = await axios.post(`${API_BASE}/Login/Login`, {
        LoginName: username,
        SentHash: passwordHash
      });

      const receivedToken = loginResponse.data; // Backend returns string
      setToken(receivedToken);
      localStorage.setItem('jwt_token', receivedToken);

      console.log("Login successful, token received.");
    } catch (err) {
      console.error("Login failed:", err);
      setError(err.response?.data || 'Hibás felhasználónév vagy jelszó!');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setToken('');
    setTokenData(null);
    localStorage.removeItem('jwt_token');
  };

  if (token && tokenData) {
    return (
      <div className="dashboard">
        <div className="dashboard-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h1>Üdvözöljük, {tokenData.unique_name || tokenData.username || 'Felhasználó'}!</h1>
              <p style={{ color: 'var(--text-secondary)' }}>Sikeresen bejelentkezve a rendszerbe.</p>
            </div>
            <button className="logout-btn" onClick={handleLogout}>Kijelentkezés</button>
          </div>

          <div className="user-data">
            <div className="data-item">
              <div className="data-label">Felhasználói azonosító (Sub)</div>
              <div className="data-value">{tokenData.sub}</div>
            </div>
            <div className="data-item">
              <div className="data-label">Szerepkör (Role)</div>
              <div className="data-value">{tokenData.role || 'Nincs megadva'}</div>
            </div>
            <div className="data-item">
              <div className="data-label">Bejelentkezve</div>
              <div className="data-value">{new Date(tokenData.iat * 1000).toLocaleString('hu-HU')}</div>
            </div>
            <div className="data-item">
              <div className="data-label">Lejárat</div>
              <div className="data-value">{tokenData.exp ? new Date(tokenData.exp * 1000).toLocaleString('hu-HU') : 'Végtelen'}</div>
            </div>
          </div>

          <div style={{ marginTop: '2.5rem' }}>
            <div className="data-label">JWT Token (Nyers)</div>
            <div className="token-info">
              {token}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Bejelentkezés</h1>
          <p>Kérjük, adja meg hitelesítési adatait</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="username">Felhasználónév</label>
            <div className="input-wrapper">
              <input
                id="username"
                type="text"
                className="login-input"
                placeholder="felhasználónév"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Jelszó</label>
            <div className="input-wrapper">
              <input
                id="password"
                type="password"
                className="login-input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="login-button"
            disabled={isLoading}
          >
            {isLoading ? (
              <><span className="loading-spinner"></span> Belépés...</>
            ) : 'Bejelentkezés'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default App;
