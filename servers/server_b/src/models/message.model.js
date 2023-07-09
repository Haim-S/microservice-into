const {Schema, model} = require("mongoose");

const messageSchema = new Schema({
    from: {type: String, required: [true, "Please write your name"]},
    message: {type: String, required: [true, "Must write a message"]},
    Approval: {type: Boolean, default: false},
},{timestamps: true});

module.exports = model("Message", messageSchema);