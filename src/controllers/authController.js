const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Usuario } = require('../models');

exports.registrar = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const usuario = await Usuario.create({ username, password: hashedPassword, role });
    res.status(201).json({ mensaje: 'Usuario creado', usuario });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.iniciarSesion = async (req, res) => {
  try {
    const { username, password } = req.body;
    const usuario = await Usuario.findOne({ where: { username } });
    if (!usuario || !await bcrypt.compare(password, usuario.password)) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }
    const token = jwt.sign({ id: usuario.id, role: usuario.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ mensaje: 'Inicio de sesión exitoso', token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
