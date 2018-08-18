const Booking = require('./../../models/booking')

// LIST ALL BOOKINGS
const list = async (req, res, next) => {
    try {
        const bookings = await Booking.find({}).exec()

        return res.json({ bookings })
    } catch (err) {
        return next(err)
    }
}

module.exports = list
