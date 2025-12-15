import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../App.css';

const ListaKomponens = ({ elem }) => (
  <div className="card" style={{ width: "400px" }}>
    <div className="card-body">
      <h4 className="card-title">
        {elem.name}<br />
        {elem.price} Ft<br />
        
        <Link to="/">
          <i className="bi bi-backspace"></i> Vissza
        </Link>
      </h4>
    </div>
  </div>
);

export const ProductId = () => {
  const [adat, setAdat] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    if (!id) {
      setError('Nincs termék ID megadva az URL-ben!');
      setLoading(false);
      return;
    }

    fetch(`https://localhost:7242/api/Products/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Nem sikerült betölteni az adatot (HTTP ' + res.status + ')');
        }
        return res.json();
      })
      .then((tartalom) => {
        setAdat(tartalom);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        setError(error.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Betöltés...</div>;
  if (error) return <div>Hiba: {error}</div>;
  if (!adat) return <div>Nincs adat</div>;

  return (
    <div className="row m-5 p-5 border">
      <ListaKomponens elem={adat} />
    </div>
  );
};