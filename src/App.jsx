import React, { useState, useEffect } from 'react';
import { PuntoCard } from './components/PuntoCard';
import './App.css';

function App() {
  const [puntos, setPuntos] = useState([]);
  const [form, setForm] = useState({
    nombre: '',
    sector: '',
    material: '',
    capacidad: ''
  });

  const obtenerPuntos = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/puntos');
      const data = await response.json();
      setPuntos(data);
    } catch (error) {
      console.error('Error al obtener los puntos:', error);
    }
  };

  useEffect(() => {
    obtenerPuntos();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/puntos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...form,
          capacidad: Number(form.capacidad)
        })
      });

      if (response.ok) {
        const nuevoPunto = await response.json();
        setPuntos([...puntos, nuevoPunto]);
        setForm({ nombre: '', sector: '', material: '', capacidad: '' });
      }
    } catch (error) {
      console.error('Error al guardar el punto:', error);
    }
  };

  return (
    <div className="container">
      <h1>Puntos de Reciclaje Urbano</h1>

      <form onSubmit={handleSubmit} className="form-container">
        <h2>Registrar Nuevo Punto</h2>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre del punto"
          value={form.nombre}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="sector"
          placeholder="Sector o barrio"
          value={form.sector}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="material"
          placeholder="Material que recibe"
          value={form.material}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="capacidad"
          placeholder="Capacidad (unidades)"
          value={form.capacidad}
          onChange={handleChange}
          required
        />
        <button type="submit">Guardar Punto</button>
      </form>

      <div className="list-container">
        <h2>Listado de Puntos</h2>
        <div className="grid-tarjetas">
          {puntos.map((punto) => (
            <PuntoCard key={punto.id} punto={punto} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;

