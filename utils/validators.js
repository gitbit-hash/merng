module.exports.validateRegisterInput = (
  username,
  email,
  password,
  confirmPassword
) => {
  const errors = {};

  if (username.trim() === '') {
    errors.username = 'Username must no be empty'
  }

  if (password === '') {
    errors.password = 'Password must not be empty'
  } else if (password !== confirmPassword) {
    errors.confirmPassword = 'Confirm password doesn\'t match password'
  }

  if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email)) {
    errors.email = 'Email must be a valid email address'
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1
  }

}

module.exports.validateLoginInput = (username, password) => {
  const errors = {}
  if (username.trim() === '') {
    errors.username = 'Username must no be empty'
  }

  if (password.trim() === '') {
    errors.password = 'Password must no be empty'
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1
  }
}

module.exports.validateProfileInput = (name, bio, location) => {
  const errors = {}
  if (name.trim().length > 255) {
    errors.name = 'Profile name is too long (maximum is 255 characters)'
  }

  if (bio.trim().length > 255) {
    errors.bio = 'Profile bio is too long (maximum is 255 characters)'
  }

  if (location.trim().length > 255) {
    errors.location = 'Profile Location is too long (maximum is 255 characters)'
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1
  }
}