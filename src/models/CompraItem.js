const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Compra = require('./Compra');
const Producto = require('./Producto');

const CompraItem = sequelize.define('CompraItem', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  compraId: { type: DataTypes.INTEGER, references: { model: Compra, key: 'id' } },
  productoId: { type: DataTypes.INTEGER, references: { model: Producto, key: 'id' } },
  cantidad: { type: DataTypes.INTEGER, allowNull: false },
  precio: { type: DataTypes.FLOAT, allowNull: false }
});

Compra.hasMany(CompraItem, { foreignKey: 'compraId' });
CompraItem.belongsTo(Compra, { foreignKey: 'compraId' });
CompraItem.belongsTo(Producto, { foreignKey: 'productoId' });

module.exports = CompraItem;
