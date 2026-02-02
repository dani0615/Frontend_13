import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import '../App.css'

const ListaKomponens = ({ elem }) => (

  <div>
     <div className="card" style={{width:"400px"}} >
  <div className="card-body">
    <h4 className="card-title">Név: {elem.name}<br />
    Ár: {elem.price}<br />
    <Link to={"/"}><i className="bi bi-backspace">Vissza</i></Link>
    </h4>
  </div>
</div>
      
    
    </div>
);
export const EgyTermek=()=> {
  const [adat, setAdat] = useState([]);
  const { termekId } = useParams();
  useEffect(() => {
    fetch('https://localhost:7242/api/Products/' + termekId)
    .then((res) => (res.ok? res.json() : []))
    .then((tartalom) => setAdat(tartalom));
  }, [termekId])

  return (
    
      <div className="row m-5 p-5 border">
        <ListaKomponens elem={adat} />
      </div>
  )
}