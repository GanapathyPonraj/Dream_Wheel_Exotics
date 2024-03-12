const express = require('express')
const router = express.Router()
const { createCarEntry, getAllCarsAvailable, addFavouriteCount, removeFavouriteCount } = require('../controller/carRentalController')

//Get All Cars With Availability
router.get('/dates', getAllCarsAvailable)

//addFavCount
router.post('/addFavouriteCount', addFavouriteCount)

//removeFavCount
router.post('/removeFavouriteCount',removeFavouriteCount)

//Add a new Car
router.post('/', createCarEntry)

//delete a car
router.delete('/:id', (req, res) => {
    res.json({ mssg: 'delete a car' })
})

//update a car
router.patch('/:id', (req, res) => {
    res.json({ mssg: 'Update a Car' })
})

module.exports = router