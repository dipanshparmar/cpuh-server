const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    min: 3,
    max: 24,
    required: true,
  },
  password: {
    type: String,
    min: 5,
    max: 1024,
    required: true,
  }
})

module.exports = mongoose.model('Admin', adminSchema)
