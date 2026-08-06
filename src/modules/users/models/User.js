const mongoose = require('mongoose');
const createSchema = require('../../../core/database/schema/createSchema');

const userSchema = createSchema({
  nombres: {
    type: String,
    required: true,
    trim: true,
  },

  apellidos: {
    type: String,
    required: true,
    trim: true,
  },

  correo: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },

  password: {
    type: String,
    required: true,
    select: false,
  },

  rol: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role',
    required: true,
  },

  ultimoAcceso: {
    type: Date,
    default: null,
  },
});

module.exports = mongoose.model('User', userSchema);
