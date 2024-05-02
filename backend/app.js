const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const cors = require('cors');
const app = express();
const port = 5000;


// Importar rutas
const productRoutes = require('./routes/productRoutes');
const performanceRoutes = require('./routes/performanceRoutes');
const authRoutes = require('./routes/authRoutes');
const seatRoutes = require('./routes/seatRoutes');


app.use(cors());

app.use(bodyParser.json());

// Rutas
app.use('/api/products', productRoutes);
app.use('/api/performances', performanceRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/seats', seatRoutes);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
