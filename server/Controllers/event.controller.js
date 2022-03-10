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

    async updateEvent(req, res) {
        try {
            const { description, timedes, name, fullname, provinceId, images, time, calendarType } = req.body;
            const event = await Events.findOneAndUpdate({ _id: req.params.id }, {
                description, timedes, name, fullname, provinceId, images, time, calendarType
            }, { new: true })
                .populate("provinceId", "name fullname image");

            res.json({
                success: true,
                message: "get info 1 event successful",
                event
            })
        } catch (err) {
            res.status(500).json({
                success: false,
                message: err.message
            })
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

            const events1 = await Events.find({
                $or: [
                    { calendarType: false, time: { $gte: gteLunar > 348 ? gteLunar : 365, $lte: 355, $ne: 0 } },
                    { calendarType: true, time: { $gte: gteSolar > 358 ? gteSolar : 366, $lte: 365, $ne: 0 } }
                ]
            }, "timedes name fullname images provinceId").populate("provinceId", "fullname").sort('time')


            const events2 = await Events.find({
                $or: [
                    { calendarType: false, time: { $gte: gteLunar > 348 ? 0 : gteLunar, $lte: (dateIntLunar + 10) % 355, $ne: 0 } },
                    { calendarType: true, time: { $gte: gteSolar > 358 ? 0 : gteSolar, $lte: (dateIntSolar + 10) % 365, $ne: 0 } },
                ]
            }, "timedes name fullname images provinceId").populate("provinceId", "fullname").sort('time')

            // console.log(events.length)

            const events = [
                ...events1,
                ...events2,
            ]

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
    async getAll(req, res) {
        try {
            const events = await Events.find({}).select("name fullname time provinceId calendarType")
                .populate("provinceId", "fullname")
            res.json({
                success: true,
                message: "Lấy tất cả các sự kiện thành công",
                events
            })
        } catch (err) {
            res.status(500).json({
                success: false,
                message: err.message
            })
        }
    }

    async search(req, res) {
        try {
            var { q, offset } = req.query;
            offset = offset || 0;
            var events = await Events.find({ $text: { $search: q } }, { score: { $meta: "textScore" } })
                .sort({ score: { $meta: "textScore" } })
                .skip(offset * 10)
                .limit(10);
            events = events.map((item) => ({
                _id: item._id,
                fullname: item.fullname,
                link: `/event/${item.name}`,
                description: 'Thời gian: ' + item.timedes,
                image: item.images[0]
            }))
            res.json({ success: true, results: events, query: q })
        } catch (error) {

        }
    }
}

module.exports = new EventController;