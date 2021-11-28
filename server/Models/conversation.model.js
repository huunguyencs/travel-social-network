const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
  members: [{ type: mongoose.Types.ObjectId, ref: "users" }],
  name: String
},{
    timestamps: true
})


module.exports = mongoose.model('conversations', conversationSchema )