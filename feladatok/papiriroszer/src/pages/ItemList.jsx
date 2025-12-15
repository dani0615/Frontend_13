import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function ItemList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = () => {
      fetch('https://iroszer.sulla.hu/items')
        .then((res) => (res.ok ? res.json() : []))
        .then((tartalom) => {
          if (Array.isArray(tartalom)) {
            setItems(tartalom);
          } else if (tartalom && tartalom.data) {
            setItems(Object.values(tartalom.data));
            console.log(tartalom.data);
          } else {
            setItems([]);
          }
        })
        .catch(error => console.log("Hiba a lekérdezés során: ", error))
        .finally(() => setLoading(false));
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="spinner-border text-danger">
        Betöltés...
      </div>
    );
  }

  if (!items.length) {
    return <div>Nincs megjeleníthető elem.</div>;
  }

  return (
    <div className='container'>
      <div className='row m-5 p-5 border'>
        <ListaKomponens elemek={items} />
      </div>
    </div>
  );

  
}


const ListaKomponens = ({ elemek }) => {
  return (
    <ol> 
      {elemek.map((elem, index) => (
        <li key={index}>
          {elem.name}
          <br />
          {elem.price} <br />
          <Link to={"/items/" + elem.id}>
            <i className='bi bi-eye'></i>
          </Link>
        </li>
      ))}
    </ol>
  );
};

export default ItemList;