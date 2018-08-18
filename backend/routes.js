const rooms = require('./controllers/rooms')
const bookings = require('./controllers/bookings')
const { ValidationError, ForbiddenError } = require('./utils/errors')

const routes = (router) => {
    router.get('/rooms', rooms.list)
    router.get('/rooms/:roomId', rooms.get)
    router.post('/bookings', bookings.create)
    router.get('/bookings', bookings.list)
    router.get('/bookings/rooms/:roomId', bookings.room)

    // MIDDLEWARE TO HANDLE ERRORS
    router.use((err, req, res, next) => {
        if (err instanceof ValidationError) {
            return res.status(400).json({ error: err.message })
        } else if (err instanceof ForbiddenError) {
            return res.status(403).json({ error: err.message })
        }
        return res.status(500).json({ error: err.message })
    })

    // MIDDLEWARE TO HANDLE NOT FOUND ROUTES
    router.use((req, res) => res.status(404).send('404 NOT FOUND'))

    return router
}

module.exports = routes
