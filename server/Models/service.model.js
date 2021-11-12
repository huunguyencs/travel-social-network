const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
   serviceName:{
       type:String,
       required: true
   },
   description: String,
   price: Number,
   typeService: String,
   location: {type: mongoose.Types.ObjectId, ref: 'locations'},
   rate: Number
},{
    timestamps: true
})


module.exports = mongoose.model('services', serviceSchema)