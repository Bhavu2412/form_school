const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Client = new Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  forms: [
    {
      form: {
        type: Schema.Types.ObjectId,
        ref: "form",
      },
      answers: [
        {
          type: String,
        },
      ],
      performance: {
        type: Number,
      },
    },
  ],
});
module.exports = mongoose.model("client", Client);
