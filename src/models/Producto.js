const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Producto = sequelize.define('Producto', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  numeroLote: { type: DataTypes.STRING, allowNull: false },
  nombre: { type: DataTypes.STRING, allowNull: false },
  precio: { type: DataTypes.FLOAT, allowNull: false },
  cantidad: { type: DataTypes.INTEGER, allowNull: false },
  fechaIngreso: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

module.exports = Producto;
