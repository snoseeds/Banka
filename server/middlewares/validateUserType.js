import compareTwoVariables from '../helpers/compareTwoVariables';

const initValidateUserType = (expectedType, typeOfUser) => {
  const validateUserType = (req, res, next) => {
    try {
      compareTwoVariables(expectedType, typeOfUser, 403, 'Not Authorized');
      next();
    } catch (error) {
      next(error);
    }
  };
  return validateUserType;
};

export default initValidateUserType;
