import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Edit from './svgs/Edit.js';
import Delete from './svgs/Delete.js';
import '../css/Admin.css';

const Admin = () => {
  const [parties, setParties] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Check if user is logged in by checking for token in localStorage
  const isLoggedIn = localStorage.getItem('token');

  // Redirect to login page if not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    const fetchParties = async () => {
      try {
        const response = await axios.get('http://localhost:5000/parties');
        setParties(response.data);
      } catch (err) {
        setError('Error fetching parties. Please try again later.');
        console.error(err);
      }
    };

    fetchParties();
  }, []);

  const handleDeleteClick = async (partyId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/parties/${partyId}`);

      if (response.status === 200) {
        console.log('Party deleted successfully');
        setParties(parties.filter(party => party._id !== partyId));
      } else {
        console.error('Failed to delete party');
      }
    } catch (error) {
      console.error('Error deleting party:', error);
    }
  };

  const handleCheckboxChange = async (e, partyId) => {
    const updatedShow = e.target.checked;

    try {
      const response = await axios.patch(`http://localhost:5000/parties/${partyId}`, {
        show: updatedShow,
      });

      if (response.status === 200) {
        console.log('Party visibility updated');
        setParties(parties.map(party =>
          party._id === partyId ? { ...party, show: updatedShow } : party
        ));
      } else {
        console.error('Failed to update party visibility');
      }
    } catch (error) {
      console.error('Error updating party visibility:', error);
    }
  };

  const handleLogout = () => {
    // Remove the JWT token from localStorage
    localStorage.removeItem('token');
    // Redirect to the login page
    navigate('/');
  };

  // If not logged in, return an empty div or a loading screen
  if (!isLoggedIn) return <div>Loading...</div>;

  return (
    <div className="adminContainer">
      {/* Logout button */}
      <button onClick={handleLogout} className="logoutButton">Sair</button>

      {/* Display error if exists */}
      {error && <div className="error">{error}</div>}
      
      <div className="tableHeader partyItem">
        <div className="idHeader">✩ id ✩</div>
        <div className="partyHeader">🗡️festa🗡️</div>
        <div className="actionsHeader">★ ações ★</div>
      </div>
      
      <ul>
        {parties.map((party) => (
          <li key={party._id} className="partyItem">
            <p>{party._id}</p>
            <p>{party.partyName}</p>
            <div className="actions">
              <label className="showCheckbox">
                <input
                  type="checkbox"
                  checked={party.show}
                  onChange={(e) => handleCheckboxChange(e, party._id)}
                />
                Mostrar
              </label>

              <Link to={`/parties/${party._id}/edit`} aria-label="Edit Party">
                <button>
                  <Edit />
                </button>
              </Link>

              <button onClick={() => handleDeleteClick(party._id)}>
                <Delete />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Admin;
