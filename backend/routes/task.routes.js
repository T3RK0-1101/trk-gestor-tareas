const express = require('express');
const router = express.Router();
const { getTasks, getHistorial, getTareasVencidas, createTask, updateTask, deleteTask } = require('../controllers/task.controller');
const { verificarToken } = require('../middleware/auth.middleware');

router.get('/', verificarToken, getTasks);
router.get('/historial', verificarToken, getHistorial);
router.get('/vencidas', verificarToken, getTareasVencidas);
router.post('/', verificarToken, createTask);
router.put('/:id', verificarToken, updateTask);
router.delete('/:id', verificarToken, deleteTask);

module.exports = router;