const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
  // props
  day: {
    type: String,
    required: false,
    min: 10,
    max: 10,
  },
  title: {
    type: String,
    required: true,
    min: 3,
    max: 255,
  },
  description: {
    type: String,
    required: false,
    min: 3,
    max: 1048,
  },
  imageUrl: {
    type: String,
    required: false,
  },
  isFestival: {
    type: Boolean,
    required: true,
  }
})

// exporting the model
module.exports = mongoose.model('Event', eventSchema)
