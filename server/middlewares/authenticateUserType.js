import verifyToken from '../helpers/verifyToken';
import isPayloadUserTypeInvalid from '../helpers/isPayloadUserTypeInvalid';
import compareTwoVariables from '../helpers/compareTwoVariables';

/**
 * @description uses JWT to validate user authenticity
 * @param req express request object
 * @param res express response object
 * @param next express next to execute next middleware
 * @returns {object} JSON
 */
const secretKey = 'andela';

const initAuthenticateUserType = (...typeOfUsersCategoriesArr) => {
  // eslint-disable-next-line consistent-return
  const authenticateUserType = (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const payload = verifyToken(token, secretKey);
      compareTwoVariables(typeof payload, 'object', 401, payload);
      isPayloadUserTypeInvalid(payload, typeOfUsersCategoriesArr, 403, 'Not Authorized');
      req.body.typeOfUser = payload.typeOfUser;
      req.authEmail = payload.email;
      next();
    } catch (error) {
      next(error);
    }
  };
  return authenticateUserType;
};

export default initAuthenticateUserType;
