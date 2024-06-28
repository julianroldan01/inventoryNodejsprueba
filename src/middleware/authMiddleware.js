const jwt = require('jsonwebtoken');
const { Usuario } = require('../models');

exports.verificarAuth = async (req, res, next) => {
  const tokenBearer = req.headers['authorization'];
  const token = tokenBearer.replace("Bearer ", "");
  if (!token) {
    return res.status(403).json({ mensaje: 'Token no proporcionado' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = await Usuario.findByPk(decoded.id);
    next();
  } catch (error) {
    res.status(401).json({ mensaje: 'Token inválido' });
  }
};

exports.verificarAdmin = async (req, res, next) => {
  await this.verificarAuth(req, res, async () => {
    if (req.usuario.role !== 'admin') {
      return res.status(403).json({ mensaje: 'Acceso denegado' });
    }
    next();
  });
};

exports.verificarCliente = async (req, res, next) => {
  await this.verificarAuth(req, res, async () => {
    if (req.usuario.role !== 'cliente') {
      return res.status(403).json({ mensaje: 'Acceso denegado' });
    }
    next();
  });
};
