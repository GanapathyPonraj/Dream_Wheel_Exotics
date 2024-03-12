const { logInUser,SignUpUser} = require('../controller/userController')

const express = require('express')
const logInRouter = express.Router()

//Login Route
logInRouter.post('/logIn',logInUser)

//SignUp Router
logInRouter.post('/signUp',SignUpUser)

module.exports = logInRouter
