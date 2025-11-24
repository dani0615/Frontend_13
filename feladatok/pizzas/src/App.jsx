import { useState, useEffect } from 'react'
import './App.css'

const PizzaKartya = ({ pizza }) => (
  <div className="pizza-card">
    <img src={pizza.image_url} alt={pizza.name} className="pizza-image" />
    <h3>{pizza.name}</h3>
  </div>
)

export const App = () => {
  const [pizzak, setPizzak] = useState([])

  useEffect(() => {
    fetch('https://pizza.sulla.hu/pizza?authuser=0')
      .then(res => res.json())
      .then(adatok => setPizzak(adatok))
  }, [])

  return (
    <>
      <h1>A kedvenc pizzáink</h1>

      <div className="pizza-container">
        {pizzak.map(pizza => (
          <PizzaKartya key={pizza.id} pizza={pizza} />
        ))}
      </div>
    </>
  )
}

export default App