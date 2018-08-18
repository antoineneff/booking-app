const mongoose = require('mongoose')

const rooms = [
    {
        name: 'Salle #1',
        description: 'Salle #1',
        capacity: 5,
        equipments: ['TV', 'Retro Projecteur'],
    },
    {
        equipments: ['Retro Projecteur'],
        name: 'Salle #2',
        description: 'Salle #2',
        capacity: 10
    },
    {
        equipments: [],
        name: 'Salle Okjsdkso',
        description: 'Salle Okjsdkso',
        capacity: 11
    },
    {
        equipments: ['TV', 'Retro Projecteur'],
        name: 'Salle de ouf',
        description: 'Salle de ouf',
        capacity: 10
    },
    {
        equipments: ['TV', 'Retro Projecteur'],
        name: 'Salle nulle',
        description: 'Salle nulle',
        capacity: 26
    }
]

const seed = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/station', { useNewUrlParser: true })
        const Room = require('./models/room')

        // INSERTMANY
        await Room.insertMany(rooms)
        console.log('Les salles ont bien été ajoutées à la base de données !')
        process.exit(0)
    } catch (err) {
        console.error(err.message)
        process.exit(1)
    }
}

seed()
