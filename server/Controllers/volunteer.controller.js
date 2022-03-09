const Volunteers = require('../Models/volunteer.model')
const VolunteerDates = require('../Models/volunteerDate.model')
const VolunteerLocations = require('../Models/volunteerLocation.model')
const Comments = require('../Models/comment.model')
class VolunteerController {
    async createVolunteer(req, res) {
        try {
            const { name, image, cost, descriptions, date, location } = req.body

            const newVolunteer = new Volunteers({
                userId: req.user._id, name,image, descriptions, cost, date: [], location: []
            })

            await newVolunteer.save()

            if (date.length > 0) {
                date.forEach(async function (element) {
                    const newVolunteerDate = new VolunteerDates({
                        activities: element.activities, accommodation: element.accommodation, date: element.date
                    })
                    await newVolunteerDate.save();
                    await Volunteers.findOneAndUpdate({ _id: newVolunteer._id }, {
                        $push: {
                            date: newVolunteerDate._id
                        }
                    });
                });
            }

            if (location.length > 0) {
                location.forEach(async function (element) {
                    const newVolunteerLocation = new VolunteerLocations({
                        users: [], timeStart:element.timeStart, maxUsers: element.maxUsers,description:element.description, 
                        activities: element.activities,
                        ageUser: element.ageUser, images: element.images, location:element.location
                    })
                    await newVolunteerLocation.save();
                    await Volunteers.findOneAndUpdate({ _id: newVolunteer._id }, {
                        $push: {
                            location: newVolunteerLocation._id
                        }
                    });
                });
            }
            res.json({
                success: true,
                message: "Create Volunteer successful",
                newVolunteer: {
                    ...newVolunteer._doc,
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
            res.status(500).json({ success: false, message: err.message })
        }
    }

    async updateVolunteer(req, res) {
        try {
            const { name, image, cost, descriptions, date, location } = req.body;

            const newVolunteer = await Volunteers.findOneAndUpdate({ _id: req.params.id, userId: req.user._id }, {
                name, image, cost, descriptions
            }, { new: true })
            .populate("userId", "username fullname avatar")
            .populate("date", "accommodation date activities")
            .populate({
                path: "location",
                populate: {
                    path: "location",
                    select: "fullname position"
                }
            })

            if (newVolunteer) {
                // console.log("date",date[1].activities);
                // console.log("location", location)
                const oldVolunteerDate = newVolunteer.date.map(item => item._id);
                const oldVolunteerLocation = newVolunteer.location.map(item => item._id);
                // console.log("oldVolunteerDate",oldVolunteerDate);
                // console.log("oldVolunteerLocation",oldVolunteerLocation);

                let dateId = []
                date.forEach((item) => {
                    if (item._id) dateId.push(item._id.toString())
                })
                oldVolunteerDate.forEach(async function (element) {
                    if (!dateId.includes(element.toString())) {
                        await Volunteers.findByIdAndUpdate(req.params.id, {
                            $pull: {
                                date: element._id
                            }
                        });
                        await VolunteerDates.findOneAndDelete({ _id: element._id});
                    }
                })
                date.forEach(async function (element) {
                    if (element._id)
                        await VolunteerDates.findByIdAndUpdate(element._id, { 
                            activities: element.activities, accommodation: element.accommodation, date: element.date
                        }, { new: true })
                    else {
                        let newVolunteerDate = new VolunteerDates({
                            activities: element.activities, accommodation: element.accommodation, date: element.date
                        })
                        await newVolunteerDate.save();
                        await Volunteers.findByIdAndUpdate(req.params.id, {
                            $push: {
                                date: newVolunteerDate._id
                            }
                        });
                    }
                })

                let locationId = []
                location.forEach((item) => {
                    if (item._id) locationId.push(item._id.toString())
                })
                oldVolunteerLocation.forEach(async function (element) {
                    if (!locationId.includes(element.toString())) {
                        await Volunteers.findByIdAndUpdate(req.params.id, {
                            $pull: {
                                location : element._id
                            }
                        });
                        await VolunteerLocations.findOneAndDelete({ _id: element._id});
                    }
                })
                location.forEach(async function (element) {
                    if (element._id)
                        await VolunteerLocations.findByIdAndUpdate(element._id, { 
                            users: [], timeStart:element.timeStart, maxUsers: element.maxUsers,description:element.description, 
                            activities: element.activities,
                            ageUser: element.ageUser, images: element.images, location:element.location                        
                        }, { new: true })
                    else {
                        let newVolunteerLocation = new VolunteerLocations({
                            users: [], timeStart:element.timeStart, maxUsers: element.maxUsers,description:element.description, 
                            activities: element.activities,
                            ageUser: element.ageUser, images: element.images, location:element.location                        
                        })
                        await newVolunteerLocation.save();
                        await Volunteers.findByIdAndUpdate(req.params.id, {
                            $push: {
                                location: newVolunteerLocation._id
                            }
                        });
                    }
                })

                res.json({ success: true, message: "update tour successful", newVolunteer })
            }
            else {
                res.status(404).json({ success: false, message: "Không tìm thấy tour" })
            }

        } catch (err) {
            console.log(err)
            res.status(500).json({ success: false, message: err.message })
        }
    }
    

    async getVolunteers(req, res) {
        try {
            const volunteers = await Volunteers.find({}).sort("-createdAt")
                .populate("userId", "username fullname avatar")
                .populate("date", "accommodation date activities")
                .populate({
                    path: "location",
                    populate: {
                        path: "location",
                        select: "fullname position"
                    }
                })

            res.json({ success: true, message: "get volunteers successful", volunteers })
        }
        catch (err) {
            console.log(err);
            res.status(500).json({ success: false, message: err.message });
        }
    }

    

    // lấy thông tin 1 volunteer theo params.id
    async getVolunteer(req, res) {
        try {
            // console.log(req.params.id)
            let volunteer = await Volunteers.findById(req.params.id);
            
            if (!volunteer) {
                res.status(404).json({ success: false, message: "not found" });
                return;
            }

            volunteer = await Volunteers.findById(req.params.id)
                .populate("userId", "username fullname avatar")
                .populate("date", "accommodation date activities")
                .populate({
                    path: "location",
                    populate: {
                        path: "location",
                        select: "fullname position"
                    }
                })
                

            res.json({
                success: true, message: "get info 1 volunteer success", volunteer
            });


        } catch (err) {
            console.log(err)
            res.status(500).json({ success: false, message: err.message })
        }
    }

    async deleteVolunteer(req, res) {
        try {
            const volunteer = await Volunteers.findById(req.params.id);
            if (volunteer) {
                await Volunteers.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
                if (volunteer.comments) await Comments.deleteMany({ _id: { $in: volunteer.comments } });
                if (volunteer.date) await VolunteerDates.deleteMany({ _id: { $in: volunteer.date } });
                if (volunteer.location) await VolunteerLocations.deleteMany({ _id: { $in: volunteer.location } });
            }
            else {
                res.status(404).json({ success: false, message: "Không tìm thấy Volunteer" })
            }

            res.json({
                success: true, message: "Delete volunteer success"
            });
        } catch (err) {
            console.log(err)
            res.status(500).json({ success: false, message: err.message })
        }
    }

    async joinVolunteerAll(req, res) {
        try {
            var volunteer = await Volunteers.find({ _id: req.params.id});
            volunteer = await Volunteers.findOneAndUpdate({ _id: req.params.id }, {
                $push: {
                    users: req.user._id
                }
            }, { new: true }).populate("joinIds", "avatar fullname username")
            res.json({
                success: true, message: "join volunteer success",
                joinIds: volunteer.joinIds
            });
        } catch (err) {
            res.status(500).json({ success: false, message: err.message })
        }
    }


}

module.exports = new VolunteerController;