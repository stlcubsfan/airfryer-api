const Food = require('../models/food')
const asyncHandler = require('../middleware/async')
const ErrorResponse = require('../utils/errorResponse')

exports.getAllFoods = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults)
})

exports.createFood = asyncHandler(async (req, res, next) => {
  const food = await Food.create(req.body)
  res.status(201).json({success: true, data: food})
})

exports.updateFood = asyncHandler(async (req, res, next) => {
  const food = await Food.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  })
  await food.save()
  res.status(200).json({success: true, data: food})
})

exports.deleteFood = asyncHandler(async (req, res, next) => {
  const food = await Food.findById(req.params.id)
  if (!food) {
    return next(
      new ErrorResponse(`Food not found with id of ${req.params.id}`, 404)
    )
  }
  await Food.deleteOne({_id: req.params.id})
  return res.status(200).json({success: true, data: {}})
})