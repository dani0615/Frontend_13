import React, { createContext, useState, useEffect, useContext } from 'react';
import { jwtDecode } from 'jwt-decode';
import { apiClient } from '../services/apiConfig';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Check for existing token on mount
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (token && storedUser) {
            try {
                const decoded = jwtDecode(token);
                const currentTime = Date.now() / 1000;

                if (decoded.exp < currentTime) {
                    // Token expired
                    logout();
                } else {
                    // Token valid
                    setUser(JSON.parse(storedUser));
                }
            } catch (err) {
                logout();
            }
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        setLoading(true);
        setError(null);

        // Mock Logic
        if (import.meta.env.VITE_USE_MOCK_API === 'true') {
            await new Promise(resolve => setTimeout(resolve, 1000)); // Delay szimuláció
            if (email === 'admin@party.hu' && password === 'admin123') {
                const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFkbWluIiwicm9sZSI6ImFkbWluIiwiZXhwIjoyNTI0NjA4MDAwfQ.mock_sig';
                const userData = { username: 'Admin (Mock)', role: 'admin' };
                localStorage.setItem('token', mockToken);
                localStorage.setItem('user', JSON.stringify(userData));
                setUser(userData);
                setLoading(false);
                return { success: true };
            } else {
                setError('Helytelen e-mail vagy jelszó (Mock Mode).');
                setLoading(false);
                return { success: false, error: 'Helytelen e-mail vagy jelszó (Mock Mode).' };
            }
        }

        try {
            const response = await apiClient.post('/Auth/login', { email, password });

            const { token, username, role } = response.data;

            if (token) {
                localStorage.setItem('token', token);
                const userData = { username, role };
                localStorage.setItem('user', JSON.stringify(userData));
                setUser(userData);
                return { success: true };
            } else {
                setError('Nem érkezett token a szervertől.');
                return { success: false, error: 'Nem érkezett token.' };
            }
        } catch (err) {
            const errorMessage = err.response?.data || 'Hiba a bejelentkezés során.';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    const register = async (username, email, password) => {
        setLoading(true);
        setError(null);

        // Mock Logic
        if (import.meta.env.VITE_USE_MOCK_API === 'true') {
            await new Promise(resolve => setTimeout(resolve, 1000));
            return { success: true };
        }

        try {
            await apiClient.post('/api/Registry', { username, email, password });
            return { success: true };
        } catch (err) {
            const errorMessage = err.response?.data || 'Hiba a regisztráció során.';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        setError(null);
    };

    const value = {
        user,
        loading,
        error,
        login,
        register,
        logout,
        isAuthenticated: !!user,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
