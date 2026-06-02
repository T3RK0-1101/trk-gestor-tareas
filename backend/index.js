const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth.routes');
const taskRoutes = require('./routes/task.routes');
const consejosRoutes = require('./routes/consejos.routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);
app.use('/consejos', consejosRoutes);

app.get('/', (req, res) => {
  res.json({ mensaje: 'Servidor funcionando correctamente' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});