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

module.exports = Object.freeze({
  port: Number(process.env.PORT),

  nodeEnv: process.env.NODE_ENV,

  mongoUri: process.env.MONGODB_URI,

  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES,
  },

  bcrypt: {
    rounds: Number(process.env.BCRYPT_ROUNDS),
  },

  admin: {
    nombres: process.env.ADMIN_NOMBRES,
    apellidos: process.env.ADMIN_APELLIDOS,
    correo: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
  },
});
