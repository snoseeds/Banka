import initAuthenticateUserType from './authenticateUserType';
import initCheckUserInDb from './checkUserInDb';

const initProcessBankaQueryOrPath = (allowedUsersTypeArr) => {
  const processBankaQuery = (req, res, next) => {
    const startingMiddlewares = [
      initAuthenticateUserType(...allowedUsersTypeArr),
      initCheckUserInDb(),
    ];
    req.middlewaresArr = startingMiddlewares;
    next();
  };
  return processBankaQuery;
};

export default initProcessBankaQueryOrPath;
