const express = require('express');
const {
  crearProducto,
  obtenerProductos,
  actualizarProducto,
  eliminarProducto
} = require('../controllers/productController');
const { verificarAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', verificarAdmin, crearProducto);
router.get('/', obtenerProductos);
router.put('/:id', verificarAdmin, actualizarProducto);
router.delete('/:id', verificarAdmin, eliminarProducto);

module.exports = router;
