import initAuthenticateUserType from './authenticateUserType';
import initCheckUserInDb from './checkUserInDb';
import initGetBankAcctDetails from './getBankAcctDetails';

const initProcessReqOfBankAcct = (...allowedUsersCategories) => {
  const processReqOfBankAcct = (req, res, next) => {
    const { accountNumber } = req.params;
    const startingMiddlewares = [
      initAuthenticateUserType(...allowedUsersCategories),
      initCheckUserInDb(),
      initGetBankAcctDetails(accountNumber),
    ];
    req.middlewaresArr = startingMiddlewares;
    next();
  };
  return processReqOfBankAcct;
};

export default initProcessReqOfBankAcct;
