const Event = require('../schemas/eventSchema')
const { validateEvent } = require('../validate')

async function getEvents(req, res) {
  try {
    // getting all the events
    const events = await Event.find()

    // return the events
    return res.status(200).json({
      success: true,
      data: events
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Server error! Please try again later'
    })
  }
}

async function getEvent(req, res) {
  const { id } = req.params

  try {
    // getting all the events
    const event = await Event.findById(id)

    // return the events
    return res.status(200).json({
      success: true,
      data: event
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Server error! Please try again later'
    })
  }
}

async function createNewEvent(req, res) {
  // getting the info from the req
  const { day, title, description, imageUrl, isFestival } = req.body
  
  // trying to get the error
  const { error } = validateEvent(day, title, description, imageUrl, isFestival)

  // if there is an error then  sending that as a response
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message
    })
  }

  // if the data is valid then create a new event
  const event = new Event({
    day: day ? day: null,
    title: title,
    description: description ? description: null,
    imageUrl: imageUrl ? imageUrl: null,
    isFestival: isFestival
  })

  // saving the event in the db
  await event.save()

  // sending a 200 message
  res.status(200).json({
    success: true,
    message: 'Event created successfully!'
  })
}

// function to update an event
async function updateAnEvent(req, res) {
  // getting the new values from the request
  const { day, title, description, imageUrl, isFestival } = req.body
    
  // validating the event and trying to get the error
  const { error } = validateEvent(day, title, description, imageUrl, isFestival)

  // if there is an error then  sending that as a response
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message
    })
  }

  // getting the id if data is valid
  const { id } = req.params
  
  try {
    // finding an event with the given id and updating the data
    const event = await Event.findOneAndUpdate({_id: id}, {
      day: day ? day: null,
      title: title,
      description: description ? description: null,
      imageUrl: imageUrl ? imageUrl: null,
      isFestival: isFestival
    })

    // if no event found then throw an error
    if (!event) {
      return res.status(400).json({
        success: false,
        message: 'No event found with such id.'
      })
    }

    // getting all the events
    const events = await Event.find()

    return res.status(200).json({
      success: true,
      data: events
    })
  } catch (err) {
    console.log(err)

    return res.status(500).json({
      success: false,
      message: 'Server error! Please try again later'
    })
  }
}

// function to delete an event
async function deleteAnEvent(req, res) {
  // getting the id
  const { id } = req.params

  // trying to find an event with the id and deleting it
  try {
    const event = await Event.findOneAndDelete({_id: id})

    // if no event is found then throw an error
    if (!event) {
      return res.status(400).json({
        success: false,
        message: 'No event found with this id'
      })
    }

    // getting the events
    const events = await Event.find()

    // if event found then show the success message
    return res.status(200).json({
      success: true,
      data: events
    })
  } catch (err) {
    console.log(err)

    return res.status(500).json({
      success: false,
      message: 'Server error! Please try again later'
    })
  }
}

module.exports = { getEvents, getEvent, createNewEvent, updateAnEvent, deleteAnEvent }
