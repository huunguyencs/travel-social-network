const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
   posts:[{type: mongoose.Types.ObjectId, ref: 'posts'}],
   schedule: {
       type: Number
   },
   tourName:{
       type: String, 
       required: true
   },
   isPublic:{
       type:Boolean,
       default: true
   },
//    taggedIds: [{ type: mongoose.Types.ObjectId, ref: 'user'}]
},{
    timestamps: true
})


module.exports = mongoose.model('tours', tourSchema)