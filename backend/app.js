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
const seatPriceRoutes = require('./routes/seatPriceRoutes');
const newsRoutes = require('./routes/newsRoutes');
const rowRoutes = require('./routes/rowRoutes');
const theaterRoutes = require('./routes/theaterRoutes');

app.use(cors());

app.use(bodyParser.json());

// Rutas
app.use('/api/products', productRoutes);
app.use('/api/performances', performanceRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/seats', seatRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/rows', rowRoutes);
app.use('/api/theaters', theaterRoutes);
app.use('/api/seatPrices', seatPriceRoutes);
app.use('/api', seatPriceRoutes);


app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
