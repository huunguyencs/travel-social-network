const Helps = require('../Models/help.model');
const { ip2position } = require('../utils/ip2position');


class HelpController {
    async createHelp(req, res) {
        try {
            let { description, position, type, positionStr, expireAt } = req.body;

            console.log(req.headers['x-forwarded-for']);

            if (!position) {
                const temp = ip2position(req.headers['x-forwarded-for'])
                position = [temp.longitude, temp.latitude]
            }

            if (!expireAt) {
                expireAt = new Date();
                expireAt.setDate(expireAt.getDate() + 2);
                expireAt = new Date(expireAt);
            }
            const help = new Helps({
                description, position, type, positionStr, expireAt
            });
            await help.save();
            res.success({
                success: true,
                help: {
                    ...help._doc
                }
            })
        }
        catch (err) {
            console.log(err);
            res.error(err);
        }
    }

    async getHelps(req, res) {
        try {
            let { lat, lng } = req.query;
            if (!lat || !lng) {
                if (!req.headers['x-forwarded-for']) {
                    return res.error({ message: 'Not found your position' });
                }
                let temp = ip2position(req.headers['x-forwarded-for']);
                lat = temp.latitude;
                lng = temp.longitude;
            }

            const helps = await Helps.find({
                position: {
                    $near: {
                        $geometry: {
                            type: "Point",
                            coordinates: [lng, lat]
                        },
                        $maxDistance: 5000,
                    }
                }
            }).populate("userId", "avatar fullname")

            res.success({
                success: true,
                helps
            })

        } catch (err) {
            console.log(err);
            res.error(err);
        }
    }

    async updateHelp(req, res) {
        try {
            const { id } = req.params;
            const help = await Helps.findOneAndUpdate({ _id: id, userId: req.user._id }, req.body);

            res.success({
                success: true,
                help
            })

        }
        catch (err) {
            res.error(err);
        }
    }

    async help(req, res) {
        try {
            const { id } = req.params;
            const help = await Helps.findByIdAndUpdate(id, {
                $inc: { state: 1 }
            }, { new: true })

            res.success({
                success: true,
                help
            })
        }
        catch (err) {
            res.error(err);
        }
    }

    async deleteHelp(req, res) {
        try {
            const { id } = req.params;
            await Helps.findByIdAndDelete(id);
            res.deleted({
                success: true
            })
        }
        catch (err) {
            res.error(err);
        }
    }
}

module.exports = new HelpController();