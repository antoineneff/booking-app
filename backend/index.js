const mongoose = require('mongoose')
const express = require('express')
const helmet = require('helmet')
const compression = require('compression')
const routes = require('./routes')

async function init() {
    try {
        await mongoose.connect('mongodb://localhost:27017/station', { useNewUrlParser: true })
        const app = express()
        const router = express.Router()

        app.use(helmet())
        app.use(compression())
        app.use(express.json())
        app.use(express.urlencoded({ extended: true }))

        // ALLOW REQUEST FROM FRONTEND
        app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*")
            res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS')
            res.header('Access-Control-Allow-Headers', 'Authorization, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Cache-Control')
            next()
        })
        app.options('*', (req, res, next) => {
            res.sendStatus(200)
        })

        app.use('/api', routes(router))
        app.listen(3000, () => console.log('Api listening on port 3000'))
    } catch (err) {
        console.error(err.message)
        process.exit(1)
    }
}

init()
