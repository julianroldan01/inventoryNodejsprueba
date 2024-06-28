const { Compra, CompraItem, Producto, Usuario } = require('../models');

exports.crearCompra = async (req, res) => {
  try {
    const { usuarioId, items } = req.body;
    let precioTotal = 0;

    for (const item of items) {
      const producto = await Producto.findOne({ where: { id: item.productoId } });
      if (!producto || producto.cantidad < item.cantidad) {
        return res.status(400).json({ error: 'Producto no disponible o cantidad insuficiente' });
      }
      precioTotal += producto.precio * item.cantidad;
    }

    const compra = await Compra.create({ usuarioId, precioTotal });
    
    for (const item of items) {
      const producto = await Producto.findOne({ where: { id: item.productoId } });
      await CompraItem.create({
        compraId: compra.id,
        productoId: item.productoId,
        cantidad: item.cantidad,
        precio: producto.precio
      });
      producto.cantidad -= item.cantidad;
      await producto.save();
    }

    res.status(201).json({ mensaje: 'Compra realizada', compra });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.obtenerCompras = async (req, res) => {
  try {
    const compras = await Compra.findAll({
      include: [
        { model: CompraItem, include: [Producto] },
        { model: Usuario }
      ]
    });
    res.json(compras);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.obtenerCompraPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const compra = await Compra.findOne({
      where: { id },
      include: [
        { model: CompraItem, include: [Producto] },
        { model: Usuario }
      ]
    });
    if (!compra) {
      res.status(404).json({ mensaje: 'Compra no encontrada' });
    } else {
      res.json(compra);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
