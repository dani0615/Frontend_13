import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../App.css'

const ListaKomponens = ({ elemek }) => (

  <div>
    {elemek.map((elem, index) => (
     <div className="card" style={{width:"400px"}} >
  <div className="card-body">
    <h4 className="card-title">{elem.name}<br/>
    {elem.email}<br/>
    {elem.body}<br/>
    <Link to={"/"}><i className="bi bi-backspace">Vissza</i></Link>
    </h4>
  </div>
</div>
      
    ))}
    </div>
);
export const Egykomment=()=> {
  const [adat, setAdat] = useState([]);
  const {comentId} = useParams();

  useEffect(() => {
    fetch('https://harmadik.sulla.hu/Comment' + comentId)
    .then((res) => (res.ok? res.json() : []))
    .then((tartalom) => setAdat(tartalom));
  }, [])

  return (
    
      <div className="row m-5 p-5 border">
        <ListaKomponens elemek={adatok} />
      </div>
  )
}