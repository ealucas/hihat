import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/partyList.css';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const month = date.getMonth() + 1; // getMonth() is zero-based
  const day = date.getDate() + 1;
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
  const groupedByDay = parties.reduce((acc, party) => {
    const day = party.date; 
    if (!acc[day]) acc[day] = [];
    acc[day].push(party);
    return acc;
  }, {});
  

  return (
    <div className="feed-container">
    {Object.keys(groupedByDay).map((day) => (
      <div key={day} className="day-group">
        <p className="day-title">{formatDate(day)}</p>
        {groupedByDay[day].map((party, index) => (
          <div className="feed-item">
            <div key={index}>
              <h2 className="partyName">{party.partyName || '?'}</h2>
              <p className="custom-hl artists-hl">๑♡๑ artistas ๑♡๑</p>
              <p className="lineup">{party.djs.join("\t  *  \t")}</p>
              <p className="custom-hl genres-hl">*✵⋆ gêneros *✵⋆</p>
              <p className="genres">{party.genres ? party.genres.join("\t\t\t") : null}</p>
              <p className="custom-hl location-hl">༺❀༻ local  ༺❀༻</p>
              <p className="location">{party.location}</p>
              <p className="free">{party.isFree ? "GRÁTIS" : null}</p>
            </div>
          </div>
        ))}
      </div>
    ))}
  </div>
  );
};

export default PartyList;
