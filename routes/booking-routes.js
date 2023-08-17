const express = require('express')
const { newBooking, getBookingById, deleteBooking } = require('../controllers/booking-controller')

const bookingsRouter = express.Router()


bookingsRouter.post('/',newBooking);

bookingsRouter.get('/:id',getBookingById)

bookingsRouter.delete('/:id',deleteBooking)



module.exports = bookingsRouter