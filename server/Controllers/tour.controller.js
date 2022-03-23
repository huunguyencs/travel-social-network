const Tours = require('../Models/tour.model')
const TourDates = require('../Models/tourDate.model')
const Comments = require('../Models/comment.model')

class TourController {
    async createTour(req, res) {
        try {
            const { content, name, taggedIds, image, hashtags, tour, services, cost, provinces, locations } = req.body;

            const joinIds = [req.user._id];

            const newTour = new Tours({
                userId: req.user._id, content, image, name, taggedIds, hashtags, services, cost, provinces, joinIds, tour: [], locations
            })

            await newTour.save()

            if (tour.length > 0) {
                tour.forEach(async function (element) {
                    const newTourDate = new TourDates({
                        date: element.date, locations: element.locations, description: element.description
                    })
                    await newTourDate.save();
                    await Tours.findOneAndUpdate({ _id: newTour._id }, {
                        $push: {
                            tour: newTourDate._id
                        }
                    });
                });
            }



            res.created({
                success: true,
                message: "Create Tour successful",
                newTour: {
                    ...newTour._doc,
                    userId: {
                        fullname: req.user.fullname,
                        _id: req.user._id,
                        avatar: req.user.avatar,
                        followers: req.user.followers
                    }
                }
            })
        } catch (err) {
            console.log(err)
            res.error(err);
        }
    }

    async shareTour(req, res) {
        try {
            const { content, hashtags, shareId } = req.body
            const newTour = new Tours({
                userId: req.user._id, content, hashtags, shareId
            })

            await newTour.save();

            const share = await Tours.findById(shareId).populate("userId", "username fullname avatar")


            res.created({
                success: true,
                message: 'Chia sẻ thành công!',
                newTour: {
                    ...newTour._doc,
                    userId: {
                        _id: req.user._id,
                        username: req.user.username,
                        fullname: req.user.fullname,
                        avatar: req.user.avatar
                    },
                    shareId: share
                }
            })
        }
        catch (err) {
            console.log(err);
            res.error(err);
        }
    }

    ///
    async updateTour(req, res) {
        try {
            const { content, name, isPublic, image, hashtags, services, tour, cost, provinces, locations } = req.body;

            const newTour = await Tours.findOneAndUpdate({ _id: req.params.id, userId: req.user._id }, {
                content, image, name, hashtags, isPublic, services, cost, provinces, locations
            }, { new: true }).populate("userId joinIds likes", "username fullname avatar")
                .populate("tour", "date")
                .populate({
                    path: "comments",
                    populate: {
                        path: "userId likes",
                        select: "username fullname avatar"
                    }
                })
                .populate({
                    path: "shareId",
                    populate: {
                        path: "userId",
                        select: "username fullname avatar"
                    }
                })
                .populate({
                    path: "shareId",
                    populate: {
                        path: "tour",
                        select: "date"
                    }
                })



            if (newTour) {
                const oldTour = newTour.tour.map(item => item._id);
                let tourId = []
                tour.forEach((item) => {
                    if (item._id) tourId.push(item._id.toString())
                })
                oldTour.forEach(async function (element) {
                    if (!tourId.includes(element.toString())) {
                        await Tours.findByIdAndUpdate(req.params.id, {
                            $pull: {
                                tour: element._id
                            }
                        })
                    }
                })
                tour.forEach(async function (element) {
                    if (element._id)
                        await TourDates.findByIdAndUpdate(element._id, { date: element.date, locations: element.locations, description: element.description }, { new: true })
                    else {
                        let newTourDate = new TourDates({
                            date: element.date, locations: element.locations
                        })
                        await newTourDate.save();
                        await Tours.findByIdAndUpdate(req.params.id, {
                            $push: {
                                tour: newTourDate._id
                            }
                        });
                    }
                })

                res.success({ success: true, message: "update tour successful", newTour })
            }
            else {
                res.notFound("Không tìm thấy tour")
            }

        } catch (err) {
            console.log(err)
            res.error(err);
        }
    }

