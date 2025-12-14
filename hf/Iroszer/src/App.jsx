import { Routes, Route } from 'react-router-dom';
import { Get } from './pages/Get';
import { GetIds } from './pages/Get-ids';
import { Post } from './pages/Post';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Get />} />
      <Route path="/item/:id" element={<GetIds />} />
      <Route path="/uj" element={<Post />} />
    </Routes>
  );
}

export default App;
