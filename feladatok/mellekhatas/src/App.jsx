import { useEffect, useState } from 'react'
import './App.css'

const ListaKomponens = ({ elemek }) => (
  <ol>
    {Object.values(elemek).map((elem, index) => (
      <li key={index}>{elem.name} - {elem.email}</li>
    ))}
  </ol>
);
export const App = () => {
  const [adatok, setAdatok] = useState({});

  useEffect(() => {
    fetch('https://itmp.sulla.hu/users')
    .then((res) => (res.ok? res.json() : []))
    .then((tartalom) => setAdatok(tartalom));
  }, [])

  return (
    <div className="container">
      <div className="row m-5 p-5 border">
        <ListaKomponens elemek={adatok} />
      </div>
    </div>
  )
}

export default App;