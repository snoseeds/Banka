import initAuthenticateUserType from './authenticateUserType';
import initCheckUserInDb from './checkUserInDb';
import initGetBankaParameterDetails from './getBankaParameterDetails';
import changeKeysOfObjsInArr from '../helpers/changeKeysOfObjsInArr';

// paramName has been used to match an existing column in the given table, because the key in the params
// object from request may not match the column name of a given table, and is thereby regularized to
// conform to column names in the first line of processBankaParameter
const initProcessBankaParameter = (table, paramName, paramDescription, allowedUsersTypeArr) => {
  const processBankaParameter = (req, res, next) => {
    [req.params] = changeKeysOfObjsInArr([req.params], [paramName]);
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
