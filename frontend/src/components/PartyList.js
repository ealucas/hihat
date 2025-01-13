import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../css/partyList.css';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const month = date.getMonth() + 1;
  const day = date.getDate() + 1;
  return `${day}/${month}`;
};

const PartyList = () => {
  const [parties, setParties] = useState([]);
  const [error, setError] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState(null);

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

  const genres = Array.from(
    new Set(parties.filter((party) => party.show).flatMap((party) => party.genres || []))
  );
  
  // Filter parties by genre and show: true
  const filteredParties = selectedGenre
    ? parties.filter((party) => party.genres?.includes(selectedGenre) && party.show)
    : parties.filter((party) => party.show);

  const groupedByDay = filteredParties.reduce((acc, party) => {
    const day = party.date;
    if (!acc[day]) acc[day] = [];
    acc[day].push(party);
    return acc;
  }, {});

  const handleGenreClick = (genre) => {
    setSelectedGenre(selectedGenre === genre ? null : genre);
  };

  return (
    <div className="feedContainer">
      <div className="genreFilters">
        {genres.map((genre) => (
          <button
            key={genre}
            onClick={() => handleGenreClick(genre)}
            className={selectedGenre === genre ? 'active' : ''}
          >
            {genre}
          </button>
        ))}
      </div>

      {Object.keys(groupedByDay).map((day) => (
        <div key={day} className="day-group">
          <p className="day-title">{formatDate(day)}</p>
          {groupedByDay[day].map((party) => (
            <div key={party.id} className="feed-item">
              <div>
                <h2 className="partyName">{party.partyName || '?'}</h2>
                <p className="custom-hl artists-hl">๑♡๑ artistas ๑♡๑</p>
                <p className="lineup">{party.djs.join("\t  *  \t")}</p>

                {/* Only show genres if party.show is true */}
                {party.show && (
                  <>
                    <p className="custom-hl genres-hl">*✵⋆ gêneros *✵⋆</p>
                    <p className="genres">{party.genres ? party.genres.join(" * ") : null}</p>
                  </>
                )}

                <p className="custom-hl location-hl">༺❀༻ local  ༺❀༻</p>
                <p className="location">{party.location}</p>
                <p className="free">{party.isFree ? "GRÁTIS" : null}</p>
              </div>
            </div>
          ))}
        </div>
      ))}
      <Link to="/addParty">Não encontrou sua festa?</Link>
    </div>
  );
};

export default PartyList;