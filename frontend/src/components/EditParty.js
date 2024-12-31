import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../css/AddPartyForm.css';
import Delete from './svgs/Delete.js';

const EditParty = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [party, setParty] = useState({
    partyName: '',
    djs: [],
    date: '',
    startTime: '',
    genres: [],
    location: '',
    isFree: false,
    show: false,
  });
  const [error, setError] = useState(null);

  // Fetch the party details when the component mounts
  useEffect(() => {
    const fetchParty = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/parties/${id}`);
        setParty(response.data); // Set the fetched party data in the state
      } catch (err) {
        setError('Error fetching party details.');
        console.error(err);
      }
    };

    fetchParty();
  }, [id]);

  // Handle changes to the party fields
  const handleChange = (field, value) => {
    setParty((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleArrayChange = (field, index, value) => {
    const updatedArray = [...party[field]];
    updatedArray[index] = value;
    setParty((prev) => ({
      ...prev,
      [field]: updatedArray,
    }));
  };

  const handleAddToArray = (field) => {
    setParty((prev) => ({
      ...prev,
      [field]: [...prev[field], ''],
    }));
  };

  const handleRemoveFromArray = (field, index) => {
    const updatedArray = [...party[field]];
    updatedArray.splice(index, 1);
    setParty((prev) => ({
      ...prev,
      [field]: updatedArray,
    }));
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.patch(`http://localhost:5000/parties/${id}`, party);
      if (response.status === 200) {
        console.log('Party updated successfully');
        navigate('/admin'); // Redirect to the admin panel
      }
    } catch (err) {
      setError('Error updating party.');
      console.log(party)
      console.error(err);
    }
  };

  // Display loading or error states
  if (error) {
    return <div>{error}</div>;
  }

  if (!party.partyName) {
    return <div>Carregando...</div>; // Show loading while fetching data
  }

  return (
    <div className="editPartyContainer">
      <h1>Editar Festa</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome da Festa:</label>
          <input
            type="text"
            value={party.partyName}
            onChange={(e) => handleChange('partyName', e.target.value)}
            required
          />
        </div>
        <div>
          <label>Data:</label>
          <input
            type="date"
            value={party.date}
            onChange={(e) => handleChange('date', e.target.value)}
            required
          />
        </div>
        <div>
          <label>Horário de Início:</label>
          <input
            type="time"
            value={party.startTime}
            onChange={(e) => handleChange('startTime', e.target.value)}
            required
          />
        </div>
        <div>
          <label>Local:</label>
          <input
            type="text"
            value={party.location}
            onChange={(e) => handleChange('location', e.target.value)}
            required
          />
        </div>
        <div>
          <label>Entrada Gratuita:</label>
          <input
            type="checkbox"
            checked={party.isFree}
            onChange={(e) => handleChange('isFree', e.target.checked)}
          />
        </div>
        <div>
          <label>Artistas:</label>
          {party.djs.map((dj, index) => (
            <div key={index} className="removableOption" >
              <input
                type="text"
                value={dj}
                onChange={(e) => handleArrayChange('djs', index, e.target.value)}
              />
              <button type="button" onClick={() => handleRemoveFromArray('djs', index)} className="removeButton">
                <Delete/>
              </button>
            </div>
          ))}
          <button type="button" onClick={() => handleAddToArray('djs')} className="addButton" >
          👉 Adicionar Artista
          </button>
        </div>
        <div>
          <label>Gêneros:</label>
          {party.genres.map((genre, index) => (
            <div key={index} className="removableOption" >
              <input
                type="text"
                value={genre}
                onChange={(e) => handleArrayChange('genres', index, e.target.value)}
              />
              <button type="button" onClick={() => handleRemoveFromArray('genres', index)} className="removeButton">
                <Delete/>
              </button>
            </div>
          ))}
          <button type="button" className="addButton" onClick={() => handleAddToArray('genres')}>
          👉 Adicionar Gênero
          </button>
        </div>
        <button type="submit" className="saveButton">Salvar</button>
      </form>
    </div>
  );
};

export default EditParty;
