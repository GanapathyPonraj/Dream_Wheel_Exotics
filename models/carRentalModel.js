const mongoose = require('mongoose')

const Schema = mongoose.Schema

const carRentalSchema = new Schema({
    carId: {type: Number,required: true,},
    brand: {type: String},
    carName: {type: String},
    seats: {type: String},
    favouriteCount: {type: Number},
    transmission: {type: String},
    doors: {type: Number},
    carType: {type: String},
    dailyRate: {type: Number},
    carImage: {type: String},
    fav: {type: Boolean},
    description:{type:String},
    bookedDates:[],
    bookedTimes:[]
}, { timestamps: true })

const carModel = mongoose.model('car', carRentalSchema)
module.exports = carModel