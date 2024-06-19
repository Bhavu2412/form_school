const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Form = new Schema({
  name: {
    type: String,
    require: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  description: {
    type: String,
  },
  code: {
    type: Number,
    require: true,
  },
  client: [
    {
      type: Schema.Types.ObjectId,
      ref: "client",
    },
  ],
  questions: [
    {
      question: {
        type: String,
      },
      options: [
        {
          type: String,
        },
      ],
      answer: {
        type: String,
      },
    },
  ],
});
module.exports = mongoose.model("form", Form);
