const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Question = new Schema({
    form:{
        type: Schema.Types.ObjectId,
        ref:'form'
    },
    question:[
        {
            type:String,
            options:[
                {
                    type:String
                }
            ],
            answer:{
                type:String,
                required:true
            }
        }
    ]
});
module.exports = mongoose.model("qa", Question);
