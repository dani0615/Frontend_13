import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../App.css';

const ListaKomponens = ({ elem }) => (
  <div>
    <div className="card" style={{ width: '400px' }}>
      <div className="card-body">
        <h4 className="card-title">
          {elem.id}
          <br />
          {elem.name}
          <br />
          {elem.price} Ft
          <br />
          <Link to={'/'}>
            <i className="bi bi-backspace">Vissza</i>
          </Link>
        </h4>
      </div>
    </div>
  </div>
);

export const GetIds = () => {
  const [adat, setAdat] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch('https://iroszer.sulla.hu/items/' + id)
      .then((res) => (res.ok ? res.json() : null))
      .then((tartalom) => {
        let itemData = null;
        if (tartalom && tartalom.item) {
          itemData = tartalom.item;
        } else if (tartalom && tartalom.data && tartalom.data.item) {
          itemData = tartalom.data.item;
        } else if (tartalom && tartalom.data && tartalom.data.id) {
          itemData = tartalom.data;
        } else if (tartalom && tartalom.id) {
          itemData = tartalom;
        }
        setAdat(itemData);
      });
  }, [id]);

  return (
    <div className="row m-5 p-5 border">
      {adat && adat.id ? <ListaKomponens elem={adat} /> : <div>Az írószer nem található.</div>}
    </div>
  );
};

