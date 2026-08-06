const mongoose = require('mongoose');
const createSchema = require('../../../core/database/schema/createSchema');

const permissionSchema = createSchema({
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
});

module.exports = mongoose.model('Permission', permissionSchema);
