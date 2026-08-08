require('dotenv').config();

const requiredVariables = [
  'PORT',
  'NODE_ENV',
  'MONGODB_URI',
  'JWT_SECRET',
  'JWT_EXPIRES',
  'BCRYPT_ROUNDS',
  'ADMIN_NOMBRES',
  'ADMIN_APELLIDOS',
  'ADMIN_EMAIL',
  'ADMIN_PASSWORD',
];

requiredVariables.forEach((variable) => {
  if (!process.env[variable]) {
    throw new Error(`La variable de entorno ${variable} es obligatoria.`);
  }
});

const port = Number(process.env.PORT);
const bcryptRounds = Number(process.env.BCRYPT_ROUNDS);

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error('PORT debe ser un número entero entre 1 y 65535.');
}

if (!Number.isInteger(bcryptRounds) || bcryptRounds < 8 || bcryptRounds > 15) {
  throw new Error('BCRYPT_ROUNDS debe ser un entero entre 8 y 15.');
}

module.exports = Object.freeze({
  port,
  nodeEnv: process.env.NODE_ENV,
  mongoUri: process.env.MONGODB_URI,

  jwt: Object.freeze({
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES,
  }),

  bcrypt: Object.freeze({
    rounds: bcryptRounds,
  }),

  admin: Object.freeze({
    nombres: process.env.ADMIN_NOMBRES,
    apellidos: process.env.ADMIN_APELLIDOS,
    correo: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
  }),
});
