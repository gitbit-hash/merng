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