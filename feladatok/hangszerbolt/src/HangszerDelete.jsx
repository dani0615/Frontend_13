import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import axios from 'axios';

export const HangszerDelete = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [hangszer, setHangszer] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:3001/instruments/${id}`)
            .then(response => {
                setHangszer(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Hiba a hangszer lekérdezésekor:', error);
                setLoading(false);
            });
    }, [id]);

    const handleDelete = () => {
        axios.delete(`http://localhost:3001/instruments/${id}`)
            .then(response => {
                alert('Sikeres törlés! Törölt hangszer: ' + response.data.name);
                navigate('/');
            })
            .catch(error => {
                console.error('Hiba a törlés során:', error);
                alert('Hiba történt a törlés során!');
            });
    };

    if (loading) return <div className="text-center p-5"><div className="spinner-border"></div></div>;

    if (!hangszer) return <div className="alert alert-danger">Hangszer nem található!</div>;

    return (
        <div className="card shadow border-0 mx-auto mt-5" style={{ maxWidth: '500px' }}>
            <div className="card-body p-5 text-center">
                <div className="mb-4">
                    <i className="bi bi-exclamation-triangle text-danger" style={{ fontSize: '4rem' }}></i>
                </div>
                <h3 className="fw-bold mb-3">Biztosan törölni szeretné?</h3>
                <p className="text-muted mb-4">
                    A(z) <strong>{hangszer.name}</strong> véglegesen törölve lesz a rendszerből. Ez a művelet nem vonható vissza.
                </p>
                <div className="d-flex gap-2 justify-content-center">
                    <button onClick={handleDelete} className="btn btn-danger px-4 py-2">
                        <i className="bi bi-trash me-2"></i>Igen, törlés
                    </button>
                    <button onClick={() => navigate('/')} className="btn btn-outline-secondary px-4 py-2">
                        Mégse
                    </button>
                </div>
            </div>
        </div>
    );
};