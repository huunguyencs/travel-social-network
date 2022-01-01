const Events = require('../Models/event.model')
const date = require('../utils/date');

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

    async getCurrentEvent(req, res) {
        try {
            var dateIntLunar = date.lunarToDateInt() % 355;
            var dateIntSolar = date.solarToDateInt() % 365;
            var gteLunar = (dateIntLunar + 351) % 355;
            var gteSolar = (dateIntSolar + 361) % 365;

            const events = await Events.find({
                $or: [
                    { calendarType: false, time: { $gte: gteLunar > 351 ? 0 : gteLunar, $lte: (dateIntLunar + 365) % 355, $ne: 0 } },
                    { calendarType: false, time: { $gte: gteLunar > 351 ? gteLunar : 365, $lte: 355, $ne: 0 } },
                    { calendarType: true, time: { $gte: gteSolar > 361 ? 0 : gteSolar, $lte: (dateIntSolar + 375) % 365, $ne: 0 } },
                    { calendarType: true, time: { $gte: gteSolar > 361 ? gteSolar : 366, $lte: 365, $ne: 0 } }
                ]
            }).sort('time')

            // console.log(events.length)

            res.json({
                success: true,
                message: 'Thành công',
                events
            })
        }
        catch (err) {
            res.status(500).json({
                success: false,
                message: err.message
            })
        }
    }
}

module.exports = new EventController;