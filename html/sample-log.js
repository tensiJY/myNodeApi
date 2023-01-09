const mongoose = require(`mongoose`);
const Schema = mongoose.Schema;

const sampleLogSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

//module.exports = mongoose.model('Log', sampleLogSchema, 'log');
module.exports = mongoose.model('Log', sampleLogSchema);
