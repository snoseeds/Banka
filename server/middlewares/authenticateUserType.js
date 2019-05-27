import verifyToken from '../helpers/verifyToken';

/**
 * @description uses JWT to validate user authenticity
 * @param req express request object
 * @param res express response object
 * @param next express next to execute next middleware
 * @returns {object} JSON
 */
const secretKey = 'andela';

const initAuthenticateUserType = (typeOfUser) => {
  // eslint-disable-next-line consistent-return
  const authenticateUserType = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const confirmToken = verifyToken(token, secretKey);
    if (typeof confirmToken === 'string') {
      return res.status(401).json({
        status: 401,
        message: confirmToken,
      });
    }

    // authentication for client
    const payload = confirmToken;
    if (!payload.email && payload.typeOfUser !== `${typeOfUser}`) {
      return res.status(403).json({
        status: 403,
        message: 'Not Authorized',
      });
    }
    req.authEmail = payload.email;
    next();
  };
  return authenticateUserType;
};

export default initAuthenticateUserType;
