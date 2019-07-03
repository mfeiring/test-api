const mongoose = require('mongoose');

const agencySchema = new mongoose.Schema(
  {
    agencyName: {
      type: String,
      required: true
      //unique: true => Fjerna denne enn så lenge det bare brukes Dummy
    },
    productions: [mongoose.Schema.Types.ObjectId]
  },
  { collection: 'agencies' }
);

module.exports = mongoose.model('Agency', agencySchema);
