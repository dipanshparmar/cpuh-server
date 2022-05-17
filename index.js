require('dotenv').config()
const express = require('express')
const app = express()
const eventsRoute = require('./routes/eventsRoute')
const mongoose = require('mongoose')

// connecting to the db
mongoose.connect(process.env.DB_ACCESS)
.then(() => console.log('connected to DB!'))
.catch(err => console.log(err))

// routes middlewares
app.use('/api/events', eventsRoute)

// starting the server
app.listen(5000, () => {
  console.log('server started on port 5000')
})
