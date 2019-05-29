const initValidateUserType = (expectedType, typeOfUser) => {
  // eslint-disable-next-line consistent-return
  const validateUserType = (req, res, next) => {
    if (expectedType !== typeOfUser) {
      return res.status(403).json({
        status: 403,
        error: 'Not Authorized',
      });
    }
    next();
  };
  return validateUserType;
};

export default initValidateUserType;
