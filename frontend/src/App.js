import './App.css';
import PartyList from './components/PartyList';
import AddPartyForm from './components/AddPartyForm';
import Admin from './components/Admin';
import EditParty  from './components/EditParty';
import Login from './components/Login';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <Router> 
      <div className="App">
        <nav className="header">
          <Link className="logo" to="/">hihat</Link>
        </nav>
        <Routes>
          {/* Define your routes */}
          <Route path="/" element={<PartyList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/parties/:id/edit" element={<EditParty />} />
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