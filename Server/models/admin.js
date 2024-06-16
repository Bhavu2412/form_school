const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Admin = new Schema({
  email: {
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
  user: [
    {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  ],
});
module.exports = mongoose.model("admin", Admin);
