import React, { useState } from 'react';
import '../css/AddPartyForm.css';
import axios from 'axios';

const AddPartyForm = () => {
    const [formData, setFormData] = useState({
        partyName: '',
        djs: '',
        date: '',
        startTime: '',
        genres: '',
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const partyData = {
            ...formData,
            genres: formData.genres.split(',').map((genre) => genre.trim()), 
            djs: formData.djs.split(',').map((dj) => dj.trim()),
        };

        try {
            console.log(partyData); // Log the data to check the structure
            const response = await axios.post('http://localhost:5000/parties', partyData, {
                headers: { 'Content-Type': 'application/json' },
            });

            console.log('Resposta do servidor:', response); // Log the full response to inspect

            if (response && response.status === 200) { // Check for successful creation status
                alert('Festa adicionada com sucesso!');
                setFormData({
                    partyName: '',
                    djs: '',
                    date: '',
                    startTime: '',
                    genres: '',
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
                    <label htmlFor="partyName">Nome do evento:</label>
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
                    <label htmlFor="djs">DJs (separados por vírgula):</label>
                    <input
                        id="djs"
                        type="text"
                        name="djs"
                        value={formData.djs}
                        onChange={handleChange}
                        required
                    />
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
                    <label htmlFor="genres">Gêneros (separados por vírgula):</label>
                    <input
                        id="genres"
                        type="text"
                        name="genres"
                        value={formData.genres}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="location">Localização:</label>
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
                    <label htmlFor="isFree">Entrada Gratuita:</label>
                    <input
                        id="isFree"
                        type="checkbox"
                        name="isFree"
                        checked={formData.isFree}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Adicionar Festa</button>
            </form>
        </div>
    );
};

export default AddPartyForm;