    //A(user._id) like tour B(params.id)
    async likeTour(req, res) {
        try {
            var tour = await Tours.findOne({ _id: req.params.id, likes: req.user._id });
            if (tour) {
                return res.status(400).json({ success: false, message: "You liked this tour." })
            }

            tour = await Tours.findByIdAndUpdate(req.params.id, {
                $push: {
                    likes: req.user._id
                }
            }, { new: true }).populate("likes", "username fullname avatar")
            res.success({
                success: true, message: "like tour success",
                likes: tour.likes,
                tour
            });
        } catch (err) {
            console.log(err)
            res.error(err);
        }
    }

    //A(user._id) unlike tour B(params.id)
    async unlikeTour(req, res) {
        try {
            const tour = await Tours.findByIdAndUpdate(req.params.id, {
                $pull: {
                    likes: req.user._id
                }
            }, { new: true }).populate("likes", "username fullname avatar")

            res.success({
                success: true, message: "unlike tour success",
                likes: tour.likes
            });
        } catch (err) {
            console.log(err)
            res.error(err);
        }
    }

    async deleteTour(req, res) {
        try {
            const tour = await Tours.findById(req.params.id);
            if (tour) {
                await Tours.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
                if (tour.comments) await Comments.deleteMany({ _id: { $in: tour.comments } });
                if (tour.tour) await TourDates.deleteMany({ _id: { $in: tour.tour } });
                res.deleted("Xóa tour thành công");
            }
            else {
                res.notFound("Không tìm thấy tour");
            }


        } catch (err) {
            console.log(err)
            res.error(err);
        }
    }

    async getTours(req, res) {
        try {
            var { offset, maxCost, minCost, q } = req.query;
            offset = offset ? parseInt(offset) : 0;
            maxCost = maxCost ? parseInt(maxCost) : null;
            minCost = minCost ? parseInt(minCost) : null;
            var query = {}
            var sort = "-createdAt"
            var score = {}

            if (maxCost && maxCost !== 1000) {
                query = {
                    cost: {
                        $lte: maxCost
                    }
                }
            }
            if (minCost && minCost !== 0) {
                query = {
                    ...query,
                    cost: {
                        ...query.cost,
                        $gte: minCost
                    }
                }
            }
            if (q && q !== '') {
                query = {
                    ...query,
                    $text: {
                        $search: q
                    }
                }
                sort = { score: { $meta: "textScore" } }
                score = sort
            }


            // Tours.createIndexes()
            // Tours.createIndexes({'$**': 'text'});

            const tours = await Tours.find(query, score).sort(sort).skip(offset * 5).limit(5)
                .populate("userId joinIds likes", "username fullname avatar")
                .populate("tour", "date")
                .populate({
                    path: "comments",
                    populate: {
                        path: "userId likes",
                        select: "username fullname avatar"
                    }
                })
                .populate({
                    path: "shareId",
                    populate: {
                        path: "userId",
                        select: "username fullname avatar"
                    }
                })
                .populate({
                    path: "shareId",
                    populate: {
                        path: "tour",
                        select: "date"
                    }
                })

            res.success({ success: true, message: "get tours successful", tours })
        }
        catch (err) {
            console.log(err);
            res.error(err);;
        }
    }

    //lấy tours của 1 user cụ thể (params.id)
    async getUserTour(req, res) {
        try {
            var { offset } = req.query;
            offset = offset || 0;
            const tours = await Tours.find({ userId: req.params.id }).sort("-createdAt").skip(offset * 5).limit(5)
                .populate("userId joinIds likes", "username fullname avatar")
                .populate("tour", "date")
                .populate({
                    path: "comments",
                    populate: {
                        path: "userId likes",
                        select: "username fullname avatar"
                    }
                })
                .populate({
                    path: "shareId",
                    populate: {
                        path: "userId",
                        select: "username fullname avatar"
                    }
                })

            res.success({ success: true, message: "get user tour successful", tours })
        } catch (err) {
            console.log(err)
            res.error(err);
        }
    }

