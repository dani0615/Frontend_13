import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import '../App.css'

const API_BASE = 'https://localhost:7242/api/Products'

const ListaKomponens = ({ elem }) => (
  <div>
    <div className="card" style={{ width: "400px" }}>
      <div className="card-body">
        <h4 className="card-title">Név: {elem.name}<br />
          Ár: {elem.price}<br />
          <Link to={"/"}><i className="bi bi-backspace">Vissza</i></Link>
        </h4>
      </div>
    </div>
  </div>
)

export const EgyTermek = () => {
  const [adat, setAdat] = useState(null)
  const { termekId } = useParams()

  useEffect(() => {
    fetch(`${API_BASE}/${termekId}`)
      .then((res) => (res.ok ? res.json() : null))
      .then(setAdat)
  }, [termekId])

  if (adat === null) {
    return (
      <div className="row m-5 p-5 border">
        <p>Betöltés…</p>
      </div>
    )
  }

  if (!adat || !adat.id) {
    return (
      <div className="row m-5 p-5 border">
        <p>Nem található termék.</p>
        <Link to="/">Vissza a listához</Link>
      </div>
    )
  }

  return (
    <div className="row m-5 p-5 border">
      <ListaKomponens elem={adat} />
      <div className="mt-3 d-flex gap-2">
        <Link to={`/termekek/${termekId}/modosit`} className="btn btn-primary">
          <i className="bi bi-pencil" /> Szerkesztés
        </Link>
        <Link to={`/termekek/${termekId}/delete`} className="btn btn-danger">
          <i className="bi bi-trash" /> Törlés
        </Link>
      </div>
    </div>
  )
}
