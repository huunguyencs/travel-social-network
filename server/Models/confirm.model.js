const mongoose = require('mongoose');

const confirmSchema = new mongoose.Schema({
    cmnd: String,
    cmndFront: String,
    cmndBack: String,
    cmndFace: String,
    state: String
}, {
    timestamps: true
})


module.exports = mongoose.model('confirms', confirmSchema)