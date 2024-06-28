const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const logger = require('./utils/logger');
const sequelize = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const purchaseRoutes = require('./routes/purchaseRoutes');

dotenv.config();

const app = express();

app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/purchases', purchaseRoutes);

app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send('Algo salió mal');
});

const PORT = process.env.PORT || 3000;

sequelize.authenticate().then(() => {
  logger.info('Conexión a la base de datos exitosa');
  app.listen(PORT, () => {
    logger.info(`Servidor ejecutándose en el puerto ${PORT}`);
  });
}).catch(err => {
  logger.error('No se pudo conectar a la base de datos:', err);
});
