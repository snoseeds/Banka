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
      if (password !== confirmPassword) {
        const errorObject = {
          name: 400,
          message: 'Passwords do not match',
        };
        throw errorObject;
      }
      next();
    } catch (error) {
      next(error);
    }
  };
  return checkPasswordsMatch;
};

export default initPasswordsMatch;
