module.exports.validateRegisterInput = (
  username,
  email,
  password,
  confirmPassword
) => {
  const errors = {}

  // Check username
  if (username.trim() === '') {
    errors.username = 'Username must not be empty'
  }

  // Check email
  if (email.trim() === '') {
    errors.email = 'Email must not be empty'
  } else {
    const regEx =
      /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/

    if (!email.match(regEx)) {
      errors.email = 'Email not valid'
    }
  }

  // Check password
  if (password.length < 6) {
    errors.password = 'Password must contain 6+ characters'
  } else if (password !== confirmPassword) {
    errors.confirmPassword = 'Password must match'
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  }
}
