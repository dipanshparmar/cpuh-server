const express = require('express')
const router = express.Router()
const { login, updatePassword, updateUsername } = require('../controllers/authControllers')
const authMiddleware = require('../middlewares/authMiddleware')

// using json
router.use(express.json())

// route for login
router.post('/login', login)

// route to update the password
router.use(authMiddleware) // checking if the user is logged before allowing him/her to update the password
router.post('/update-pass', updatePassword)
  
// route to update the username
router.post('/update-username', updateUsername)

module.exports = router