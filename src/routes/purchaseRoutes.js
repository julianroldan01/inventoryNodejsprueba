const express = require('express');
const {
  crearCompra,
  obtenerCompras,
  obtenerCompraPorId
} = require('../controllers/purchaseController');
const { verificarCliente } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', verificarCliente, crearCompra);
router.get('/', obtenerCompras);
router.get('/:id', obtenerCompraPorId);

module.exports = router;
