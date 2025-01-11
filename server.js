const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const db = require('./db');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Ruta de Registro
app.post('/register', (req, res) => {
    const { firstName, fatherLastName, motherLastName, email, phone, username, password } = req.body;

    // Validación de entrada
    if (!firstName || !fatherLastName || !motherLastName || !email || !phone || !username || !password) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    if (!/^\d{10}$/.test(phone)) {
        return res.status(400).json({ error: 'El teléfono debe tener 10 dígitos' });
    }

    if (!/^[a-zA-Z0-9]{8,}$/.test(username)) {
        return res.status(400).json({ error: 'El nombre de usuario debe tener al menos 8 caracteres sin caracteres especiales.' });
    }

    if (!/^[a-zA-Z0-9]{5,}$/.test(password)) {
        return res.status(400).json({ error: 'La contraseña debe tener al menos 5 caracteres alfanuméricos' });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const query = `INSERT INTO users (first_name, father_last_name, mother_last_name, email, phone, username, password)
                   VALUES (?, ?, ?, ?, ?, ?, ?)`;

    db.query(query, [firstName, fatherLastName, motherLastName, email, phone, username, hashedPassword], (err) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ error: 'El nombre de usuario o el correo electrónico ya existe' });
            }
            return res.status(500).json({ error: 'Error de base de datos' });
        }
        res.status(200).json({ message: 'Registro exitoso' });
    });
});

// Ruta de inicio de sesión
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Ambos campos son obligatorios' });
    }

    const query = `SELECT * FROM users WHERE username = ?`;

    db.query(query, [username], (err, results) => {
        if (err) return res.status(500).json({ error: 'Error de base de datos' });

        if (results.length === 0) {
            return res.status(401).json({ error: 'Nombre de usuario o contraseña no válidos' });
        }

        const user = results[0];
        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ error: 'Nombre de usuario o contraseña no válidos' });
        }

        res.status(200).json({ message: 'Inicio de sesión exitoso' });
    });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
