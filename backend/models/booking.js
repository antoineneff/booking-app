const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },
    start: Date,
    end: Date,
    attendees: Number
}, { timestamps: true })

const model = mongoose.model('Booking', schema)

module.exports = model
