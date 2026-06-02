const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getTasks = async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      where: { userId: req.usuario.id, eliminada: false },
      orderBy: { createdAt: 'desc' }
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener tareas' });
  }
};

const getHistorial = async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      where: { userId: req.usuario.id, eliminada: true },
      orderBy: { createdAt: 'desc' }
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener historial' });
  }
};

const getTareasVencidas = async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      where: {
        userId: req.usuario.id,
        eliminada: false,
        status: 'pendiente',
        dueDate: { lt: new Date() }
      },
      orderBy: { dueDate: 'asc' }
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener tareas vencidas' });
  }
};

const createTask = async (req, res) => {
  try {
    const { title, description, dueDate } = req.body;
    const task = await prisma.task.create({
      data: {
        title,
        description,
        dueDate: dueDate ? new Date(dueDate) : null,
        userId: req.usuario.id
      }
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear tarea' });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status, dueDate } = req.body;

    const task = await prisma.task.findUnique({ where: { id: parseInt(id) } });
    if (!task || task.userId !== req.usuario.id) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    const taskActualizada = await prisma.task.update({
      where: { id: parseInt(id) },
      data: { title, description, status, dueDate: dueDate ? new Date(dueDate) : null }
    });
    res.json(taskActualizada);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar tarea' });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await prisma.task.findUnique({ where: { id: parseInt(id) } });
    if (!task || task.userId !== req.usuario.id) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    await prisma.task.update({
      where: { id: parseInt(id) },
      data: { eliminada: true }
    });
    res.json({ mensaje: 'Tarea eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar tarea' });
  }
};

module.exports = { getTasks, getHistorial, getTareasVencidas, createTask, updateTask, deleteTask };