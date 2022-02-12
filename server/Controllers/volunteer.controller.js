const Volunteers = require('../Models/volunteer.model')
const VolunteerDates = require('../Models/volunteerDate.model')
const VolunteerLocations = require('../Models/volunteerLocation.model')

class VolunteerController {
    async createVolunteer(req, res) {
        try {
            const { name, image, cost, description, date, location } = req.body

            const newVolunteer = new Volunteers({
                userId: req.user._id, name,image, description, cost, date: [], location: []
            })

            await newVolunteer.save()

            if (date.length > 0) {
                date.forEach(async function (element) {
                    const newVolunteerDate = new VolunteerDates({
                        activity: element.activity, accommodation: element.accommodation, date: element.date
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
                        users: [], timeStart:element.timeStart, maxUsers: element.maxUsers,description:element.description, activities: element.activities,
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
                newTour: {
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

    

    async getVolunteers(req, res) {
        try {
            const volunteers = await Volunteers.find({}).sort("-createdAt")
                .populate("userId", "username fullname avatar")
                .populate({
                    path: "comments",
                    populate: {
                        path: "userId likes",
                        select: "username fullname avatar"
                    }
                })

            res.json({ success: true, message: "get volunteers successful", tours })
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
                .populate("userId", "username email fullname avatar followers")
                .populate({
                    path: "comments",
                    populate: {
                        path: "userId likes",
                        select: "-password"
                    },
                })
                

            res.json({
                success: true, message: "get info 1 volunteer success", volunteer
            });


        } catch (err) {
            console.log(err)
            res.status(500).json({ success: false, message: err.message })
        }
    }


}

module.exports = new VolunteerController;