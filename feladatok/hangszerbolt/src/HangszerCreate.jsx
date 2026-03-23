import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const HangszerCreate = () => {
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const UjHangszer = {
            name: formData.get('name'),
            brand: formData.get('brand'),
            price: Number(formData.get('price')),
            quantity: Number(formData.get('quantity')),
            imageURL: formData.get('imageURL')
        };

        axios.post('http://localhost:3001/instruments', UjHangszer)
            .then(response => {
                alert('Sikeres felvétel!');
                navigate('/');
            })
            .catch(error => {
                console.error('Hiba az új hangszer felvételekor:', error);
                alert('Hiba történt a mentés során!');
            });
    };

    return (
        <div className="card shadow border-0 mx-auto mt-4" style={{ maxWidth: '600px' }}>
            <div className="card-header bg-primary text-white p-3">
                <h4 className="mb-0 fw-bold"><i className="bi bi-plus-circle me-2"></i>Új hangszer felvétele</h4>
            </div>
            <div className="card-body p-4">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label fw-bold">Hangszer neve</label>
                        <input type="text" name="name" className="form-control" required placeholder="Pl. Fender Stratocaster" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label fw-bold">Márka</label>
                        <input type="text" name="brand" className="form-control" required placeholder="Pl. Fender" />
                    </div>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label fw-bold">Ár (Ft)</label>
                            <input type="number" name="price" className="form-control" required placeholder="0" />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label fw-bold">Készlet (db)</label>
                            <input type="number" name="quantity" className="form-control" required placeholder="0" />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="form-label fw-bold">Kép URL</label>
                        <input type="url" name="imageURL" className="form-control" placeholder="https://..." />
                    </div>
                    <div className="d-grid gap-2">
                        <button type="submit" className="btn btn-success btn-lg">
                            <i className="bi bi-save me-2"></i>Mentés
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
