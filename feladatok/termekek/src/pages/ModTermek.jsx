import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from 'axios';
import '../App.css';

export const ModTermek = () => {
    const navigate = useNavigate();
    const { termekId: id } = useParams();
    const [adat, setAdat] = useState({
        name: '',
        price: '',
    });

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
            }
        };

        fetchData();
    }, [id]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setAdat(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        
        axios.put(`https://localhost:7242/api/Products/${id}`, adat)
            .then(() => {
                navigate("/");
            })
            .catch(error => {
                console.error('PUT hiba:', error);
            });
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label">Név: </label>
                    <div className="col-sm-9">
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            value={adat.name}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label">Ár: </label>
                    <div className="col-sm-9">
                        <input
                            type="text"
                            className="form-control"
                            name="price"
                            value={adat.price}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <button type="submit" className="btn btn-success">Termék módosítása</button>
                <button type="reset" className="btn btn-warning ms-4">Űrlap törlése</button>
            </form>

            <Link to="/">Vissza a termékekhez</Link>
        </>
    );
};