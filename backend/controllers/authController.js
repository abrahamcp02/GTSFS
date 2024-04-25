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
      // Generación del token JWT
      const token = jwt.sign({ username: user.username, role: user.role }, 'secreto', { expiresIn: '1h' });

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
  const { username, password, email, name } = req.body;

  console.log("Datos recibidos para registro:", { username, email, name });

  if (!password) {
    console.error("No se proporcionó contraseña.");
    return res.status(400).json({ message: "La contraseña es obligatoria." });
  }

  try {
    const users = await User.getByUsername(username);
    console.log("Resultado de búsqueda de usuario existente:", users);

    if (users.length > 0) {
      console.log("Usuario ya existe.");
      return res.status(409).json({ message: 'El usuario ya existe' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Contraseña hasheada:", hashedPassword);

    const result = await User.create(username, hashedPassword, name, email);
    console.log("Resultado de la creación del usuario:", result);

    const token = jwt.sign({ userId: result.insertId }, 'secreto', { expiresIn: '1h' });
    res.json({ message: 'Registro exitoso', token: token });
  } catch (error) {
    console.error('Error en el proceso de registro:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}




module.exports = { login, register };