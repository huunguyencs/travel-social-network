const Tours = require('../Models/tour.model')
const TourDates = require('../Models/tourDate.model')
const Comments = require('../Models/comment.model')

class TourController {
    async createTour(req, res) {
        try {
            const { content, name, taggedIds, image, hashtags, tour } = req.body

            // console.log(tourDate[0].locations);

            const newTour = new Tours({
                userId: req.user._id, content, image, name, taggedIds, hashtags
            })
            await newTour.save()
            if (tour.length > 0) {
                tour.forEach(async function (element) {
                    // console.log(element);
                    const newTourDate = new TourDates({
                        date: element.date, locations: element.locations
                    })
                    await newTourDate.save();

                    await Tours.findOneAndUpdate({ _id: newTour._id }, {
                        $push: {
                            tour: newTourDate._id
                        }
                    });
                });
            }
            res.json({
                success: true,
                message: "Create Tour successful",
                newTour: {
                    ...newTour._doc,
                    userId: {
                        fullname: req.user.fullname,
                        _id: req.user._id,
                        avatar: req.user.avatar
                    }
                }
            })
        } catch (err) {
            console.log(err)
            res.status(500).json({ success: false, message: err.message })
        }
    }
    ///
    async updateTour(req, res) {
        try {
            const { content, tourName, isPublic, taggedIds, image, hashtag, tourDate } = req.body

            const tour = await Tours.findOneAndUpdate({ _id: req.params.id }, {
                content, image, tourName, taggedIds, hashtag, isPublic, tourDate
            }, { new: true })

            res.json({ success: true, message: "update tour successful", tour })
        } catch (err) {
            console.log(err)
            res.status(500).json({ success: false, message: err.message })
        }
    }

    //A(user._id) like tour B(params.id)
    async likeTour(req, res) {
        try {
            var tour = await Tours.find({ _id: req.params.id, likes: req.user._id });
            if (tour.length > 0) {
                return res.status(400).json({ success: false, message: "You liked this tour." })
            }

            tour = await Tours.findOneAndUpdate({ _id: req.params.id }, {
                $push: {
                    likes: req.user._id
                }
            }, { new: true })
            res.json({
                success: true, message: "like tour success",
                likes: tour.likes
            });
        } catch (err) {
            console.log(err)
            res.status(500).json({ success: false, message: err.message })
        }
    }

    //A(user._id) unlike tour B(params.id)
    async unlikeTour(req, res) {
        try {
            const tour = await Tours.findOneAndUpdate({ _id: req.params.id }, {
                $pull: {
                    likes: req.user._id
                }
            }, { new: true })

            res.json({
                success: true, message: "unlike tour success",
                likes: tour.likes
            });
        } catch (err) {
            console.log(err)
            res.status(500).json({ success: false, message: err.message })
        }
    }

    async deleteTour(req, res) {
        try {
            const tour = await Tours.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
            if (tour.comments != null) await Comments.deleteMany({ _id: { $in: tour.comments } });

            res.json({
                success: true, message: "Delete tour success"
            });
        } catch (err) {
            console.log(err)
            res.status(500).json({ success: false, message: err.message })
        }
    }

    async getTours(req, res) {
        try {
            const tours = await Tours.find({}).sort("-createdAt")
                .populate("userId likes", "username email fullname avatar")
                .populate({
                    path: "comments",
                    populate: {
                        path: "userId likes",
                        select: "-password"
                    }
                })
            res.json({ success: true, message: "get tours successful", tours })
        }
        catch (err) {
            console.log(err);
            res.status(500).json({ success: false, message: err.message });
        }
    }

    //lấy tours của 1 user cụ thể (params.id)
    async getUserTour(req, res) {
        try {
            const tours = await Tours.find({ userId: req.params.id }).sort("-createdAt")

            res.json({ success: true, message: "get user tour successful", tours })
        } catch (err) {
            console.log(err)
            res.status(500).json({ success: false, message: err.message })
        }
    }

    // lấy thông tin 1 tour theo params.id
    async getTour(req, res) {
        try {
            const tour = await Tours.findById(req.params.id)
                .populate("tour")
                .populate({
                    path: "tour",
                    populate: {
                        path: "locations",
                        populate: {
                            path: "location",
                            select: "name images",
                            populate: {
                                path: "province",
                                select: "name"
                            }
                        }
                    }
                })
                .populate("userId likes", "username email fullname avatar followers")
                .populate({
                    path: "comments",
                    populate: {
                        path: "userId likes",
                        select: "-password"
                    },
                })
            res.json({
                success: true, message: "get info 1 tour success", tour
            });
        } catch (err) {
            console.log(err)
            res.status(500).json({ success: false, message: err.message })
        }
    }

}

module.exports = new TourController;