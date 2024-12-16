import './App.css';
import PartyList from './components/PartyList';
import AddPartyForm from './components/AddPartyForm';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <Router> {/* Ensures React Router is enabled */}
      <div className="App">
        <nav>
          <Link className="logo" to="/">hihat</Link> {/* Optional: Add Home link */}
        </nav>
        <Routes>
          {/* Define your routes */}
          <Route path="/" element={<PartyList />} />
          <Route path="/addParty" element={<AddPartyForm />} />
        </Routes>
        <Link to="/addParty">Adicione sua festa </Link>
      </div>
    </Router>
  );
}

export default App;