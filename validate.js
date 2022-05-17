const Joi = require('joi')

// function to validate the events details
function validateEvent(day, title, description, imageUrl, isFestival) {
  // creating the schema
  const schema = Joi.object({
    day: Joi.string().min(10).max(10),
    title: Joi.string().required().min(3).max(255),
    description: Joi.string().min(3).max(1048),
    imageUrl: Joi.string(),
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

module.exports = { validateEvent }
