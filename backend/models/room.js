const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: String,
    description: String,
    capacity: Number,
    equipments: [String]
}, { timestamps: true })

const room = mongoose.model('Room', schema)

module.exports = room
