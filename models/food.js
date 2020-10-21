const mongoose = require('mongoose')

const FoodSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a food name']
  },
  duration: {
    type: Number,
    required: [true, 'Please provide a cooking duration'],
    min: [0, 'Please provide a duration greater than 0']
  },
  temperature: {
    type: Number,
    required: [true, 'Please provide a temperature'],
    min: [0, 'Please provide a temperature greater than 0']
  },
  frozen: {
    type: Boolean,
    required: [true, 'Please indicate whether the food is frozen'],
    default: false
  },
  notes: String
})

module.exports = mongoose.model('Food', FoodSchema)