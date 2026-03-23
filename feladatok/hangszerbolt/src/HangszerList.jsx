import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

export const HangszerList = () => {
    const [instruments, setInstruments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:3001/instruments')
            .then(response => {
                setInstruments(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Hiba a hangszerek lekérdezésekor:', error);
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
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {instruments.map((instrument) => (
                <div className="col" key={instrument.id}>
                    <div className="card h-100 shadow-sm instrument-card border-0 transition-all">
                        <div className="position-relative overflow-hidden" style={{ height: '250px' }}>
                            <img 
                                src={instrument.imageURL || "https://placehold.co/600x400?text=Nincs+kép"} 
                                className="card-img-top h-100 w-100 object-fit-contain p-3" 
                                alt={instrument.name} 
                            />
                            <div className="position-absolute top-0 end-0 m-2">
                                <span className="badge bg-primary rounded-pill">{instrument.brand}</span>
                            </div>
                        </div>
                        <div className="card-body">
                            <h5 className="card-title fw-bold text-truncate">{instrument.name}</h5>
                            <p className="card-text text-muted mb-1">
                                <span className="fw-bold text-primary">{instrument.price.toLocaleString()} Ft</span>
                            </p>
                            <p className="card-text small mb-3">
                                <i className="bi bi-box me-1"></i> Raktáron: {instrument.quantity} db
                            </p>
                            <div className="d-flex justify-content-between align-items-center">
                                <NavLink to={`/instruments/${instrument.id}`} className="btn btn-sm btn-outline-info">
                                    <i className="bi bi-eye me-1"></i> Részletek
                                </NavLink>
                                <div className="btn-group">
                                    <NavLink to={`/modosit-hangszer/${instrument.id}`} className="btn btn-sm btn-outline-warning">
                                        <i className="bi bi-pencil-square"></i>
                                    </NavLink>
                                    <NavLink to={`/torol-hangszer/${instrument.id}`} className="btn btn-sm btn-outline-danger">
                                        <i className="bi bi-trash"></i>
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
