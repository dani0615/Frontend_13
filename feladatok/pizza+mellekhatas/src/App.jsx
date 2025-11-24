import {Routes , Route , Link} from 'react-router-dom';
import {Home} from "./pages/Home";
import About from "./pages/About";

import './App.css';

export const App = () => {
  
  return (
    <>
    <h1>React Router Példa</h1>
    <nav>
      <Link to="/">Főoldal</Link>
      <Link to="/about">About</Link>
      <link to ="/pizzak"style={{fontSize:"36px"}}>Pizzák</link>
    </nav>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/pizzak" element={<h1>Pizzák</h1>} />

    </Routes>
    </> 
  )
}

export default App