const Services = require('../Models/service.model')
// const Locations = require('../Models/location.model')
const ServiceItems = require('../Models/serviceItem.model')

class ServiceController {
    async createService(req, res) {
        try {
            const { name, fullname, description, type, province, images, serviceItem } = req.body

            const newService = new Services({
                name, fullname, description, type, province, images
            })

            await newService.save()
            if (serviceItem.length > 0) {
                serviceItem.forEach(async function (element) {
                    const newServiceItem = new ServiceItems({
                        name: element.name,
                        description: element.description,
                        cost: element.cost
                    })

                    await newServiceItem.save();

                    await Services.findOneAndUpdate({ _id: newService._id }, {
                        $push: {
                            serviceItem: newService._id
                        }
                    })
                })
            }

            // console.log(location)
            res.json({
                success: true,
                message: "Create Service successful",
                newService: {
                    ...newService._doc,
                }
            })
        } catch (err) {
            console.log(err)
            res.status(500).json({ success: false, message: err.message })
        }
    }

    async updateService(req, res) {
        try {
            const { name, fullname, description, type, province, images } = req.body

            const service = await Services.findOneAndUpdate({ _id: req.params.id }, {
                name, fullname, description, type, province, images
            }, { new: true })

            res.json({ success: true, message: "update Service successful", service })
        } catch (err) {
            console.log(err)
            res.status(500).json({ success: false, message: err.message })
        }
    }

    async updateServiceItem(req, res) {
        try {
            const { name, description, cost, discount } = req.body;
            const serviceItem = await ServiceItems.findOneAndUpdate({ _id: req.params.id }, {
                name, description, cost, discount
            }, { new: true })

            res.json({
                success: true,
                message: "",
                serviceItem
            })
        }
        catch (err) {
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

    async getServinceByProvince(req, res) {
        try {
            const services = Services.find({ province: req.params.id })
                .populate("serviceItem");
            res.json({ success: true, message: "", services })
        }
        catch (err) {
            res.status(500).json({ success: false, message: err.message })
        }
    }
}

module.exports = new ServiceController;