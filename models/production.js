const mongoose = require('mongoose');

const productionSchema = new mongoose.Schema(
  {
    productionName: { type: String, required: true },
    form: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Form',
      required: true
    }
  },
  { collection: 'productions' }
);

module.exports = mongoose.model('Production', productionSchema);
