const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const register = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    const usuarioExiste = await prisma.user.findUnique({ where: { email } });
    if (usuarioExiste) {
      return res.status(400).json({ error: 'El email ya está registrado' });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const usuario = await prisma.user.create({
      data: { nombre, email, password: passwordHash }
    });

    res.status(201).json({ mensaje: 'Usuario registrado correctamente', id: usuario.id });
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const usuario = await prisma.user.findUnique({ where: { email } });
    if (!usuario) {
      return res.status(400).json({ error: 'Credenciales incorrectas' });
    }

    const passwordValido = await bcrypt.compare(password, usuario.password);
    if (!passwordValido) {
      return res.status(400).json({ error: 'Credenciales incorrectas' });
    }

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ token, usuario: { id: usuario.id, nombre: usuario.nombre, email: usuario.email } });
  } catch (error) {
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};

module.exports = { register, login };