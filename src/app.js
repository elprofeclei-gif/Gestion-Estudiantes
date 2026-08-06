const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const routes = require('./routes');
const errorHandler = require('./core/middlewares/errorHandler');
const NotFoundError = require('./core/errors/NotFoundError');

const app = express();

app.use(helmet());
app.use(cors());
app.use(compression());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.json({
    ok: true,
    message: 'API Gestión Estudiantil',
  });
});

// Registrar rutas
app.use('/api', routes);

// Ruta no encontrada
app.use((req, res, next) => {
  next(new NotFoundError('Ruta no encontrada.'));
});

// Manejador global de errores
app.use(errorHandler);

module.exports = app;
