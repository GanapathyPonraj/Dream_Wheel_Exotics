const express = require('express')
const bookingRouter = express.Router()
const {  createBookingEntry, getAllBookings} = require('../controller/bookingController')
const requireAuth = require('../middleware/requireAuth')

bookingRouter.use(requireAuth)

//Get all Cars
bookingRouter.get('/', getAllBookings)

//Add Booking Details
bookingRouter.post('/',createBookingEntry)

module.exports = bookingRouter
