const express = require('express')
const advancedResults = require('../middleware/advancedResults')

const {
  getAllFoods,
  createFood
} = require('../controllers/foods')

const router = express.Router()
const Food = require('../models/food')

router.route('/').get(advancedResults(Food), getAllFoods)
  .post(createFood)

module.exports = router