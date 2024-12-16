import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/partyList.css';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const month = date.getMonth() + 1; // getMonth() is zero-based
  const day = date.getDate();
  return `${day}/${month}`;
};

const PartyList = () => {
  const [parties, setParties] = useState([]);
  const [error, setError] = useState(null);

  // Fetch party data from the backend when the component mounts
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
  }, []); // Empty dependency array ensures it runs only once (like componentDidMount)

  return (
    <div>
      {error && <p>{error}</p>} {/* Display error if there is any */}
      {parties.length === 0 ? (
        <p>No parties available</p>
      ) : (
        <div className="table">
          <div className="row header">
            <div className="cell">Data</div>
            <div className="cell">Hora</div>
            <div className="cell">Festa</div>
            <div className="cell">Lineup</div>
            <div className="cell">Som</div>
            <div className="cell">Local</div>
            <div className="cell">De graça?</div>
          </div>
          {parties.map((party) => (
            <div key={party.id} className="row">
              <div className="cell">{formatDate(party.date)}</div>
              <div className="cell">{party.startTime || 'Não informado'}</div>
              <div className="cell">{party.partyName || 'Não informado'}</div>
              <div className="cell">
                {party.djs}
              </div>
              <div className="cell">
                {party.genres}
              </div>
              <div className="cell">{party.location || 'Não informado'}</div>
              <div className="cell">{party.isFree ? "GRÁTIS" : "Pago"}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PartyList;
