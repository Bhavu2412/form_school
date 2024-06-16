const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
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
  profession: {
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
  },
});
module.exports = mongoose.model("user", User);
