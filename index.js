require('dotenv').config()
const express = require('express')
const app = express()
const eventsRoute = require('./routes/eventsRoute')
const authRoute = require('./routes/authRoute')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require('cors')

// cors
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}))

// cookie parser to work with cookies
app.use(cookieParser())

// connecting to the db
mongoose.connect(process.env.DB_ACCESS)
.then(() => console.log('connected to DB!'))
.catch(err => console.log(err))

// routes middlewares
app.use('/api/events', eventsRoute)
app.use('/api/auth', authRoute)

// starting the server
app.listen(5000, () => {
  console.log('server started on port 5000')
})
