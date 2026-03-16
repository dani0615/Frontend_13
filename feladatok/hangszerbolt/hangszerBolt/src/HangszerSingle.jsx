import React, { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import axios from 'axios';

export const HangszerSingle = () => {
    const { id } = useParams();
    const [instrument, setInstrument] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:3001/instruments/${id}`)
            .then(response => {
                setInstrument(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Hiba a hangszer lekérdezésekor:', error);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Betöltés...</span>
                </div>
            </div>
        );
    }

    if (!instrument) {
        return <div className="alert alert-danger">A hangszer nem található!</div>;
    }

    return (
        <div className="card shadow border-0 overflow-hidden mx-auto mt-4" style={{ maxWidth: '900px' }}>
            <div className="row g-0">
                <div className="col-md-6 bg-light d-flex align-items-center justify-content-center p-4">
                    <img 
                        src={instrument.imageURL || "https://placehold.co/600x400?text=Nincs+kép"} 
                        className="img-fluid rounded" 
                        alt={instrument.name} 
                        style={{ maxHeight: '400px', objectFit: 'contain' }}
                    />
                </div>
                <div className="col-md-6">
                    <div className="card-body p-4 h-100 d-flex flex-column">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb small">
                                <li className="breadcrumb-item"><NavLink to="/">Kezdőlap</NavLink></li>
                                <li className="breadcrumb-item active">{instrument.brand}</li>
                            </ol>
                        </nav>
                        <h2 className="card-title fw-bold mb-3">{instrument.name}</h2>
                        <div className="mb-4">
                            <span className="badge bg-secondary me-2">{instrument.brand}</span>
                            <span className={`badge ${instrument.quantity > 0 ? 'bg-success' : 'bg-danger'}`}>
                                {instrument.quantity > 0 ? 'Készleten' : 'Elfogyott'}
                            </span>
                        </div>
                        <h3 className="text-primary fw-bold mb-4">{instrument.price.toLocaleString()} Ft</h3>
                        
                        <div className="mt-auto pt-4 border-top">
                            <ul className="list-unstyled mb-4">
                                <li><i className="bi bi-check2-circle text-success me-2"></i>Eredeti minőség</li>
                                <li><i className="bi bi-truck text-muted me-2"></i>Gyors kiszállítás</li>
                                <li><i className="bi bi-shield-check text-muted me-2"></i>2 év garancia</li>
                            </ul>
                            
                            <div className="d-flex gap-2">
                                <NavLink to="/" className="btn btn-outline-secondary px-4">
                                    <i className="bi bi-arrow-left me-1"></i> Vissza
                                </NavLink>
                                <NavLink to={`/modosit-hangszer/${instrument.id}`} className="btn btn-warning px-4 flex-grow-1">
                                    <i className="bi bi-pencil-square me-1"></i> Módosítás
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
