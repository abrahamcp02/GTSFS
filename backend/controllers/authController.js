const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

function login(req, res) {
  const { username, password } = req.body;

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

    bcrypt.compare(password, user.password, (err, match) => {
      if (err) {
        console.error('Error al verificar la contraseña:', err);
        return res.status(500).json({ message: 'Error en el servidor' });
      }

      if (!match) {
        console.error('Error al verificar la contraseña:', err);
        return res.status(401).json({ message: 'Contraseña incorrecta' });
      }

      const token = jwt.sign(
        { username: user.username, role: user.role, id: user.id },
        'secreto',
        { expiresIn: '1h' }
      );

      // Envío del token como respuesta
      res.json({
        message: 'Inicio de sesión exitoso',
        token: token
      });
    });
  });
}

async function register(req, res) {
  const { username, email, name, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    User.create({ username, email, name, password: hashedPassword }, (err, result) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(409).json({ message: 'Username or email already exists' });
        }
        return res.status(500).json({ message: 'Error registering user' });
      }

      // Automatically log in the user after successful registration
      const token = jwt.sign({ id: result.insertId, username, role: 'user' }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(201).json({ message: 'User registered successfully', token });
    });
  } catch (error) {
    console.error('Error in registration:', error);
    res.status(500).json({ message: 'Error registering user' });
  }
};


module.exports = { login, register };