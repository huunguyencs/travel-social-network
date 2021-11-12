const mongoose = require('mongoose');

const provinceSchema = new mongoose.Schema({
   Name:{
       type:String,
       required: true
   },
   information:{
       type: String,
       required: true
   },
   locations:[{ type: mongoose.Types.ObjectId, ref: 'locations'}],
//    service: [{ type: mongoose.Types.ObjectId, ref: 'service'}]
},{
    timestamps: true
})


module.exports = mongoose.model('provinces', provinceSchema )