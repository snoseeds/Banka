import issueErrorResponse from '../helpers/issueErrorResponse';

const initValidateUserType = (expectedType, typeOfUser) => {
  // eslint-disable-next-line consistent-return
  const validateUserType = (req, res, next) => {
    if (expectedType !== typeOfUser) {
      return issueErrorResponse(res, 403, 'Not Authorized');
    }
    next();
  };
  return validateUserType;
};

export default initValidateUserType;
