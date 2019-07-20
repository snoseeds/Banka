import initAuthenticateUserType from './authenticateUserType';
import initCheckUserInDb from './checkUserInDb';
import initGetBankaParameterDetails from './getBankaParameterDetails';

const initProcessBankaParameter = (table, paramName, paramDescription, allowedUsersTypeArr) => {
  const processBankaParameter = (req, res, next) => {
    const startingMiddlewares = [
      initAuthenticateUserType(...allowedUsersTypeArr),
      initCheckUserInDb(),
      initGetBankaParameterDetails(table, paramName,
        Object.values(req.params)[0], paramDescription),
    ];
    req.middlewaresArr = startingMiddlewares;
    next();
  };
  return processBankaParameter;
};

export default initProcessBankaParameter;
