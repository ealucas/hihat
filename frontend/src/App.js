import './App.css';
import PartyList from './components/PartyList';
import AddPartyForm from './components/AddPartyForm';
import Admin from './components/Admin';
import EditParty  from './components/EditParty';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <Router> {/* Ensures React Router is enabled */}
      <div className="App">
        <nav className="header">
          <Link className="logo" to="/">hihat</Link> {/* Optional: Add Home link */}  
        </nav>
        <Routes>
          {/* Define your routes */}
          <Route path="/" element={<PartyList />} />
          <Route path="/parties/:id/edit" element={<EditParty />} /> {/* Edit party route */}
          <Route path="/addParty" element={<AddPartyForm />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
        <div className="addParty">
        </div>
      </div>
    </Router>
  );
}

export default App;