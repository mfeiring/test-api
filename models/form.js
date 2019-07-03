const mongoose = require('mongoose');

const formSchema = new mongoose.Schema(
  {
    created: { type: Date, default: Date.now },
    lastUpdated: { type: Date, default: Date.now },
    questions: [
      {
        title: { type: String, required: true },
        comment: { type: String, default: '' },
        chosenScore: { type: Number, default: 0 },
        maxScore: Number
      }
    ],
    totalScore: { type: Number, default: 0 },
    totalCO2e: { type: Number, default: 0 }
  },
  { collection: 'forms' }
);

module.exports = mongoose.model('Form', formSchema);
