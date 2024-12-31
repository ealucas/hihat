import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Edit from './svgs/Edit.js';
import Delete from './svgs/Delete.js';
import '../css/Admin.css';

const Admin = () => {
    const [parties, setParties] = useState([]);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchParties = async () => {
        try {
          const response = await axios.get('http://localhost:5000/parties');
          setParties(response.data); // Update state with fetched data
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
          // Remove the deleted party from state to update the UI
          setParties(parties.filter(party => party.id !== partyId)); 
        } else {
          console.error('Failed to delete party');
        }
      } catch (error) {
        console.error('Error deleting party:', error);
      }
    };

    const handleCheckboxChange = async (e, partyId) => {
      const updatedShow = e.target.checked; // Get new checkbox state
  
      try {
        const response = await axios.put(`http://localhost:5000/parties/${partyId}`, {
          show: updatedShow, // Send updated visibility state to server
        });
  
        if (response.status === 200) {
          console.log('Party visibility updated');
          // Update the local state with the new `show` value
          setParties(parties.map(party => 
            party.id === partyId ? { ...party, show: updatedShow } : party
          ));
        } else {
          console.error('Failed to update party visibility');
        }
      } catch (error) {
        console.error('Error updating party visibility:', error);
      }
    };

    return (
      <div className="adminContainer">
      <div className="tableHeader partyItem"> 
        <div className="idHeader">✩ id ✩ </div>
        <div className="partyHeader">🗡️ festa  🗡️ </div>
        <div className="actionsHeader">★ ações ★</div>
      </div>
      <ul>
        {parties.map((party) => (
          <li key={party.id} className="partyItem">
            <div className="partyId">{party.id}</div>
            <div className="partyName">{party.partyName}</div>
            <div className="actions">
              <label className="showCheckbox">  
               <label>
            <input
              type="checkbox"
              checked={party.show}
              onChange={(e) => handleCheckboxChange(e, party.id)}
            />
            Mostrar
          </label>

              </label>
              <Link to={`/parties/${party.id}/edit`} aria-label="Edit Party">
                <button>
                  <Edit />
                </button>
              </Link>
              <button onClick={() => handleDeleteClick(party.id)}> <Delete/> </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
      );
  };

export default Admin;
