import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Pizzak.css'

const ListaKomponens = ({ elemek }) => (

  <div>
    {elemek.map((elem) => (
     <div className="card" style={{width:"400px"}} key={elem.id}>
  <Link to={"/pizza/" + elem.id}>
  <img className="card-img-top" src={elem.image_url} alt="Card image" style={{width:"200px", height:"150px", display: "block", margin: "0 auto"}} /></Link>
  <div className="card-body">
    <h4 className="card-title">{elem.name}<br />
    <Link to={"/pizza/" + elem.id}><i className="bi bi-eye">Részletek</i></Link>
    </h4>
  </div>
</div>
      
    ))}
    </div>
);
export const Pizzak=()=> {
  const [adatok, setAdatok] = useState([]);

  useEffect(() => {
    fetch('https://pizza.sulla.hu/pizza')
    .then((res) => (res.ok? res.json() : []))
    .then((tartalom) => setAdatok(tartalom));
  }, [])

  return (
    
      <div className="row m-5 p-5 border">
        <ListaKomponens elemek={adatok} />
      </div>
  )
}
