const mongoose = require('mongoose');

const serviceItemSchema = new mongoose.Schema({
    name: String,
    description: String,
    cost: Number,
    discount: {
        cost: Number,
        description: String
    }
})

module.exports = mongoose.model('serviceItems', serviceItemSchema)