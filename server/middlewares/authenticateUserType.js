import verifyToken from '../helpers/verifyToken';
import issueErrorResponse from '../helpers/issueErrorResponse';
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
    const token = req.headers.authorization.split(' ')[1];
    const payload = verifyToken(token, secretKey);
    if (typeof payload === 'string') {
      return issueErrorResponse(res, 401, payload);
    }
    if (isPayloadUserTypeInvalid(payload, typeOfUser1, typeOfUser2)) {
      return issueErrorResponse(res, 403, 'Not Authorized');
    }
    req.body.typeOfUser = payload.typeOfUser;
    req.authEmail = payload.email;
    next();
  };
  return authenticateUserType;
};

export default initAuthenticateUserType;
