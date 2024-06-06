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
const ticketRoutes = require('./routes/ticketsRoutes');
const productCartRoutes = require('./routes/productCartRoutes');
const orderRoutes = require('./routes/orderRoutes');

const corsOptions = {
  origin: ['http://localhost:3000', 'http://192.168.137.1:3000'], // Reemplaza <YOUR_IP_ADDRESS> con tu IP
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
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
app.use('/api/tickets', ticketRoutes);
app.use('/api/product-cart', productCartRoutes);
app.use('/api/orders', orderRoutes);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
