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
  image: {
    type: String,
  },
  form: [
    {
      type: Schema.Types.ObjectId,
      ref: "form",
    },
  ],
  client: [
    {
      type: Schema.Types.ObjectId,
      ref: "client",
    },
  ],
});
module.exports = mongoose.model("user", User);
