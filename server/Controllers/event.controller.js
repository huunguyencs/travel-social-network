const Events = require('../Models/event.model')

class EventController {
    async createEvent(req, res) {
        try {
            const { description, timedes, name, fullname, provinceId, images, time, calendarType } = req.body;
            var newEvent;
            if (provinceId) {
                newEvent = new Events({
                    description, timedes, name, fullname, provinceId, images, time, calendarType
                })
            }
            else {
                newEvent = new Events({
                    description, timedes, name, fullname, images, time, calendarType
                })
            }
            await newEvent.save();

            res.json({
                success: true,
                message: "Create event successful",
                event: {
                    ...newEvent._doc
                }
            })
        }
        catch (err) {
            res.status(500).json({ success: false, message: err.message })
        }


    }

    async getEvent(req, res) {
        try {
            const event = await Events.findOne({ name: req.params.name })
                .populate("provinceId", "name fullname")
            if (event) {
                res.json({
                    success: true,
                    message: "get info 1 event successful",
                    event
                })
            }
            else {
                res.status(404).json({
                    success: false,
                    message: "Không tìm thấy sự kiện"
                })
            }

        }
        catch (err) {
            res.status(500).json({
                success: false,
                message: err.message
            })
        }

    }

    async getEvents(req, res) {

    }
}

module.exports = new EventController;