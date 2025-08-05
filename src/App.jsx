// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CharacterDetail from './components/Characterdetail';
import RickMorty from './components/RickMorty';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RickMorty />} />
        <Route path="/character/:id" element={<CharacterDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
