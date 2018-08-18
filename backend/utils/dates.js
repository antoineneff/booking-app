const isValid = require('date-fns/is_valid')
const isPast = require('date-fns/is_past')
const getMinutes = require('date-fns/get_minutes')
const addMinutes = require('date-fns/add_minutes')
const startOfMinute = require('date-fns/start_of_minute')

const isValidDate = (date) => {
    date = new Date(date)
    if (!isValid(date) || isPast(date) || getMinutes(date) % 30 !== 0) {
        return false
    }
    return true
}

const formatDate = (date, duration) => {
    const start = startOfMinute(new Date(date))
    const end = addMinutes(start, duration)
    return [start, end]
}

module.exports = { isValidDate, formatDate }
