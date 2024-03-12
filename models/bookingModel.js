const mongoose = require('mongoose')

const Schema = mongoose.Schema

const bookingSchema = new Schema({ 
        location:{type:String},
        pickupDate:{type:String},
        dropOffDate:{type:String},
        pickupTime:{type:String},
        dropOffTime:{type:String},
        car:{type: mongoose.Schema.Types.ObjectID, ref: 'car'},
        user:{type: mongoose.Schema.Types.ObjectID,ref:'user'},
        costPerDay:{type:Number},
        costForTotalDays:{type:Number},
        taxes:{type:Number},
        paymentTotal:{type:Number},
        bookingId:{type:String},
        status:{type:String}
}, { timestamps: true })


const bookingModel = mongoose.model('booking', bookingSchema)
module.exports = bookingModel