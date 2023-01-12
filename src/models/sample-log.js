const mongoose = require(`mongoose`);
const Schema = mongoose.Schema;

const sampleLogSchema = new Schema(
  {
    socket_id: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

//  3번째 인자로 사용할 스키마를 정의한다,
//  인자가 2개이면, logs로 된다
module.exports = mongoose.model('Log', sampleLogSchema, 'log');
//module.exports = mongoose.model('Log', sampleLogSchema);
