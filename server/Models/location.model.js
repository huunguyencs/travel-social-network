const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
   locationName:{
       type: String,
       required: true
   },
   rate: Number,
   province: {type: mongoose.Types.ObjectId, ref: 'provinces'},
   disease: String,
   position:{
        longitude: String,
        latitude: String
   },
   weather: String
},{
    timestamps: true
})


module.exports = mongoose.model('locations', locationSchema)