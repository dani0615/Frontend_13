import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const DenmarkStrait = () => {
    const [ships, setShips] = useState([]);
    const [loading, setLoading] = useState(true);
    const battleName = "Denmark Strait";
    const navigate = useNavigate();

    useEffect(() => {
        fetchShips();
    }, []);

    const fetchShips = () => {
        axios.get(`http://localhost:5014/api/Csata/Resztvevok/${battleName}`)
            .then(response => {
                if (response.status === 204) {
                    setShips([]);
                } else {
                    setShips(response.data);
                }
                setLoading(false);
            })
            .catch(error => {
                console.error('Hiba a résztvevők lekérdezésekor:', error);
                setLoading(false);
            });
    };

    const handleDelete = (shipName) => {
        if (window.confirm("Biztosan szeretnéd törölni?")) {
            axios.delete(`http://localhost:5014/api/Kimenet/KimenetTorles/${battleName}/${shipName}`)
                .then(response => {
                    alert("Sikeres törlés!");
                    navigate('/');
                })
                .catch(error => {
                    console.error('Hiba a törlés közben:', error.response ? error.response.data : error.message);
                });
        }
    };

    if (loading) return <div className="text-center p-5"><div className="spinner-border text-primary"></div></div>;

    return (
        <div className="container py-4">
            <h1 className="text-center mb-5 fw-bold">{battleName}</h1>
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    {ships.length === 0 ? (
                        <div className="alert alert-info shadow-sm text-center">Nincsenek résztvevők ezen a csatában.</div>
                    ) : (
                        <div className="d-flex flex-column align-items-center">
                            {ships.map(shipName => (
                                <div key={shipName} className="card shadow-sm border-0 mb-3 w-100">
                                    <div className="card-body d-flex justify-content-between align-items-center p-3">
                                        <h5 className="mb-0 fw-bold">{shipName}</h5>
                                        <button 
                                            className="btn btn-outline-danger shadow-sm"
                                            onClick={() => handleDelete(shipName)}
                                            title="Törlés"
                                        >
                                            <i className="bi bi-trash"></i>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
