const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Client = new Schema({
  email: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  username: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  form: {
    type: Schema.Types.ObjectId,
    ref: "form",
    performance: {
      type: Number,
    },
  },
});
module.exports = mongoose.model("client", Client);
