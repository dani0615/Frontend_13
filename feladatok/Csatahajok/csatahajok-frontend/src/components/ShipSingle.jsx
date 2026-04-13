import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export const ShipSingle = () => {
    const { name } = useParams();
    const navigate = useNavigate();
    const [ship, setShip] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:5014/api/Hajo/ByName/${name}`)
            .then(response => {
                setShip(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Hiba a hajó lekérdezésekor:', error);
                setLoading(false);
            });
    }, [name]);

    if (loading) return <div className="text-center p-5"><div className="spinner-border text-primary"></div></div>;
    if (!ship) return <div className="text-center p-5 text-danger">Hajó nem található!</div>;

    return (
        <div className="container py-4">
            <div className="card shadow border-0 mx-auto" style={{ maxWidth: '600px' }}>
                <div className="card-header bg-primary text-white p-3 text-center">
                    <h2 className="mb-0 fw-bold">{ship.nev}</h2>
                </div>
                <div className="card-body p-4 text-center">
                    <div className="list-group list-group-flush mb-4 shadow-sm rounded">
                        <div className="list-group-item d-flex justify-content-between p-3">
                            <span className="fw-bold">Osztály:</span>
                            <span>{ship.osztaly}</span>
                        </div>
                        <div className="list-group-item d-flex justify-content-between p-3">
                            <span className="fw-bold">Felavatva:</span>
                            <span>{ship.felavatva}</span>
                        </div>
                        <div className="list-group-item d-flex justify-content-between p-3">
                            <span className="fw-bold">Ágyúk száma:</span>
                            <span>{ship.agyukSzama}</span>
                        </div>
                        <div className="list-group-item d-flex justify-content-between p-3">
                            <span className="fw-bold">Kaliber:</span>
                            <span>{ship.kaliber}</span>
                        </div>
                        <div className="list-group-item d-flex justify-content-between p-3">
                            <span className="fw-bold">Vízkiszorítás:</span>
                            <span>{ship.vizkiszoritas.toLocaleString()}</span>
                        </div>
                    </div>
                    <div className="d-grid">
                        <button className="btn btn-outline-secondary btn-lg" onClick={() => navigate('/')}>
                            <i className="bi bi-arrow-left me-2"></i>Vissza a csatahajókhoz
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
