import React, { useState } from 'react';

const ComponentSelector = ({ name, options, selectedOption, onSelect }) => {
  return (
    <div>
      <h3>{name}</h3>
      {options.map((option, index) => (
        <button
          key={index}
          onClick={() => onSelect(option)}
          style={{ 
            backgroundColor: selectedOption?.name === option.name ? 'lightgreen' : 'lightgrey',
            margin: '5px',
            padding: '10px',
            border: 'none',
            borderRadius: '5px',
          }}
        >
          {option.name} - {option.price} HUF
        </button>
      ))}
    </div>
  );
};

export const App = () => {
  const [processor, setProcessor] = useState(null);
  const [memory, setMemory] = useState(null);
  const [motherboard, setMotherboard] = useState(null);  
  const [psu, setPsu] = useState(null);                 
  const [gpu, setGpu] = useState(null);                 

  const processors = [
    { name: 'Intel i5', price: 50000 },
    { name: 'Intel i7', price: 75000 },
  ];
 
  const memories = [
    { name: '8GB RAM', price: 12000 },
    { name: '16GB RAM', price: 25000 },
  ];

  const motherboards = [ 
    { name: 'Asus Prime', price: 35000 },
    { name: 'Asus ROG', price: 50000 },
    { name: 'Asus TUF', price: 45000 },
  ];
  
  const psus = [
    { name: 'Corsair 500W', price: 25000 },
    { name: 'Corsair 850W', price: 35000 },
    { name: 'Corsair 1000W', price: 40000 },
  ];
  
  const gpus = [
    { name: 'RTX 3060', price: 50000 },
    { name: 'RTX 3070', price: 60000 },
    { name: 'RTX 3080', price: 70000 },
  ];

  const totalPrice = 
    (processor?.price || 0) +
    (memory?.price || 0) +
    (motherboard?.price || 0) +
    (psu?.price || 0) +
    (gpu?.price || 0);

  return (
    <div className="container mt-4">
      <h2>Számítógép összeszerelő app</h2>
      
      <ComponentSelector name="Processzor" options={processors} selectedOption={processor} onSelect={setProcessor} />
      <ComponentSelector name="Memória" options={memories} selectedOption={memory} onSelect={setMemory} />
      <ComponentSelector name="Alaplap" options={motherboards} selectedOption={motherboard} onSelect={setMotherboard} />
      <ComponentSelector name="Tápegység" options={psus} selectedOption={psu} onSelect={setPsu} />
      <ComponentSelector name="Videókártya" options={gpus} selectedOption={gpu} onSelect={setGpu} />

      <h3 className="mt-4">Teljes ár: {totalPrice} HUF</h3>
    </div>
  );
};