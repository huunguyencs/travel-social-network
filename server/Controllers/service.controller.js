const Services = require('../Models/service.model')


class ServiceController {
    async createService(req, res) {
        try {
            if (req.user.role !== 1) {
                res.status(500).json({ success: false, message: "You are not cooperator" })
                return;
            }

            const { name, description, type, province, images, cost, discount } = req.body

            const newService = new Services({
                cooperator: req.user._id, name, description, type, province, images, cost, discount
            })

            await newService.save()

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

            const { name, description, type, province, images, cost, discount } = req.body;

            const service = await Services.findOneAndUpdate({ _id: req.params.id, cooperator: req.user.id }, {
                name, description, type, province, images, cost, discount
            }, { new: true })

            res.json({ success: true, message: "update Service successful", service })
        } catch (err) {
            console.log(err)
            res.status(500).json({ success: false, message: err.message })
        }
    }

    async deleteService(req, res) {
        try {
            await Services.findOneAndDelete({ _id: req.params.id, cooperator: req.user.id });


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
                .populate("cooperator")
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
                .populate("cooperator")
            res.json({ success: true, message: "get info all Service success", service });
        } catch (err) {
            console.log(err)
            res.status(500).json({ success: false, message: err.message })
        }
    }

    async getServiceByProvince(req, res) {
        try {
            const services = Services.find({ province: req.params.id })
                .populate("cooperator");
            res.json({ success: true, message: "", services })
        }
        catch (err) {
            res.status(500).json({ success: false, message: err.message })
        }
    }
}

module.exports = new ServiceController;