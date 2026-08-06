const mongoose = require('mongoose');

function createSchema(definition, options = {}) {
  return new mongoose.Schema(
    {
      ...definition,

      estado: {
        type: Boolean,
        default: true,
      },

      createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null,
      },

      updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null,
      },

      deletedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null,
      },

      deletedAt: {
        type: Date,
        default: null,
      },
    },
    {
      timestamps: true,
      versionKey: false,
      ...options,
    }
  );
}

module.exports = createSchema;
