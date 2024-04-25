const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'oraclepr.uco.es',
  user: 'i02copea',
  password: 'Ab.27092002',
  database: 'i02copea'
});

connection.connect(error => {
  if (error) throw error;
  console.log('¡Conectado a la base de datos MySQL!');
});

module.exports = connection;