    // lấy thông tin 1 tour theo params.id
    async getTour(req, res) {
        try {
            // console.log(req.params.id)
            let tour = await Tours.findById(req.params.id);
            let requestId;
            if (!tour) {
                res.status(404).json({ success: false, message: "not found" });
                return;
            }
            if (tour.shareId) {
                requestId = tour.shareId;
            }
            else
                requestId = tour._id;

            tour = await Tours.findById(requestId)
                .populate("tour")
                .populate({
                    path: "tour",
                    populate: {
                        path: "locations",
                        populate: {
                            path: "location",
                            select: "name images fullname position",
                            populate: {
                                path: "province",
                                select: "name fullname"
                            }
                        }
                    }
                })
                .populate("userId likes", "fullname avatar")
                .populate({
                    path: "comments",
                    populate: {
                        path: "userId likes",
                        select: "fullname avatar"
                    },
                })
                .populate({
                    path: "services",
                    populate: {
                        path: "service",
                        select: "name images cooperator"
                    }
                })

            res.success({
                success: true, message: "get info 1 tour success", tour
            });


        } catch (err) {
            console.log(err)
            res.error(err);
        }
    }

    async joinTour(req, res) {
        try {
            var tour = await Tours.find({ _id: req.params.id, joinIds: req.user._id });
            if (tour.length > 0) {
                return res.status(400).json({ success: false, message: "You joined this tour." })
            }

            tour = await Tours.findByIdAndUpdate(req.params.id, {
                $push: {
                    joinIds: req.user._id
                }
            }, { new: true }).populate("joinIds", "avatar fullname username")
            res.success({
                success: true, message: "join tour success",
                joinIds: tour.joinIds
            });
        } catch (err) {
            res.error(err);
        }
    }

    async unJoinTour(req, res) {
        try {
            const tour = await Tours.findByIdAndUpdate(req.params.id, {
                $pull: {
                    joinIds: req.user._id
                }
            }, { new: true }).populate("joinIds", "avatar fullname username")

            res.success({
                success: true, message: "unjoin tour success",
                joinIds: tour.joinIds
            });
        } catch (err) {
            res.error(err);
        }
    }

    async removeJoin(req, res) {
        try {
            let tour = await Tours.findById(req.params.id);
            if (tour.userId.toString() !== req.user._id.toString()) {
                res.status(500).json({ success: false, message: "Không được quyền" })
                return;
            }
            const { user } = req.body;
            tour = await Tours.findByIdAndUpdate(req.params.id, {
                $pull: {
                    joinIds: user
                }
            }, { new: true }).populate("joinIds", "avatar fullname username")

            res.success({
                success: true, message: "remove user success",
                joinIds: tour.joinIds
            });

        }
        catch (err) {
            res.error(err);
        }
    }

    async removeReview(req, res) {
        try {
            const { locationId } = req.body;
            const { reviewId } = req.query;

            await TourDates.findOneAndUpdate({ _id: req.params.id, locations: { $elemMatch: { _id: locationId } } }, {
                $pull: {
                    'locations.$.postId': []
                }
            }, { new: true, safe: true, upsert: true })

            res.success({
                success: true,
                message: "Xóa review thành công"
            })
        }
        catch (err) {
            console.log(err);
            res.error(err);
        }
    }

    async search(req, res) {
        try {
            var { q, offset } = req.query;
            offset = offset || 0;
            var tours = await Tours.find({ $text: { $search: q } }, { score: { $meta: "textScore" } })
                .sort({ score: { $meta: "textScore" } })
                .skip(offset * 10)
                .limit(10)
                .populate("userId", "avatar fullname");
            tours = tours.map((item) => ({
                _id: item._id,
                fullname: `Hành trình của ${item.userId.fullname}`,
                link: `/tour/${item._id}`,
                description: item.name,
                image: item.userId.avatar
            }))
            res.success({ success: true, results: tours, query: q })
        } catch (err) {
            res.error(err);
        }
    }

}

module.exports = new TourController;