const Users = require("../Models/user.model")
const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {
    try {
        const authHeader = req.header("Authorization")
        const token = authHeader && authHeader.split(' ')[1]

        if (!token) return res.status(401).json({ success: false, message: "Access Token not found." })

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        if (!decoded) return res.status(401).json({ success: false, message: "Invalid Authentication." })

        const user = await Users.findOne({ _id: decoded.id })

        req.user = user
        next()
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message })
    }
}

module.exports = auth;