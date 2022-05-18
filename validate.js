const Joi = require('joi')

// function to validate the events details
function validateEvent(day, title, description, imageUrl, isFestival) {
  // creating the schema
  const schema = Joi.object({
    day: Joi.string().trim().min(10).max(10),
    title: Joi.string().trim().required().min(3).max(255),
    description: Joi.string().trim().min(3).max(1048),
    imageUrl: Joi.string().trim(),
    isFestival: Joi.boolean().required()
  })

  // validating data
  return schema.validate({
    day: day,
    title: title,
    description: description,
    imageUrl: imageUrl,
    isFestival: isFestival
  })
}

// function to validate login
function validateLogin(username, password) {
  const schema = Joi.object({
    username: Joi.string().trim().min(3).max(24).required(true),
    password: Joi.string().trim().min(5).max(24).required()
  })

  return schema.validate({
    username: username,
    password: password
  })
}

module.exports = { validateEvent, validateLogin }
