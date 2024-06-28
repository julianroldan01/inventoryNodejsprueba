const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuario = require('./Usuario');

const Compra = sequelize.define('Compra', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  usuarioId: { type: DataTypes.INTEGER, references: { model: Usuario, key: 'id' } },
  precioTotal: { type: DataTypes.FLOAT, allowNull: false },
  fechaCompra: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

module.exports = Compra;
