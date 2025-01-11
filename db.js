const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'admin',       
    password: 'VDXd3bhiwAXKg.Ge',       
    database: 'user_system'
});

db.connect((err) => {
    if (err) {
        console.error('Error en la conexión a la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos MySQL');
});

module.exports = db;
