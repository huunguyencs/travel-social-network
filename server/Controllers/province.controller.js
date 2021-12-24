const Provinces = require('../Models/province.model');
const Locations = require('../Models/location.model');
const Services = require('../Models/service.model');

class ProvinceController {
    async createProvince(req, res) {
        try {
            const { name, information, image } = req.body

            const newProvince = new Provinces({
                image, name, information
            })
            await newProvince.save()

            res.json({
                success: true,
                message: "Create province successful",
                newProvince: {
                    ...newProvince._doc,
                }
            })
        } catch (err) {
            console.log(err)
            res.status(500).json({ success: false, message: err.message })
        }
    }

    async updateProvince(req, res) {
        try {
            const { name, information, image } = req.body

            const province = await Provinces.findOneAndUpdate({ _id: req.params.id }, {
                name, information, image
            }, { new: true })

            res.json({ success: true, message: "update province successful", province })
        } catch (err) {
            console.log(err)
            res.status(500).json({ success: false, message: err.message })
        }
    }

    async deleteProvince(req, res) {
        try {
            await Provinces.findOneAndDelete({ _id: req.params.id });

            res.json({
                success: true, message: "Delete province success"
            });
        } catch (err) {
            console.log(err)
            res.status(500).json({ success: false, message: err.message })
        }
    }

    // lấy thông tin 1 Province theo params.id
    async getProvince(req, res) {
        try {
            const id = req.params.id;
            var province = await Provinces.findById(id);
            // .populate("locations services")
            const locations = await Locations.find({ "province": id })
            const services = await Services.find({ "province": id })
            res.json({
                success: true, message: "get info 1 province success", province, locations, services
            });
        } catch (err) {
            console.log(err)
            res.status(500).json({ success: false, message: err.message })
        }
    }

    //Get all province
    async getProvinces(req, res) {
        try {
            const provinces = await Provinces.find();
            res.json({ success: true, message: "get all provinces success", provinces });
        } catch (err) {
            console.log(err)
            res.status(500).json({ success: false, message: err.message })
        }
    }

}

module.exports = new ProvinceController;