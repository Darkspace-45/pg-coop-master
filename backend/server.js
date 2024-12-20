const express = require('express');
const cors = require('cors');
const pool = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Rutas para el API, aqui se envia el json
app.post('/api/usuarios', async (req, res) => {
  const { codigo_usuario, nombre, apellido, telefono, correo_electronico, cedula } = req.body;
  try {
    //el insert normal de toda la vida
    const result = await pool.query(
      'INSERT INTO usuario2 (codigo_usuario, nombre, apellido, telefono, correo_electronico, cedula) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [codigo_usuario, nombre, apellido, telefono, correo_electronico, cedula]
    );
    //esta respuesta es la que nos da el JSON para saber si se guarda
    res.status(201).json({ message: 'Usuario agregado exitosamente', user: result.rows[0] });
  } catch (error) {
    console.error('Error al agregar usuario:', error);
    res.status(500).json({ error: 'Ocurrió un error al agregar el usuario' });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en http://localhost:${PORT}`);
});
