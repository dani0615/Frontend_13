import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export const HangszerUpdate = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [hangszer, setHangszer] = useState({
        name: '',
        brand: '',
        price: 0,
        quantity: 0,
        imageURL: ''
    });
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

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setHangszer(prev => ({
            ...prev,
            [name]: name === 'price' || name === 'quantity' ? Number(value) : value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put(`http://localhost:3001/instruments/${id}`, hangszer)
            .then(response => {
                alert('Sikeres módosítás! Name: ' + response.data.name);
                navigate('/');
            })
            .catch(error => {
                console.error('Hiba a módosítás során:', error);
                alert('Hiba történt a mentés során!');
            });
    };

    if (loading) return <div className="text-center p-5"><div className="spinner-border"></div></div>;

    return (
        <div className="card shadow border-0 mx-auto mt-4" style={{ maxWidth: '600px' }}>
            <div className="card-header bg-warning text-dark p-3">
                <h4 className="mb-0 fw-bold"><i className="bi bi-pencil-square me-2"></i>Hangszer módosítása</h4>
            </div>
            <div className="card-body p-4">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label fw-bold">Hangszer neve</label>
                        <input type="text" name="name" className="form-control" value={hangszer.name} onChange={handleInputChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label fw-bold">Márka</label>
                        <input type="text" name="brand" className="form-control" value={hangszer.brand} onChange={handleInputChange} required />
                    </div>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label fw-bold">Ár (Ft)</label>
                            <input type="number" name="price" className="form-control" value={hangszer.price} onChange={handleInputChange} required />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label fw-bold">Készlet (db)</label>
                            <input type="number" name="quantity" className="form-control" value={hangszer.quantity} onChange={handleInputChange} required />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="form-label fw-bold">Kép URL</label>
                        <input type="url" name="imageURL" className="form-control" value={hangszer.imageURL} onChange={handleInputChange} />
                    </div>
                    <div className="d-grid gap-2">
                        <button type="submit" className="btn btn-warning btn-lg">
                            <i className="bi bi-check-lg me-2"></i>Módosítások mentése
                        </button>
                        <button type="button" className="btn btn-outline-secondary" onClick={() => navigate('/')}>
                            Mégse
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
