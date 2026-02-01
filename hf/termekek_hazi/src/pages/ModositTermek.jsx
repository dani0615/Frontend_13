import { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import '../App.css'

const API_BASE = 'https://localhost:7242/api/Products'

export const ModositTermek = () => {
  const [adat, setAdat] = useState(null)
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const { termekId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    fetch(`${API_BASE}/${termekId}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((tartalom) => {
        setAdat(tartalom)
        if (tartalom) {
          setName(tartalom.name ?? '')
          setPrice(tartalom.price ?? '')
        }
      })
  }, [termekId])

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch(`${API_BASE}/${termekId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: parseInt(termekId, 10),
        name,
        price: parseFloat(price) || 0,
      }),
    }).then((res) => {
      if (res.ok) navigate(`/termekek/${termekId}`)
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
          <h5 className="card-title mb-3">Termék módosítása</h5>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Név</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Ár</label>
              <input
                type="text"
                className="form-control"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="d-flex gap-2">
              <button type="submit" className="btn btn-success">
                Mentés
              </button>
              <Link to={`/termekek/${termekId}`} className="btn btn-secondary">
                Mégse
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
