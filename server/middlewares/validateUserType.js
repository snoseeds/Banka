const initValidateUserType = (expectedType, typeOfUser) => {
  const validateUserType = (req, res, next) => {
    try {
      if (expectedType !== typeOfUser) {
        const errorObject = {
          name: 403,
          message: 'Not Authorized',
        };
        throw errorObject;
      }
      next();
    } catch (error) {
      next(error);
    }
  };
  return validateUserType;
};

export default initValidateUserType;
