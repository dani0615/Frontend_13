import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../App.css'

const ListaKomponens = ({ elemek }) => (

  <div>
    {elemek.map((elem, index) => (
     <div className="card" style={{width:"400px"}} key={index}>
  <div className="card-body">
    <h4 className="card-title">{elem.name}<br />
    {elem.price}<br />
    <Link to={"/Termékek/" + elem.id}><i className="bi bi-eye">Részletek</i></Link>
    </h4>
  </div>
</div>
      
    ))}
    </div>
);
export const Products=()=> {
  const [adatok, setAdatok] = useState([]);

  useEffect(() => {
    fetch('https://localhost:7242/api/Products')
    .then((res) => (res.ok? res.json() : []))
    .then((tartalom) => setAdatok(tartalom));
  }, [])

  return (
    
      <div className="row m-5 p-5 border">
        <ListaKomponens elemek={adatok} />
      </div>
  )
}