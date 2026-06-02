const express = require('express');
const router = express.Router();
const { getConsejo } = require('../controllers/consejos.controller');
const { verificarToken } = require('../middleware/auth.middleware');

router.post('/', verificarToken, getConsejo);

module.exports = router;