const express = require('express')
const advancedResults = require('../middleware/advancedResults')

const {
  getAllFoods,
  createFood,
  updateFood,
  deleteFood
} = require('../controllers/foods')

const router = express.Router()
const Food = require('../models/food')

router.route('/').get(advancedResults(Food), getAllFoods)
  .post(createFood)

router.route('/:id').put(updateFood).delete(deleteFood)
module.exports = router