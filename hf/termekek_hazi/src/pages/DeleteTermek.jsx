import { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import '../App.css'

const API_BASE = 'https://localhost:7242/api/Products'

export const DeleteTermek = () => {
  const [adat, setAdat] = useState(null)
  const { termekId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    fetch(`${API_BASE}/${termekId}`)
      .then((res) => (res.ok ? res.json() : null))
      .then(setAdat)
  }, [termekId])

  const handleDelete = () => {
    fetch(`${API_BASE}/${termekId}`, { method: 'DELETE' })
      .then((res) => {
        if (res.ok) navigate('/')
      })
  }

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
      <div className="card" style={{ width: '400px' }}>
        <div className="card-body">
          <h5 className="card-title">Termék törlése</h5>
          <p className="mb-2">Név: <strong>{adat.name}</strong></p>
          <p className="mb-3">Ár: <strong>{adat.price}</strong></p>
          <p className="text-danger mb-3">Biztosan törölni szeretnéd ezt a terméket?</p>
          <div className="d-flex gap-2">
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleDelete}
            >
              <i className="bi bi-trash" /> Igen, törlöm
            </button>
            <Link to={`/termekek/${termekId}`} className="btn btn-secondary">
              Mégse
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
