import { useEffect, useState } from "react";
import './App.css';

const PizzaKartya = ({ pizza }) => (
  <div className="pizza-card">
    <img src={pizza.image_url} alt={pizza.name} className="pizza-image" />
    <h3>{pizza.name}</h3>
  </div>
);

const ListaKomponens = ({ elemek }) => (
  <div>
    {Object.values(elemek).map((elem, index) => (
      <div className="card" style={{ width: "18rem" }} key={index}>
        <img src={elem.image_url} className="card-img-top" alt={elem.name} />
        <div className="card-body">
          <h5 className="card-title">{elem.name}</h5>
          <p className="card-text">{elem.description}</p>
        </div>
      </div>
    ))}
  </div>
);

const Pizzak = () => {
  const [pizzak, setPizzak] = useState([]);

  useEffect(() => {
    fetch('https://pizza.sulla.hu/pizza?authuser=0')
      .then(res => res.json())
      .then(adatok => setPizzak(adatok));
  }, []);

  return (
    <div>
      <ListaKomponens elemek={pizzak} />
    </div>
  );
};

export default Pizzak;