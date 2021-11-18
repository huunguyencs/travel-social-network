const mongoose = require('mongoose');

const tourDateSchema = new mongoose.Schema({
   date: Date,
   locations: [
       {
           locationId:{ type: mongoose.Types.ObjectId, ref: 'locations'},
           cost: Number,
           postId: { type: mongoose.Types.ObjectId, ref: 'posts'}
       }
   ]
},{
    timestamps: true
})


module.exports = mongoose.model('tour_dates', tourDateSchema)