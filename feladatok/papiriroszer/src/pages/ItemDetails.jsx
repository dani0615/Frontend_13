import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../App.css';

function ItemDetails() {
  const params = useParams();
  const id = params.itemId;
  const [item, setItem] = useState(null);        
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = () => {
      fetch('https://iroszer.sulla.hu/items/' + id)   
        .then(response => response.json())           
        .then((tartalom) => {
          if (tartalom && tartalom.item) {
            setItem(tartalom.item);
            console.log(tartalom.item);
          } else {
            setItem(tartalom);
            console.log(tartalom);
          }
        })
        .catch(error => console.log("Hiba a lekérdezés során: ", error))
        .finally(() => setLoading(false));
    };

    fetchData();
  }, [id]);                                        
  if (loading) {
    return (
      <div className="spinner-border text-danger">
        Betöltés...
      </div>
    );
  }

  if (!item) {                                     
    return <div>Nincs megjeleníthető elem.</div>;
  }

  return (
    <div className='container'>
      <div className='row m-5 p-5 border'>
        <ListaKomponens elem={item} />            
      </div>
    </div>
  );
}

const ListaKomponens = ({ elem }) => {
  return (
    <div>                                          
      <h3>{elem.name}</h3>
      <p>{elem.price} Ft</p>
      <Link to="/">
        <i className='bi bi-backspace me-2'></i> Vissza
      </Link>
    </div>
  );
};
export default ItemDetails;                        