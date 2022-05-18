const jwt = require('jsonwebtoken')

// function to validate auth
function authMiddleware(req, res, next) {
  // getting the cookie
  const authToken = req.cookies['auth-token']
  
  // if auth token not found then return
  if (!authToken) {
    return res.status(401).json({
      success: false,
      message: 'You are not authorized to access this resource'
    })
  }

  // if auth token is there then verify it
  const { username } = jwt.verify(authToken, process.env.SECRET)

  // if username is not there then token is not valid
  if (!username) {
    return res.status(400).json({
      success: false,
      message: 'Invalid token'
    })
  }

  // setting the username
  req.username = username

  // calling the next function
  next()
}

module.exports = authMiddleware