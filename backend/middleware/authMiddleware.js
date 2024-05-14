const jwt = require('jsonwebtoken');
const secret = "secreto"; // Asegúrate de definir JWT_SECRET en tu archivo .env

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token.split(' ')[1], secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Failed to authenticate token' });
    }

    req.user = decoded; // Guardamos los datos del usuario en req.user
    next();
  });
};

module.exports = authMiddleware;
