import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const ListaKomponens = ({ elemek }) => (
  <div>
    {elemek.map((elem, index) => (
      <div className="card" style={{ width: '400px' }} key={index}>
        <div className="card-body">
          <h4 className="card-title">
            {elem.id}
            <br />
            {elem.name}
            <br />
            {elem.price} Ft
            <br />
            <Link to={'/item/' + elem.id}>
              <i className="bi bi-eye">Részletek</i>
            </Link>
          </h4>
        </div>
      </div>
    ))}
  </div>
);

export const Get = () => {
  const [adatok, setAdatok] = useState([]);

  useEffect(() => {
    fetch('https://iroszer.sulla.hu/items')
      .then((res) => (res.ok ? res.json() : []))
      .then((tartalom) => {
        let itemsArray = [];
        if (Array.isArray(tartalom)) {
          itemsArray = tartalom;
        } else if (tartalom.data) {
          if (typeof tartalom.data === 'object' && !Array.isArray(tartalom.data)) {
            itemsArray = Object.values(tartalom.data);
          } else {
            itemsArray = tartalom.data;
          }
        } else {
          itemsArray = Object.values(tartalom);
        }
        setAdatok(itemsArray);
      });
  }, []);

  return (
    <div className="row m-5 p-5 border">
      <div className="d-flex justify-content-between align-items-center mb-4 w-100">
        <h2>Írószerek listája</h2>
        <Link to="/uj" className="btn btn-success">
          Új írószer hozzáadása
        </Link>
      </div>
      <ListaKomponens elemek={adatok} />
    </div>
  );
};

