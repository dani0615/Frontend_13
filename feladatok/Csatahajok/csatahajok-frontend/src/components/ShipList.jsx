import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

export const ShipList = () => {
    const [ships, setShips] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:5014/api/Hajo/All')
            .then(response => {
                setShips(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Hiba a hajók lekérdezésekor:', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
                <div className="spinner-grow text-primary" role="status">
                    <span className="visually-hidden">Betöltés...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container">
            <h1 className="text-center mb-4 fw-bold">Csatahajók:</h1>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {ships.map((ship) => (
                    <div className="col" key={ship.nev}>
                        <div 
                            className="card h-100 shadow-sm border-0 transition-all" 
                            style={{ cursor: 'pointer' }}
                            onClick={() => navigate(`/ship/${ship.nev}`)}
                        >
                            <div className="card-body d-flex flex-column justify-content-center align-items-center p-5">
                                <h4 className="card-title fw-bold text-center mb-4">{ship.nev}</h4>
                                <button className="btn btn-outline-primary shadow-sm px-4">
                                    <i className="bi bi-info-circle me-1"></i> Részletek
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
