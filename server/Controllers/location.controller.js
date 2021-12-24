const Locations = require('../Models/location.model')
const Posts = require('../Models/post.model');

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
            const location = await Locations.findById(req.params.id)
                .populate("province")
            res.json({
                success: true, message: "get info 1 Location success", location
            });
        } catch (err) {
            console.log(err)
            res.status(500).json({ success: false, message: err.message })
        }
    }

    async getPosts(req, res) {
        try {
            const posts = await Posts.find({ isPostReview: true, locationId: req.params.id })
                .populate("userId likes", "username fullname avatar")
                .populate({
                    path: "comments",
                    populate: {
                        path: "userId likes",
                        select: "username fullname avatar"
                    }
                })
                .populate("locationId", "name");
            res.json({ success: true, message: "successful", posts })
        }
        catch (err) {
            console.log(err)
            res.status(500).json({ success: false, message: err.message })
        }
    }

    //Get Location at a province
    async getLocations(req, res) {
        try {
            const locations = await Locations.find({ province: req.params.province })
                .populate("province", "fullname")
            res.json({ success: true, message: "get locations success", locations });
        } catch (err) {
            console.log(err)
            res.status(500).json({ success: false, message: err.message })
        }
    }

}

module.exports = new LocationController;