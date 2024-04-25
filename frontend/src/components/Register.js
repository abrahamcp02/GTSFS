import React, { useState } from 'react';
import { register } from '../services/apiAuthService';
import './Register.css'; // Asegúrate de que el archivo CSS esté correctamente vinculado


function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');


  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await register(username, email, password);
      console.log(response); // Manejar la respuesta del servidor, por ejemplo, redirigir al usuario al inicio de sesión
    } catch (error) {
      console.error('Error en el registro:', error.message);
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
          placeholder="Nombre"
          required
        />
        <button type="submit">Crear Cuenta</button>
      </form>
    </div>
  );
}
export default Register;
