const Admin = require('../schemas/adminSchema')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { validateLogin } = require('../validate')

async function login(req, res) {
  // getting the body fields
  const { username, password } = req.body

  // validating username and password
  const { error } = validateLogin(username, password)

  // if there is an error then return
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message
    })
  }

  try {
    // finding an account with given username
    const account = await Admin.findOne({username: username})

    // if no account is found then return
    if (!account) {
      return res.status(400).json({
        success: false,
        message: 'username or password is not valid'
      })
    }

    // extracting the password
    const hashedPassword = account.password

    // comparing the passwords
    const isValidPass = await bcrypt.compare(password, hashedPassword)

    // if is not valid pass the return
    if (!isValidPass) {
      return res.status(400).json({
        success: false,
        message: 'username or password is not valid'
      })
    }

    // generating the jwt token
    const token = jwt.sign({
      username: username
    }, process.env.SECRET)

    // setting the token as cookie
    res.cookie('auth-token', token, {
      httpOnly: true,
    })

    // sending the response
    return res.status(200).json({
      success: true,
      message: 'Authentication successful!'
    })
  } catch (err) {
    console.log(err)

    return res.status(500).json({
      success: false,
      message: 'Server error! Please try again later'
    })
  }
}

// function to update the password
async function updatePassword(req, res) {
  // getting the data
  const { existingPassword, newPassword } = req.body

  // getting teh username
  const username = req.username

  // finding an account with the username
  const account = await Admin.findOne({username: username})

  // if no account is found then return
  if (!account) {
    return res.status(400).json({
      success: false,
      message: 'Invalid username!'
    })
  }

  // validating the password
  const isValidPass = await bcrypt.compare(existingPassword, account.password)

  // if is not valid password then return
  if (!isValidPass) {
    return res.status(400).json({
      success: false,
      message: 'Invalid password!'
    })
  }

  // validating the new password
  const { error } = validateLogin('username', newPassword) // 'username' is just a placeholder here

  // if there is an error then return
  if (error) {
    return res.status(401).json({
      success: false,
      message: error.details[0].message
    })
  }

  // generating the salt
  const salt = await bcrypt.genSalt(10)

  // encrypting the password
  const hashedPassword = await bcrypt.hash(newPassword, salt)

  // updating the password
  account.password = hashedPassword

  // saving the account
  await account.save()

  // sending the response
  return res.json({
    success: true,
    message: 'Password updated successfully!'
  })
}

// function to update the username
async function updateUsername(req, res) {
  // getting the username
  const username = req.username

  // getting the new username
  const { newUsername } = req.body

  try {
    // finding an acocunt with the username
    const account = await Admin.findOne({username: username})

    // if account is not found then return
    if (!account) {
      return res.status(400).json({
        success: false,
        message: 'Invalid username!'
      })
    }

    // validating new username
    const { error } = validateLogin(newUsername, 'password') // 'password' is just a placeholder here  
    
    // if there is an error then return
    if (error) {
      return res.status(401).json({
        success: false,
        message: error.details[0].message
      })
    }

    // updating the username
    account.username = newUsername

    // saving
    await account.save()

    return res.status(200).json({
      success: true,
      message: 'username updated successfully!'
    })
  } catch (err) {
    console.log(err)

    return res.status(500).json({
      success: false,
      message: 'Server error! Please try again later'
    })
  }
}

module.exports = { login, updatePassword, updateUsername }