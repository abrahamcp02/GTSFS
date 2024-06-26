import React, { useState } from 'react';
import { register } from '../services/apiAuthService';
import './styles/Register.css';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await register(username, email, name, password);

      localStorage.setItem('token', response.token);
      window.location.href = '/';
    } catch (error) {
      console.error('Error en el registro:', error.message);
      if (error.response && error.response.status === 409) {
        setError(error.response.data.message);
      } else {
        setError('Error en el registro. Por favor, inténtalo de nuevo más tarde.');
      }
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleRegister} className="register-form">
        <img src="https://i.ibb.co/M2bKR7W/LOGO-GRUPO-DE-TEATRO-SAN-FRANCISCO-SOLANO.png" alt="Logo del Grupo de Teatro San Francisco Solano" className="register-logo" />
        <h2>Crea tu cuenta</h2>
        {error && <p className="error-message">{error}</p>}
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Usuario"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          required
        />
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre y Apellidos"
          required
        />
        <button type="submit">Crear Cuenta</button>
      </form>
    </div>
  );
}

export default Register;
