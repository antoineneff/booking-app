const { Types } = require('mongoose')
const Room = require('./../../models/room')
const Booking = require('./../../models/booking')
const BookingService = require('./../../services/booking')
const { formatDate } = require('./../../utils/dates')
const { ValidationError, ForbiddenError } = require('./../../utils/errors')

async function validate(body) {
    // CHECK ROOM
    if (!body.room) throw new ValidationError('Un identifiant de salle est requis')
    if (!Types.ObjectId.isValid(body.room)) throw new ValidationError('L\'identifiant de la salle n\'est pas valide')
    const room = await Room.findById(body.room).select('_id capacity').exec()
    if (!room) throw new ValidationError('Aucune salle avec cet identifiant')
    if (room.capacity < body.attendees) throw new ValidationError('La salle n\'a pas une capacité suffisante pour le nombre de participants demandé')

    // REQUIRED DATE
    if (!body.start) throw new ValidationError('Une date de réservation est requise')

    // REQUIRED DURATION
    if (!body.duration) throw new ValidationError('Une durée est requise')

    // CHECK ATTENDEES
    if (!body.attendees) throw new ValidationError('Un nombre de participants est requis')
    if (!Number.isInteger(body.attendees) || body.attendees < 1) throw new ValidationError('Le nombre de participants doit être un nombre entier positif')

    return true
}

// BOOK A ROOM
const create = async (req, res, next) => {
    try {
        // VALIDATE DATA
        await validate(req.body)

        // CHECK IF A BOOKING EXISTS WIHTIN THE CHOSEN DATES
        const rooms = await BookingService.available([req.body.room], req.body.start, req.body.duration)
        if (!rooms.includes(req.body.room)) {
            throw new ForbiddenError('Impossible de réserver ce créneau')
        }

        const [start, end] = formatDate(req.body.start, req.body.duration)

        const newBooking = new Booking({
            room: req.body.room,
            attendees: req.body.attendees,
            start,
            end
        })
        await newBooking.save()

        return res.sendStatus(200)
    } catch (err) {
        return next(err)
    }
}

module.exports = create
