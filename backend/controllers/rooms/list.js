const Room = require('./../../models/room')
const BookingService = require('./../../services/booking')

const allowedEquipments = ['TV', 'Retro Projecteur']

// LIST ALL ROOMS AND FILTER THEM WITH QUERY PARAMS
const list = async (req, res, next) => {
    try {
        const capacity = Number(req.query.attendees)
        let equipments = req.query.equipments
        const start = req.query.start
        const duration = Number(req.query.duration) || 30

        const filter = {}

        if (capacity && !isNaN(capacity)) {
            filter.capacity = { $gte: capacity }
        }
        if (equipments && typeof equipments === 'string') {
            equipments = equipments.split(',')
            equipments = equipments.filter(equipment => allowedEquipments.includes(equipment))
            if (equipments.length > 0) {
                filter.equipments = { $all: equipments }
            }
        }
        let rooms = await Room.find(filter).exec()
        if (start) {
            const availableRooms = await BookingService.available(rooms.map(r => String(r._id)), start, duration)
            rooms = rooms.filter(room => availableRooms.includes(String(room._id)))
        }

        return res.json({ rooms })
    } catch (err) {
        return next(err)
    }
}

module.exports = list
