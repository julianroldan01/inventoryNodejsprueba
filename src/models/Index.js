const sequelize = require('../config/database');

const Usuario = require('./Usuario');
const Producto = require('./Producto');
const Compra = require('./Compra');
const CompraItem = require('./CompraItem');

Usuario.hasMany(Compra, { foreignKey: 'usuarioId' });
Compra.belongsTo(Usuario, { foreignKey: 'usuarioId' });

sequelize.sync();

module.exports = {
  Usuario,
  Producto,
  Compra,
  CompraItem
};
