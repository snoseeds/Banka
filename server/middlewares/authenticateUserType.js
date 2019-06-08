import verifyToken from '../helpers/verifyToken';
import issueErrorResponse from '../helpers/issueErrorResponse';

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
    const confirmToken = verifyToken(token, secretKey);
    if (typeof confirmToken === 'string') {
      return issueErrorResponse(res, 401, confirmToken);
    }
    const payload = confirmToken;
    const isPayloadTypeOfUserInvalid = typeOfUser2
      ? payload.typeOfUser !== `${typeOfUser1}` && payload.typeOfUser !== `${typeOfUser2}`
      : payload.typeOfUser !== `${typeOfUser1}`;

    if (isPayloadTypeOfUserInvalid) {
      return issueErrorResponse(res, 403, 'Not Authorized');
    }
    req.body.typeOfUser = payload.typeOfUser;
    req.authEmail = payload.email;
    next();
  };
  return authenticateUserType;
};

export default initAuthenticateUserType;
