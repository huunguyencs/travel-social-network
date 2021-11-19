const Provinces = require('../Models/province.model')

class ProvinceController {
    async createProvince(req, res){
        try{
            const  {name, information, image} = req.body

            const newProvince = new Provinces({
                image, name, information
            })
            await newProvince.save()

             res.json({
                 success:true,
                 message:"Create province successful",
                 newProvince: {
                    ...newProvince._doc,
                }
             })
        }catch(err){
            console.log(err)
            res.status(500).json({success: false, message: err.message})
        }
    }
    
    async updateProvince(req, res){
        try{
            const  {name, information, image} = req.body

            const province = await Provinces.findOneAndUpdate({ _id: req.params.id }, {
                name, information, image            
            }, { new: true })

            res.json({success:true, message:"update province successful", province})
        }catch(err){
            console.log(err)
            res.status(500).json({success: false, message: err.message})
        }
    }

    async deleteProvince(req, res){
        try{
            await Provinces.findOneAndDelete({ _id: req.params.id});

            res.json({
                success:true, message:"Delete province success"
            });
        }catch(err){
            console.log(err)
            res.status(500).json({success: false, message: err.message})
        }
    }

    // lấy thông tin 1 Province theo params.id
    async getProvince(req, res){
        try{
            const province = await Provinces.findById(req.params.id)
                .populate("locations services")
            res.json({
                success:true, message:"get info 1 province success", province
            });
        }catch(err){
            console.log(err)
            res.status(500).json({success: false, message: err.message})
        }
    }

    //Get all province
    async getProvinces(req, res){
        try{
            const province = await Provinces.find()
                .populate("locations services")
            res.json({ success:true, message:"get info 1 Province success", province});
        }catch(err){
            console.log(err)
            res.status(500).json({success: false, message: err.message})
        }
    }

}

module.exports = new ProvinceController;