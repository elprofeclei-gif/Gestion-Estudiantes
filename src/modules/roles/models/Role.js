const mongoose = require('mongoose');
const createSchema = require('../../../core/database/schema/createSchema');

const roleSchema = createSchema({
  nombre: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    uppercase: true,
  },

  descripcion: {
    type: String,
    trim: true,
    default: '',
  },

  permisos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Permission',
    },
  ],
});

module.exports = mongoose.model('Role', roleSchema);
