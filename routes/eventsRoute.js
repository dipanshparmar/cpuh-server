const express = require('express')
const router = express.Router()
const { getEvents, createNewEvent, updateAnEvent, deleteAnEvent } = require('../controllers/eventsControllers')

// using json parser to extract the json data
router.use(express.json())

// route to get the events
router.get('/', getEvents)

// route to create a new event
router.post('/', createNewEvent)

// route to edit an event
router.patch('/:id', updateAnEvent)

// route to delete an event
router.delete('/:id', deleteAnEvent)

module.exports = router
