const Booking = require('./../../models/booking')
const { ValidationError } = require('./../../utils/errors')
const { isValidDate, formatDate } = require('./../../utils/dates')

const available = async (rooms = [], date, duration = 30) => {
    if (rooms.length === 0) {
        return []
    }

    if (!isValidDate(date)) throw new ValidationError('La date de réservation choisie n\'est pas valide')
    if (duration % 30 !== 0) throw new ValidationError('La durée doit être un multiple de 30 minutes')

    const [start, end] = formatDate(date, duration)

    const filter = {
        room: { $in: rooms },
        $and: [
            { start: { $lt: end }},
            { end: { $gt: start }}
        ]
    }
    const bookings = await Booking.find(filter).select('_id room').exec()
    if (!bookings || bookings.length === 0) {
        return rooms
    }

    const busyRooms = bookings.map(booking => String(booking.room))
    return rooms.filter(room => !busyRooms.includes(room))
}

module.exports = available
