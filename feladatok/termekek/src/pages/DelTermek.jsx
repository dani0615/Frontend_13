import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from 'axios';
import '../App.css';

const ListaKomponens = ({ elem }) => {
    const navigate = useNavigate();

    const handleDelete = (event) => {
        event.preventDefault();
        
        axios.delete(`https://localhost:7242/api/Products/${elem.id}`)
            .then(() => {
                navigate("/");
            })
            .catch(error => {
                console.error('Törlés hiba:', error);
            });
    };

    return (
        <li>
            <h1>Törlésre ítélt termék:</h1>
            <span className="product-name">Név: {elem.name}</span><br />
            <span className="product-price">Ár: {elem.price}</span>
            <br /><br />
            <form onSubmit={handleDelete}>
                <button type="submit" className="btn btn-danger me-2">
                    <i className="bi bi-trash3"></i> Törlés
                </button>
                
                <Link to="/" className="btn btn-warning me-2" style={{ textDecoration: 'none', color: 'black' }}>
                    <i className="bi bi-arrow-left"></i> Vissza
                </Link>
            </form>
        </li>
    );
};

export const Del = () => {
    const [adat, setAdat] = useState(null); 
    const { termekId: id } = useParams();
    const navigate = useNavigate(); 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://localhost:7242/api/Products/${id}`);
                if (!response.ok) {
                    throw new Error('Hiba az adatlekérés során');
                }
                const data = await response.json();
                setAdat(data);
            } catch (error) {
                console.error('Fetch hiba:', error);
                navigate("/");
            }
        };

        fetchData();
    }, [id]);

    if (!adat) {
        return <div className="container"><p>Betöltés...</p></div>; 
    }

    return (
        <div className="container">
            <div className="row m-5 p-5 border">
                <ul>
                    <ListaKomponens elem={adat} />
                </ul>
            </div>
        </div>
    );
};