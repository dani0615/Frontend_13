import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const { user, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    if (!isAuthenticated) {
        return (
            <div className="container" style={{ textAlign: 'center', marginTop: '100px', color: '#fff' }}>
                <h2>Hoppá! Nem vagy bejelentkezve.</h2>
                <p>A profilod megtekintéséhez kérjük, először jelentkezz be.</p>
                <button
                    className="btn-pulse"
                    onClick={() => navigate('/login')}
                    style={{ marginTop: '20px' }}
                >
                    Bejelentkezés
                </button>
            </div>
        );
    }

    return (
        <section id="profile" className="page active">
            <div className="container">
                <div className="profile-card">
                    <div className="profile-header">
                        <div className="profile-avatar">
                            <i className="fas fa-user-astronaut"></i>
                        </div>
                        <h2 style={{ color: 'var(--primary)', marginBottom: '5px' }}>{user?.username} Profilja</h2>
                        <span style={{
                            background: 'rgba(188, 19, 254, 0.2)',
                            padding: '4px 12px',
                            borderRadius: '15px',
                            fontSize: '0.9rem',
                            border: '1px solid var(--primary)'
                        }}>
                            {user?.role === 'admin' ? '🔥 Adminisztrátor' : '🎉 Party Arc'}
                        </span>
                    </div>

                    <div className="profile-info" style={{ marginTop: '30px', marginBottom: '30px' }}>
                        <div className="profile-info-item">
                            <label>Felhasználónév</label>
                            <span>{user?.username}</span>
                        </div>
                        <div className="profile-info-item">
                            <label>Jogosultság</label>
                            <span>{user?.role || 'user'}</span>
                        </div>
                        <div className="profile-info-item">
                            <label>Státusz</label>
                            <span style={{ color: '#00ff00' }}>Aktív</span>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                        <button
                            className="btn-pulse"
                            style={{ width: '100%' }}
                            onClick={() => alert('Profil szerkesztése hamarosan...')}
                        >
                            Szerkesztés
                        </button>
                        <button
                            className="btn-neon-outline"
                            style={{ width: '100%', borderColor: '#ff4444', color: '#ff4444' }}
                            onClick={() => {
                                logout();
                                navigate('/');
                            }}
                        >
                            Kijelentkezés
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Profile;
