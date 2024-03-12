const bookingModel = require('../models/bookingModel');
const carModel = require('../models/carRentalModel');

//get all booking 
// {user:req.body}
const getAllBookings = async (req, res) => {
    const userId = req.user._id.toString();
    const allBookings = await bookingModel.find({ user: userId }).populate('car').populate('user').exec()
    res.status(200).json(allBookings)
}

//enter a booking
const createBookingEntry = async (req, res) => {
    try {
        req.body.user = req.user._id.toString()
        const bookingDetails = await bookingModel.create(req.body)
        await bookingDetails.save()
        const car = await carModel.findOne({ _id: req.body.car })
        car.bookedDates.push({ pickupDate: req.body.pickupDate, dropOffDate: req.body.dropOffDate })
        car.bookedTimes.push({ pickupTime: req.body.pickupTime, dropOffTime: req.body.dropOffTime })
        await car.save();
        res.status(200).json(bookingDetails)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    createBookingEntry,
    getAllBookings
}