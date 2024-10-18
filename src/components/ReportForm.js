// src/components/ReportForm.js
import React, { useState } from 'react';
import axios from 'axios';
import MapComponent from './MapComponent';
import './ReportForm.css';

function ReportForm() {
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Iluminação');
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState('success');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    if (!location.lat || !location.lng) {
      setMessage('Por favor, selecione uma localização no mapa.');
      setMessageType('error');
      setLoading(false);
      return;
    }

    const reportData = new FormData();
    reportData.append('description', description);
    reportData.append('category', category);
    reportData.append('latitude', location.lat);
    reportData.append('longitude', location.lng);
    if (image) {
      reportData.append('image', image);
    }

    try {
      await axios.post('http://localhost:3000/api/reports', reportData);
      setMessage('Relato enviado com sucesso!');
      setMessageType('success');
      // Resetar o formulário
      setDescription('');
      setCategory('Iluminação');
      setLocation({ lat: null, lng: null });
      setImage(null);
    } catch (err) {
      console.error(err);
      setMessage('Erro ao enviar o relato. Por favor, tente novamente.');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Relate um Problema em Guaporé</h2>
      {message && (
        <div className={`message ${messageType}`}>
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Descrição do Problema:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Categoria:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="Iluminação">Iluminação</option>
            <option value="Pavimentação">Pavimentação</option>
            <option value="Limpeza Urbana">Limpeza Urbana</option>
            {/* Outras categorias */}
          </select>
        </div>

        <div className="form-group">
          <label>Localização:</label>
          <MapComponent location={location} setLocation={setLocation} />
        </div>

        <div className="form-group">
          <label>Imagem (opcional):</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Enviando...' : 'Enviar Relato'}
        </button>
      </form>
    </div>
  );
}

export default ReportForm;
