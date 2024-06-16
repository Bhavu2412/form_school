const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Form = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  code: {
    type: Number,
    require: true,
  },
  client: {
    type: Schema.Types.ObjectId,
    ref: "client",
  },
});
module.exports = mongoose.model("form", Form);
