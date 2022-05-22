const express = require('express')
const router = express.Router()
const { getEvents, createNewEvent, updateAnEvent, deleteAnEvent, getEvent } = require('../controllers/eventsControllers')
const authMiddleware = require('../middlewares/authMiddleware')

// using json parser to extract the json data
router.use(express.json())

// using the auth middleware
router.use(authMiddleware)

// route to get the events
router.get('/', getEvents)

// route to get a single event
router.get('/:id', getEvent)

// route to create a new event
router.post('/', createNewEvent)

// route to edit an event
router.patch('/:id', updateAnEvent)

// route to delete an event
router.delete('/:id', deleteAnEvent)

module.exports = router
