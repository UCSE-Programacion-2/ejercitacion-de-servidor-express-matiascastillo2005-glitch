const express = require('express');

const app = express();

const productos = [
  { id: 1, nombre: 'Laptop', categoria: 'electronica' },
  { id: 2, nombre: 'Silla', categoria: 'muebles' },
  { id: 3, nombre: 'Monitor', categoria: 'electronica' },
];

const usuarios = [
  { id: 1, nombre: 'Juan' },
  { id: 2, nombre: 'Maria' },
  { id: 3, nombre: 'Pedro' },
];

// TODO: Define tus rutas aquí
// 1. Ruta Raíz (/)
app.get('/', (req, res) => {
  res.send('Bienvenid@s a nuestro servidor Express!');
});

// 2. Ruta /productos (Maneja lista completa y filtro por Query string)
app.get('/productos', (req, res) => {
  const { categoria } = req.query;

  // Si el cliente envía una categoría, filtramos el arreglo usando .filter()
  if (categoria) {
    const productosFiltrados = productos.filter(
      (p) => p.categoria.toLowerCase() === categoria.toLowerCase()
    );
    return res.json(productosFiltrados);
  }

  // Si no envía query string, devolvemos el arreglo completo
  res.json(productos);
});

// 3. Ruta /usuarios/:id (Maneja parámetro de ruta)
app.get('/usuarios/:id', (req, res) => {
  const idUsuario = parseInt(req.params.id, 10); // Convertimos el parámetro de texto a número
  const usuarioEncontrado = usuarios.find((u) => u.id === idUsuario);

  // Si el usuario no existe (.find() devuelve undefined), enviamos código 404
  if (!usuarioEncontrado) {
    return res.status(404).send('Usuario no encontrado.');
  }

  // Si existe, lo devolvemos en formato JSON
  res.json(usuarioEncontrado);
});

// 4. Manejo de cualquier otra ruta no definida (404 Global)
app.use((req, res) => {
  res.status(404).send('No se ha encontrado la ruta ingresada.');
});

module.exports = app;
