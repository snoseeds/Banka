import verifyToken from '../helpers/verifyToken';
import isPayloadUserTypeInvalid from '../helpers/isPayloadUserTypeInvalid';

/**
 * @description uses JWT to validate user authenticity
 * @param req express request object
 * @param res express response object
 * @param next express next to execute next middleware
 * @returns {object} JSON
 */
const secretKey = 'andela';

const initAuthenticateUserType = (typeOfUser1, typeOfUser2 = null) => {
  // eslint-disable-next-line consistent-return
  const authenticateUserType = (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const payload = verifyToken(token, secretKey);
      let errorObject;
      if (typeof payload === 'string') {
        errorObject = {
          name: 401,
          message: payload,
        };
        throw errorObject;
      }
      if (isPayloadUserTypeInvalid(payload, typeOfUser1, typeOfUser2)) {
        errorObject = {
          name: 403,
          message: 'Not Authorized',
        };
        throw errorObject;
      }
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
