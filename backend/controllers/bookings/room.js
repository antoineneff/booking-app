const Room = require('./../../models/room')
const Booking = require('./../../models/booking')

// LIST BOOKINGS FROM A ROOM
const room = async (req, res) => {
    try {
        const roomExists = await Room.findById(req.params.roomId).select('_id').exec()
        if (!roomExists) {
            return res.status(400).json({ error: 'Aucune salle n\'existe avec cet identifiant' })
        }

        const bookings = await Booking.find({ room: req.params.roomId }).exec()

        return res.json({ bookings })
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

module.exports = room
