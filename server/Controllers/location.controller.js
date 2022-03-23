const Locations = require('../Models/location.model')
const Posts = require('../Models/post.model');

class LocationController {
    async createLocation(req, res) {
        try {
            const { name, images, province, position, information, fullname } = req.body
            const newLocation = new Locations({
                name, images, province, position, information, fullname
            })
            await newLocation.save()

            res.created({
                success: true,
                message: "Create Location successful",
                newLocation: {
                    ...newLocation._doc,
                }
            })
        } catch (err) {
            res.error(err)
        }
    }

    async updateLocation(req, res) {
        try {
            const { name, images, province, position, information } = req.body

            const location = await Locations.findByIdAndUpdate(req.params.id, {
                name, images, province, position, information
            }, { new: true })
                .populate("province", "name fullname");

            res.success({ success: true, message: "update Location successful", location })
        } catch (err) {
            res.error(err)
        }
    }

    async deleteLocation(req, res) {
        try {
            const location = await Locations.findByIdAndDelete(req.params.id);
            if (location.posts != null) await Posts.deleteMany({ _id: { $in: location.posts } });

            res.success({
                success: true, message: "Delete Location success"
            });
        } catch (err) {
            res.error(err);
        }
    }

    // lấy thông tin 1 Location theo name
    async getLocation(req, res) {
        try {
            const location = await Locations.findOne({ name: req.params.name })
                .populate("province", "name fullname image");
            if (location) {
                res.success({
                    success: true, message: "get info 1 Location success", location
                });
            }
            else {
                res.notFound("Không tìm thấy địa điểm!");
            }

        } catch (err) {
            res.error(err);
        }
    }

    async getPosts(req, res) {
        try {
            const { offset } = req.query;
            const posts = await Posts.find({ isPostReview: true, locationId: req.params.id })
                .sort({ createdAt: -1 })
                .limit(5)
                .skip(offset)
                .populate("userId likes", "username fullname avatar")
                .populate({
                    path: "comments",
                    populate: {
                        path: "userId likes",
                        select: "username fullname avatar"
                    }
                })
                .populate("locationId", "name fullname");
            res.success({ success: true, message: "successful", posts })
        }
        catch (err) {
            res.error(err);
        }
    }

    //Get Location at a province
    async getLocations(req, res) {
        try {
            const locations = await Locations.find({ province: req.params.province }, "images fullname name position")
                .populate("province", "fullname name")
            res.success({ success: true, message: "get locations success", locations });
        } catch (err) {
            res.error(err);
        }
    }

    async getHotLocations(req, res) {
        try {
            const locations = await Locations.find({}).limit(5);
            res.success({
                success: true,
                message: 'success',
                locations
            })
        }
        catch (err) {
            res.error(err);
        }
    }

    async getAll(req, res) {
        try {
            const locations = await Locations.find({}).select("fullname name province position images")
                .populate("province", "fullname name")
            res.success({
                success: true,
                message: "Lấy tất cả địa điểm thành công",
                locations
            })
        } catch (err) {
            res.error(err);
        }
    }

    async getAllLocations(req, res) {
        try {
            const locations = await Locations.find({}).select("fullname name province star")
                .populate("province", "fullname")
            res.success({
                success: true,
                message: "Lấy tất cả địa điểm thành công",
                locations
            })
        } catch (err) {
            res.error(err);
        }
    }

    async search(req, res) {
        try {
            var { q, offset } = req.query;
            offset = offset || 0;
            var locations = await Locations.find({ $text: { $search: q } }, { score: { $meta: "textScore" } })
                .sort({ score: { $meta: "textScore" } })
                .limit(20)
                .skip(offset * 20)

            locations = locations.map((item) => ({
                _id: item._id,
                fullname: item.fullname,
                link: `/location/${item.name}`,
                description: item.information,
                image: item.images[0],
                score: item._doc.score
            }))

            res.success({ success: true, results: locations, query: q });
        }
        catch (err) {
            res.error(err);
        }
    }

}

module.exports = new LocationController;