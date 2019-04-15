/**
 * Tests equality of password and confirmPassword fields
 * @param 'string' password Signup form password
 * @param 'string' confirmPassword Signup form confirmPassword
 * @param {object} response express response object
 *
 * @returns {json} error status code and object having status code and error message
 * or undefined if not
 */
const checkPasswordsMatch = (password, confirmPassword, response) => {
  if (password !== confirmPassword) {
    return response.status(400).json({
      status: 400,
      error: 'Passwords do not match',
    });
  }
  return undefined;
};

export default checkPasswordsMatch;
