const express = require('express');
const { registrar, iniciarSesion } = require('../controllers/authController');

const router = express.Router();

router.post('/register', registrar);
router.post('/login', iniciarSesion);

module.exports = router;
