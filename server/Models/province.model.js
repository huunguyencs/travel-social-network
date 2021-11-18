const mongoose = require('mongoose');

const provinceSchema = new mongoose.Schema({
   name:{
       type:String,
       required: true
   },
   information: String,
   locations:[{ type: mongoose.Types.ObjectId, ref: 'locations'}],
   services: [{ type: mongoose.Types.ObjectId, ref: 'services'}],
   image: {type: String}
},{
    timestamps: true
})


module.exports = mongoose.model('provinces', provinceSchema )