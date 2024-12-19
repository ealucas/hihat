import './App.css';
import PartyList from './components/PartyList';
import AddPartyForm from './components/AddPartyForm';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <Router> {/* Ensures React Router is enabled */}
      <div className="App">
        <nav className="header">
          <Link className="logo" to="/">hihat</Link> {/* Optional: Add Home link */}
          <p>coleção de roles em bh</p>
        </nav>
        <Routes>
          {/* Define your routes */}
          <Route path="/" element={<PartyList />} />
          <Route path="/addParty" element={<AddPartyForm />} />
        </Routes>
        <div className="addParty">
        <Link to="/addParty">Não encontrou sua festa?</Link>
        </div>
      </div>
    </Router>
  );
}

export default App;