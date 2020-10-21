const Food = require('../models/food')
const asyncHandler = require('../middleware/async')

exports.getAllFoods = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults)
})

exports.createFood = asyncHandler(async (req, res, next) => {
  const food = await Food.create(req.body)
  res.status(201).json({success: true, data: food})
})