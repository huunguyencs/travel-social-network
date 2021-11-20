const Locations = require('../Models/location.model')

class LocationController {
    async createLocation(req, res) {
        try {
            const { name, images, province, position, information } = req.body

            const newLocation = new Locations({
                name, images, province, position, information
            })
            await newLocation.save()

            res.json({
                success: true,
                message: "Create Location successful",
                newLocation: {
                    ...newLocation._doc,
                }
            })
        } catch (err) {
            console.log(err)
            res.status(500).json({ success: false, message: err.message })
        }
    }

    async updateLocation(req, res) {
        try {
            const { name, images, province, position, information } = req.body

            const location = await Locations.findOneAndUpdate({ _id: req.params.id }, {
                name, images, province, position, information
            }, { new: true })

            res.json({ success: true, message: "update Location successful", location })
        } catch (err) {
            console.log(err)
            res.status(500).json({ success: false, message: err.message })
        }
    }

    async deleteLocation(req, res) {
        try {
            const location = await Locations.findOneAndDelete({ _id: req.params.id });
            if (location.posts != null) await Posts.deleteMany({ _id: { $in: location.posts } });

            res.json({
                success: true, message: "Delete Location success"
            });
        } catch (err) {
            console.log(err)
            res.status(500).json({ success: false, message: err.message })
        }
    }

    // lấy thông tin 1 Location theo params.id
    async getLocation(req, res) {
        try {
            const Location = await Locations.findById(req.params.id)
                .populate("posts province")
            res.json({
                success: true, message: "get info 1 Location success", Location
            });
        } catch (err) {
            console.log(err)
            res.status(500).json({ success: false, message: err.message })
        }
    }

    //Get all Location
    async getLocations(req, res) {
        try {
            const Location = await Locations.find()
                .populate("posts province")
            res.json({ success: true, message: "get info 1 Location success", Location });
        } catch (err) {
            console.log(err)
            res.status(500).json({ success: false, message: err.message })
        }
    }

}

module.exports = new LocationController;