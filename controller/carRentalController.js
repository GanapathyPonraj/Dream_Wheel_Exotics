const carRentalModel = require('../models/carRentalModel');

//Get All Cars With Availability
const getAllCarsAvailable = async (req, res) => {
    const selectedDate = req.query.selectedDate1;
    const startDate = selectedDate.pickupDate;
    const endDate = selectedDate.dropOffDate;
    const availableCars = await carRentalModel.find({
        bookedDates: {
            $not: {
              $elemMatch: {
                $or: [
                  {
                    pickupDate: {
                      $lte: endDate,
                      $gte: startDate
                    }
                  },
                  {
                    dropOffDate: {
                      $gte: startDate,
                      $lte: endDate
                    }
                  },  {
                    $and: [
                      {
                        pickupDate: {
                          $lt: endDate
                        }
                      },
                      {
                        dropOffDate: {
                          $gt: startDate
                        }
                      }
                    ]
                  }
                ]
              }
            }
          }
    })
    res.status(200).json(availableCars)
}

//create a car model
const createCarEntry = async (req, res) => {
    try {
        const cars = await carRentalModel.create(req.body)
        res.status(200).json(cars)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

//Add update favCountofVehicle
const addFavouriteCount = async (req, res) => {
    try {
        const car = await carRentalModel.findById(req.body.carId);
        car.favouriteCount++;
        await car.save();
        res.status(200).json(car);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

//Remove update favCountofVehicle
const removeFavouriteCount = async (req, res) => {
    try {
        const car = await carRentalModel.findById(req.body.carId);
        car.favouriteCount--;
        await car.save();
        res.status(200).json(car);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = {
    createCarEntry,
    getAllCarsAvailable,
    addFavouriteCount,
    removeFavouriteCount
}