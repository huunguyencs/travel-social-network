const Provinces = require('../Models/province.model');
const Locations = require('../Models/location.model');
const Services = require('../Models/service.model');
const Events = require('../Models/event.model');

class ProvinceController {
    async createProvince(req, res) {
        try {
            const { name, fullname, information, image, detail, position } = req.body

            const newProvince = new Provinces({
                image, name, information, detail, fullname, position
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
            const { name, fullname, information, detail, image, position } = req.body;

            const province = await Provinces.findByIdAndUpdate(req.params.id, {
                name, fullname, information, detail, image, position
            }, { new: true })

            res.json({ success: true, message: "update province successful", province })
        } catch (err) {
            console.log(err)
            res.status(500).json({ success: false, message: err.message })
        }
    }

    async deleteProvince(req, res) {
        try {
            await Provinces.findByIdAndDelete(req.params.id);

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
            var province = await Provinces.findOne({ name: id });
            if (province) {
                res.json({
                    success: true, message: "get info 1 province success", province
                });
            }
            else {
                res.status(404).json({ success: false, message: "Không tìm thấy tỉnh!" });
            }


        } catch (err) {
            console.log(err)
            res.status(500).json({ success: false, message: err.message })
        }
    }

    async getLocationsProvince(req, res) {
        try {
            const locations = await Locations.find({ province: req.params.id });
            res.json({
                success: true,
                message: "Success",
                locations
            })
        }
        catch (err) {
            res.status(500).json({ success: false, message: err.message })
        }
    }

    async getEventsProvince(req, res) {
        try {
            const events = await Events.find({ provinceId: req.params.id });
            res.json({
                success: true,
                message: "Success",
                events
            })
        }
        catch (err) {
            res.status(500).json({ success: false, message: err.message })
        }
    }

    async getServicesProvince(req, res) {
        try {
            const services = await Services.find({ province: req.params.id });
            res.json({
                success: true,
                message: "Success",
                services
            })
        }
        catch (err) {
            res.status(500).json({ success: false, message: err.message })
        }
    }

    //Get all province
    async getProvinces(req, res) {
        try {
            const provinces = await Provinces.find({}, "fullname name position");
            res.json({ success: true, message: "get all provinces success", provinces });
        } catch (err) {
            console.log(err)
            res.status(500).json({ success: false, message: err.message })
        }
    }

    async getAllDetail(req, res) {
        try {
            const provinces = await Provinces.find({}, "fullname name image information");
            res.json({ success: true, message: "get all provinces success", provinces })
        } catch (err) {
            console.log(err)
            res.status(500).json({ success: false, message: err.message })
        }
    }

    async search(req, res) {
        try {
            var { q } = req.query;
            var provinces = await Provinces.find({ $text: { $search: q } }, { score: { $meta: "textScore" } }).limit(3)
                .sort({ score: { $meta: "textScore" } })
            provinces = provinces.map((item) => ({
                _id: item._id,
                fullname: item.fullname,
                link: `/province/${item.name}`,
                description: item.information,
                image: item.image
            }))
            res.json({ success: true, results: provinces, query: q })
        }
        catch (err) {
            res.status(500).json({ success: false, message: err.message })
        }
    }

}

module.exports = new ProvinceController;