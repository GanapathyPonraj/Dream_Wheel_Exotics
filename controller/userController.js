const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({ _id: _id }, process.env.SECRET, { expiresIn: '3d' })
}

//Log In a User
const logInUser = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await userModel.login(email, password)
        // create a token
        const token = createToken(user._id)
        res.status(200).json({ email, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    } 
}

//SignUp a User
const SignUpUser = async (req, res) => {
    const { email, password, name, contactNumber } = req.body
    try {
        const user = await userModel.signup(email, password, name, contactNumber)
        //createToken
        const token = createToken(user._id)
        res.status(200).json({ email, token, name, contactNumber })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

//get all booking 
const getUsers = async (req, res) => {
    const userId = req.user._id.toString();
    const allUsers = await userModel.find({ _id: userId })
    delete allUsers[0].password;
    res.status(200).json(allUsers[0])
}

//Add Profile Picture To User
const profilePicToUser = async(req,res) =>{
    const userId = req.user._id.toString();
    try{
        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            { profilePic: req.body.picID },
            { new: true }
          );
        await updatedUser.save()
        res.status(200).json({ data: updatedUser });
    }catch(error){
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

//add fav car of user
const addFavCarToUser = async (req, res) => {
    const userId = req.user._id.toString();
    try {
        const user = await userModel.findById(userId);
        if (user.favoriteCars.indexOf(req.body.carId) === -1) {
            user.favoriteCars.push(req.body.carId);
          }
        await user.save();
        res.status(200).json({ userTemp: user });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

//remove fav car of user
const removeFavCarFromUser = async (req, res) => {
    const userId = req.user._id.toString();
    try {
        const user = await userModel.findById(userId);
        user.favoriteCars.splice(user.favoriteCars.findIndex(item => item.toString() === req.body.carId), 1)
        await user.save();
        res.status(200).json({ userTemp: user });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

//enter a booking
const createUsersEntry = async (req, res) => {
    try {
        const userDetails = await userModel.create(req.body)
        res.status(200).json(userDetails)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    createUsersEntry,
    addFavCarToUser,
    removeFavCarFromUser,
    getUsers,
    logInUser,
    SignUpUser,
    profilePicToUser

}