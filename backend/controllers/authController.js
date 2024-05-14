const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

function login(req, res) {
  const { username, password } = req.body;
  console.log("username es " + username);

  User.getByUsername(username, (error, results) => {
    if (error) {
      console.error('Error al buscar el usuario:', error);
      return res.status(500).json({ message: 'Error en el servidor' });
    }

    if (results.length === 0) {
      console.error('Error al buscar el usuario:', error);
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    const user = results[0];
    console.log("Usuario encontrado:", user);

    bcrypt.compare(password, user.password, (err, match) => {
      if (err) {
        console.error('Error al verificar la contraseña:', err);
        return res.status(500).json({ message: 'Error en el servidor' });
      }

      if (!match) {
        console.error('Error al verificar la contraseña:', err);
        return res.status(401).json({ message: 'Contraseña incorrecta' });
      }

      console.log("contraseña correcta");
      console.log("UserID:", user.id)
      // Generación del token JWT
      const token = jwt.sign({ username: user.username, role: user.role, id: user.id }, 'secreto', { expiresIn: '1h' });

      // Envío del token como respuesta
      res.json({
        message: 'Inicio de sesión exitoso',
        token: token
      });
      console.log("INICIO SESION EXITOSO");
    });
  });
}

async function register(req, res) {
  const { username, email, name, password } = req.body;

  try {
    // Verifica si el usuario ya existe
    const existingUser = await User.getByUsername(username);
    if (existingUser) {
      return res.status(400).json({ message: 'El nombre de usuario ya está en uso' });
    }
    const saltRounds = 10; // Es común usar 10 rondas de sal
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    // Crea un nuevo usuario
    const user = await User.create(username, email, name, hashedPassword);
  } catch (error) {
    console.error('Error en el registro de usuario:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
}


module.exports = { login, register };