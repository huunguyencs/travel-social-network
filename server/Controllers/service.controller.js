const Services = require('../Models/service.model')
const Locations = require('../Models/location.model')

class ServiceController {
    async createService(req, res) {
        try {
            const { name, description, price, type, locationId, rate, images } = req.body

            const newService = new Services({
                name, description, price, type, locationId, rate, images
            })
            await newService.save()

            const location = await Locations.findById(locationId);
            if (!location) {
                return res.status(400).json({ success: false, message: "This location is not exist." })
            }

            await Locations.findOneAndUpdate({ _id: locationId }, {
                $push: {
                    services: newService._id
                }
            })
            console.log(location)
            res.json({
                success: true,
                message: "Create Service successful",
                //  newService: {
                //     ...newService._doc,
                // }
            })
        } catch (err) {
            console.log(err)
            res.status(500).json({ success: false, message: err.message })
        }
    }

    async updateService(req, res) {
        try {
            const { name, description, price, type, locationId, rate, images } = req.body

            const service = await Services.findOneAndUpdate({ _id: req.params.id }, {
                name, description, price, type, locationId, rate, images
            }, { new: true })

            res.json({ success: true, message: "update Service successful", service })
        } catch (err) {
            console.log(err)
            res.status(500).json({ success: false, message: err.message })
        }
    }

    async deleteService(req, res) {
        try {
            await Services.findOneAndDelete({ _id: req.params.id });

            res.json({
                success: true, message: "Delete Service success"
            });
        } catch (err) {
            console.log(err)
            res.status(500).json({ success: false, message: err.message })
        }
    }

    // lấy thông tin 1 Service theo params.id
    async getService(req, res) {
        try {
            const service = await Services.findById(req.params.id)
                .populate("locationId")
            res.json({
                success: true, message: "get info 1 Service success", service
            });
        } catch (err) {
            console.log(err)
            res.status(500).json({ success: false, message: err.message })
        }
    }

    //Get all Service
    async getServices(req, res) {
        try {
            const service = await Services.find()
                .populate("locationId")
            res.json({ success: true, message: "get info all Service success", service });
        } catch (err) {
            console.log(err)
            res.status(500).json({ success: false, message: err.message })
        }
    }

}

module.exports = new ServiceController;