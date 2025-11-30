import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <div style={{ padding: '20px', fontFamily: 'Arial' }}>
        <h1>ITMP Felhasználók</h1>
        <nav style={{ marginBottom: '20px' }}>
          <Link to="/users" style={{ marginRight: '15px' }}>Összes felhasználó</Link>
          <Link to="/users/new">Új felhasználó</Link>
        </nav>

        <Routes>
          <Route path="/users" element={<UserList />} />
          <Route path="/users/new" element={<UserForm />} />
          <Route path="/users/:id" element={<UserForm />} />
          <Route path="*" element={<UserList />} /> 
        </Routes>
      </div>
    </BrowserRouter>
  )
}


function UserList() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch('https://itmp.sulla.hu/users')
      .then(r => r.json())
      .then(data => setUsers(data))
  }, [])

  const deleteUser = (id) => {
    if (!confirm('Biztos törlöd?')) return
    fetch(`https://itmp.sulla.hu/users/${id}`, { method: 'DELETE' })
      .then(() => setUsers(users.filter(u => u.id !== id)))
  }

  return (
    <div>
      <h2>Felhasználók listája</h2>
      <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Név</th>
            <th>Email</th>
            <th>Művelet</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>
                <Link to={`/users/${u.id}`}>Szerkeszt</Link>{' | '}
                <button onClick={() => deleteUser(u.id)}>Töröl</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}


function UserForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = id !== 'new' && id !== undefined

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

 
  useEffect(() => {
    if (isEdit) {
      fetch(`https://itmp.sulla.hu/users/${id}`)
        .then(r => r.json())
        .then(data => {
          setName(data.name)
          setEmail(data.email)
        })
    }
  }, [id])

  const save = (e) => {
    e.preventDefault()
    const user = { name, email }

    if (isEdit) {
      
      fetch(`https://itmp.sulla.hu/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      }).then(() => navigate('/users'))
    } else {
    
      fetch('https://itmp.sulla.hu/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      }).then(() => navigate('/users'))
    }
  }

  return (
    <div>
      <h2>{isEdit ? 'Szerkesztés' : 'Új felhasználó'}</h2>
      <form onSubmit={save}>
        <p>
          <label>Név: <br />
            <input type="text" value={name} onChange={e => setName(e.target.value)} required />
          </label>
        </p>
        <p>
          <label>Email: <br />
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          </label>
        </p>
        <button type="submit">Mentés</button>{' '}
        <button type="button" onClick={() => navigate('/users')}>Mégse</button>
      </form>
    </div>
  )
}

export default App