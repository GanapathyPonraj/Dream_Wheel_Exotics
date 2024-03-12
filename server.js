const express = require('express')
require('dotenv').config()
const carRentalRoutes = require('./routes/carRental')
const bookingRoutes = require('./routes/bookingRoute')
const usersRoutes = require('./routes/userRoute')
const logInRoutes = require('./routes/loginRoute')

const mongoose = require('mongoose')

//express app
const app = express()

app.use(express.json())
//route
app.use('/api/carRental', carRentalRoutes)

//create a route for Booking
app.use('/api/booking', bookingRoutes)

//create a route for Users
app.use('/api/user', usersRoutes)

//Login/Signup 
app.use('/api/register',logInRoutes)

//connect to db

mongoose.connect(process.env.MONG_URI)
    .then(() => {
        //listen for request
        app.listen(process.env.PORT, () => {
            console.log('listening 4000');
        })
    })
    .catch((error) => {
        console.log(error);
    })

//middleware
app.use((req, res, next) => {
    next()
})