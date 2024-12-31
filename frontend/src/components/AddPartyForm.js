import React, { useState } from 'react';
import '../css/AddPartyForm.css';
import Delete from './svgs/Delete.js';
import axios from 'axios';

const AddPartyForm = () => {
  const [formData, setFormData] = useState({
    partyName: '',
    djs: [],
    date: '',
    startTime: '',
    genres: [],
    location: '',
    isFree: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleArrayChange = (field, index, value) => {
    const updatedArray = [...formData[field]];
    updatedArray[index] = value;
    setFormData((prevData) => ({
      ...prevData,
      [field]: updatedArray,
    }));
  };

  const handleAddToArray = (field) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: [...prevData[field], ''],
    }));
  };

  const handleRemoveFromArray = (field, index) => {
    const updatedArray = [...formData[field]];
    updatedArray.splice(index, 1);
    setFormData((prevData) => ({
      ...prevData,
      [field]: updatedArray,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/parties', formData, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.status === 200) {
        alert('Festa adicionada com sucesso!');
        setFormData({
          partyName: '',
          djs: [],
          date: '',
          startTime: '',
          genres: [],
          location: '',
          isFree: false,
        });
      } else {
        alert('Falha ao adicionar a festa.');
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('Ocorreu um erro.');
    }
  };

  return (
    <div>
      <h1>Adicione Sua Festa</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="partyName">Nome da festa:</label>
          <input
            id="partyName"
            type="text"
            name="partyName"
            value={formData.partyName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Artistas:</label>
          {formData.djs.map((dj, index) => (
            <div key={index} className="removableOption">
              <input
                type="text"
                value={dj}
                onChange={(e) => handleArrayChange('djs', index, e.target.value)}
                required
              />
              <button type="button" className="removeButton" onClick={() => handleRemoveFromArray('djs', index)}>
                <Delete/>
              </button>
            </div>
          ))}
          <button type="button" className="addButton" onClick={() => handleAddToArray('djs')}>
          👉 Adicionar Artista
          </button>
        </div>
        <div>
          <label htmlFor="date">Data:</label>
          <input
            id="date"
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="startTime">Horário de Início:</label>
          <input
            id="startTime"
            type="time"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Gêneros:</label>
          {formData.genres.map((genre, index) => (
            <div key={index} className="removableOption" >
              <input
                type="text"
                value={genre}
                onChange={(e) => handleArrayChange('genres', index, e.target.value)}
                required
              />
              <button type="button" className="removeButton" onClick={() => handleRemoveFromArray('genres', index)}>
                <Delete/>
              </button>
            </div>
          ))}
          <button type="button" className="addButton" onClick={() => handleAddToArray('genres')}>
          👉 Adicionar Gênero
          </button>
        </div>
        <div>
          <label htmlFor="location">Local:</label>
          <input
            id="location"
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="isFree">Entrada Gratuita: </label>
          <input
            id="isFree"
            type="checkbox"
            name="isFree"
            checked={formData.isFree}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="saveButton">Salvar Festa</button>
      </form>
    </div>
  );
};

export default AddPartyForm;
