import compareTwoVariables from '../helpers/compareTwoVariables';


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
    try {
      compareTwoVariables(password, confirmPassword, 400, 'Passwords do not match');
      next();
    } catch (error) {
      next(error);
    }
  };
  return checkPasswordsMatch;
};

export default initPasswordsMatch;
