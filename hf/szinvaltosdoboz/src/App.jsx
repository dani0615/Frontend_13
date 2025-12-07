import { useState } from 'react';
import './App.css';

const getTextColor = (colorValue) => {
  const colorMap = {
    red: '#ffff00',
    green: '#0000ff',
    blue: '#ffff00',
    yellow: '#ff00ff',
    pink: '#000000',
    white: '#000000',
    orange: '#000000',
    purple: '#ffff00',
    cyan: '#000000',
    lime: '#000000',
    teal: '#ffffff',
    indigo: '#ffff00',
    brown: '#ffffff',
    gray: '#ffffff',
    black: '#ffffff',
    '#8B4513': '#ffffff',
    '#40E0D0': '#000000',
    magenta: '#000000',
    olive: '#ffffff',
    '#800080': '#ffffff',
    '#FFD700': '#000000',
    '#C0C0C0': '#000000',
    '#50C878': '#000000'
  };
  
  return colorMap[colorValue] || '#000000';
};

function App() {
  const [selectedColor, setSelectedColor] = useState({
    name: 'fehér',
    value: 'white'
  });

  const colors = [
    { name: 'piros', value: 'red' },
    { name: 'zöld', value: 'green' },
    { name: 'kék', value: 'blue' },
    { name: 'sárga', value: 'yellow' },
    { name: 'rózsaszín', value: 'pink' },
    { name: 'fehér', value: 'white' },
    { name: 'narancssárga', value: 'orange' },
    { name: 'lila', value: 'purple' },
    { name: 'cián', value: 'cyan' },
    { name: 'lime', value: 'lime' },
    { name: 'teal', value: 'teal' },
    { name: 'indigó', value: 'indigo' },
    { name: 'barna', value: '#8B4513' },
    { name: 'szürke', value: 'gray' },
    { name: 'fekete', value: 'black' },
    { name: 'türkiz', value: '#40E0D0' },
    { name: 'magenta', value: 'magenta' },
    { name: 'oliva', value: 'olive' },
    { name: 'bíbor', value: '#800080' },
    { name: 'arany', value: '#FFD700' },
    { name: 'ezüst', value: '#C0C0C0' },
    { name: 'smaragd', value: '#50C878' }
  ];

  const handleColorClick = (color) => {
    setSelectedColor(color);
  };

  const textColor = getTextColor(selectedColor.value);

  return (
    <div className="container-fluid py-5 bg-light">
      <div className="container text-center">
        <h1 className="display-4 mb-3">Színválasztó</h1>
        <p className="lead mb-4">Kattints bármelyik színre – a doboz azonnal változik!</p>

        <div className="row justify-content-center mb-4">
          <div className="col-12">
            <div className="d-flex flex-wrap justify-content-center gap-2">
              {colors.map((color) => {
                const isSelected = selectedColor.value === color.value;
                return (
                  <button
                    key={color.value}
                    className={`btn ${isSelected ? 'border border-dark border-3' : 'border border-secondary'}`}
                    style={{
                      backgroundColor: color.value,
                      color: getTextColor(color.value),
                      minWidth: '90px'
                    }}
                    onClick={() => handleColorClick(color)}
                  >
                    {color.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="row justify-content-center mb-4">
          <div className="col-md-6">
            <div
              className="card mx-auto"
              style={{
                backgroundColor: selectedColor.value,
                width: '320px',
                height: '220px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <div className="text-center">
                <p className="h5 mb-2" style={{ color: textColor }}>
                  Kiválasztott szín:
                </p>
                <p className="h3 fw-bold text-uppercase" style={{ color: textColor }}>
                  {selectedColor.name}
                </p>
              </div>
            </div>
          </div>
        </div>

        <footer className="mt-5 text-muted">
          Összesen <strong>{colors.length}</strong> szín érhető el
        </footer>
      </div>
    </div>
  );
}

export default App;
