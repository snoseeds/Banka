import issueErrorResponse from '../helpers/issueErrorResponse';

/**
 * Tests equality of password and confirmPassword fields
 * @param 'string' password Signup form password
 * @param 'string' confirmPassword Signup form confirmPassword
 * @param {object} response express response object
 *
 * @returns {json} error status code and object having status code and error message
 * or undefined if not
 */
const initPasswordsMatch = (password, confirmPassword) => {
  const checkPasswordsMatch = (req, res, next) => {
    if (password !== confirmPassword) {
      return issueErrorResponse(res, 400, 'Passwords do not match');
    }
    next();
  };
  return checkPasswordsMatch;
};

export default initPasswordsMatch;
