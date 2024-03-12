const express = require('express')
const userRouter = express.Router()
const {  createUsersEntry, getUsers, addFavCarToUser, removeFavCarFromUser,logInUser,SignUpUser,profilePicToUser} = require('../controller/userController')
const requireAuth = require('../middleware/requireAuth')


//require auth for all user functions
userRouter.use(requireAuth)

//Get all Cars
userRouter.get('/', getUsers)

//Add Booking Details
userRouter.post('/', createUsersEntry)

//addFavourite Cars
userRouter.post('/fav',addFavCarToUser)

//removeFavourite Cars
userRouter.post('/removefav',removeFavCarFromUser)

//add Profile Pic to User
userRouter.post('/pic',profilePicToUser)



module.exports = userRouter
