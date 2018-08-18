const Room = require('./../../models/room')

// GET A ROOM
const get = async (req, res, next) => {
    try {
        const id = req.params.roomId
        const room = await Room.findById(id).exec()

        return res.json({ room })
    } catch (err) {
        return next(err)
    }
}

module.exports = get
