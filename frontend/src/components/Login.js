import React, { useState } from 'react';
import './styles/Login.css'; // Asegúrate de que el archivo CSS esté correctamente vinculado
import { login } from '../services/apiAuthService';
import { Link } from 'react-router-dom'; // Asegúrate de importar Link aquí


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login(username, password)
      localStorage.setItem('token', response.data.token);
      window.location.href = '/';
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      setError('Nombre de usuario o contraseña incorrectos');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <img src="https://i.ibb.co/M2bKR7W/LOGO-GRUPO-DE-TEATRO-SAN-FRANCISCO-SOLANO.png" alt="Logo del Grupo de Teatro San Francisco Solano" className="login-logo" />
        <h2>Accede a tu cuenta</h2>
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
        <button type="submit">Iniciar Sesión</button>
        <div className="login-links">
          <Link to={`/register`}>Crear Usuario</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
